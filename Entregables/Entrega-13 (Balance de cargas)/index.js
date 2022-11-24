require("dotenv").config();

// Express y socket.io
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const path = require("path");

// Plantillas
const { engine } = require("express-handlebars");

//  Routers
const userInterfaces = require("./routes/userInterfaces");
const { info } = require("./routes/info");
const { apiRandoms } = require("./routes/apiRandoms");

// BBDDs
const { sockets } = require("./sockets-sessions/sockets");
const { Session } = require("./sockets-sessions/sessions");

// Auth
const passport = require("passport");
const { connectToMongo } = require("./DB/utils/mongooseConnection");

// Argumentos de línea de comandos
const yargs = require("yargs/yargs")(process.argv.slice(2));

// Cluster
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const { puerto, modo, _ } = yargs
  .alias({
    p: "puerto",
    m: "modo",
  })
  .default({
    p: 8080,
    m: "FORK",
  }).argv;

//  ----------------------- Cluster -----------------------
if (modo.toLowerCase() == "cluster" && cluster.isPrimary) {
  console.log(`processor cores: ${numCPUs}`);
  console.log(`Primary PID: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log("Worker " + worker.process.pid + " is online");
  });

  cluster.on("exit", (worker) => {
    console.log(
      "Worker: ",
      worker.process.pid,
      "died - Date: ",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  // ----------------------- Inicialización del servidor -----------------------

  var app = express();
  const httpServer = new HttpServer(app);
  const io = new IOServer(httpServer);

  const connectedServer = httpServer.listen(puerto, () => {
    // console.log(`Http - Socket Server On - Port: ${puerto}`);
  });

  // En caso de fallar el servidor de sockets
  connectedServer.on("error", (err) => {
    console.log(err);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "/public"));

  // -----------------------  Conección a Mongo -----------------------
  connectToMongo();

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

  // ----------------------- Error 404 -----------------------
  app.use((req, res) => {
    res.status(404).send("No se encontró la página que estás buscando");
  });
}
