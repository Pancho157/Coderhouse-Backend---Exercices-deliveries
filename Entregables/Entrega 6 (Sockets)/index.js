const express = require("express");
const path = require("path");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");
const router = require("./router/products");

var app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Http - Socket Server On - Port: ${PORT}`);
});

// ----------------------- Handlebars -----------------------
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ----------------------- Manejo con sockets -----------------------
io.on(`connection`, (socket) => {
  console.log("Nuevo cliente conectado");

  // Solo se puede distinguir los sockets desde dentro de io (conexión)
  socket.on("messageToServer", (data) => {
    io.sockets.emit("messagesFromServer", data);
  });
});

// ----------------------- Router -----------------------
app.use("/api/productos", router);

// ----------------------- Renderiza el formulario -----------------------
app.get("/", (req, res) => {
  res.render("form");
});

// ----------------------- Error 404 -----------------------
app.use((req, res) => {
  res.status(404).send("No se encontró la página que estás buscando");
});
