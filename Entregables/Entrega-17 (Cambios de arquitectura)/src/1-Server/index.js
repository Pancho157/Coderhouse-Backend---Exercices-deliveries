require("dotenv").config();

// Express y socket.io
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const path = require("path");

// Plantillas
const { engine } = require("express-handlebars");

//  Routers
const userInterfaces = require("../2-Router/user-interfaces");
const { info } = require("../2-Router/server-info");
const { apiRandoms } = require("../2-Router/api-randoms");
const { apiProducts } = require("../2-Router/api-products");
const { carts } = require("../2-Router/api-carts");

// BBDDs
const { sockets } = require("../4-Service/sockets-sessions/sockets");
const { Session } = require("../4-Service/sockets-sessions/sessions");

// Auth
const passport = require("passport");
const { connectToMongo } = require("../5-Persistence/utils/mongooseConnection");

// Argumentos de línea de comandos
const yargs = require("yargs/yargs")(process.argv.slice(2));

// Cluster
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

// Loggers
const { logger } = require("../../loggers-testing/loggers/log4js-config");

const { puerto, _ } = yargs
  .alias({
    p: "puerto",
  })
  .default({
    p: 8080,
  }).argv;

//  ----------------------- Cluster Primario -----------------------
if (process.env.CLUSTER && process.env.CLUSTER == "true" && cluster.isPrimary) {
  logger.info(`processor cores: ${numCPUs}`);
  logger.info(`Primary PID: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    logger.info("Worker " + worker.process.pid + " is online");
  });

  cluster.on("exit", (worker) => {
    logger.warn(
      "Worker: ",
      worker.process.pid,
      "died - Date: ",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  //* Se ejecuta en los clusters secundarios y cuando se ejecuta en modo fork

  // ----------------------- Inicialización de servidor HTTP -----------------------
  var app = express();
  const httpServer = new HttpServer(app);
  const io = new IOServer(httpServer);

  const connectedServer = httpServer.listen(puerto, () => {
    logger.info(`Http - Socket Server On - Port: ${puerto}`);
  });

  // En caso de fallar el servidor de sockets
  connectedServer.on("error", (err) => {
    logger.error(err);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "/public"));

  // -----------------------  Conección a Mongo -----------------------
  try {
    connectToMongo();
    logger.info("Connected to mongo successfully");
  } catch (err) {
    logger.warn(err);
  }

  // ----------------------- Passport & Sessions -----------------------
  app.use(Session);
  app.use(passport.initialize());

  // ----------------------- Handlebars -----------------------
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", ".hbs");
  app.engine(".hbs", engine({ extname: ".hbs" }));

  // ----------------------- Sockets -----------------------
  sockets(io);

  // ----------------------- Router -----------------------
  app.use("/", userInterfaces);
  app.use("/", info);
  app.use("/api", apiRandoms);
  app.use("/api", apiProducts);
  app.use("/api/carts", carts);

  // ----------------------- Error 404 -----------------------
  app.use((req, res) => {
    logger.warn(
      `Bad request - Route: "${req.originalUrl}", Method: "${req.method}"`
    );
    res.status(404).send("No se encontró la página que estás buscando");
  });
}
