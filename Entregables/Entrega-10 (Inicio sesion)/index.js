require("dotenv").config();

// Express y socket.io
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const path = require("path");

// Plantillas
const { engine } = require("express-handlebars");

//  Routers
const router = require("./routes/apiProductos");
const routerTest = require("./routes/apiProductosTest");

// BBDDs
const { sockets } = require("./sockets-sessions/sockets");
const { Session } = require("./sockets-sessions/sessions");

// Middlewares
const { isLoggedIn } = require("./middlewares/isLoggedIn");

// ----------------------- Inicialización del servidor -----------------------

var app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Http - Socket Server On - Port: ${PORT}`);
});

// En caso de fallar el servidor de sockets
connectedServer.on("error", (err) => {
  console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ----------------------- Session & Auth -----------------------

app.use(Session);
app.use(isLoggedIn);

// ----------------------- Handlebars -----------------------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
app.engine(".hbs", engine({ extname: ".hbs" }));

// ----------------------- Sockets -----------------------
sockets(io);

// ----------------------- Router -----------------------
app.use("/api/productos", router);
app.use("/api/productos-test", routerTest);

// ----------------------- Renderiza el formulario -----------------------
app.get("/", (req, res) => {
  res.render("index", { name: "Juan" });
});

app.get("/login", (req, res) => {
  res.render("loginForm");
});

app.post("/login", (req, res) => {
  req.session.userName = req.body.userName;
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  const userName = req.session.userName;
  req.session.destroy((err) => {
    if (err) {
      res.send({ Error: true, message: err });
    }
  });
  res.render("logOut", { name: userName });
});

// ----------------------- Error 404 -----------------------
app.use((req, res) => {
  res.status(404).send("No se encontró la página que estás buscando");
});
