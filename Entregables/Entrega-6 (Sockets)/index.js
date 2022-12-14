const express = require("express");
const path = require("path");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");
const router = require("./router/products");
const products = require("./router/Contenedor");
const { getChatMessages, addMessage } = require("./chat/chatFunctions");

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

// ----------------------- Handlebars -----------------------
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ----------------------- Manejo con sockets -----------------------
io.on(`connection`, async (socket) => {
  console.log("Nuevo cliente conectado");

  socket.emit("productsFromServer", products.getAll());
  socket.emit("messagesFromServer", await getChatMessages());

  socket.on("new-message", async (data) => {
    await addMessage(data);
    io.sockets.emit("messagesFromServer", await getChatMessages());
  });

  socket.on("new-product", (data) => {
    products.add(data);
    io.sockets.emit("productsFromServer", products.getAll());
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
