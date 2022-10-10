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
const { ChatSQL } = require("./DB/controllers/ChatController");
const { knexOptionsChat } = require("./DB/options/sqlite3-chat");
const { ProductosSQL } = require("./DB/controllers/ProductsController");
const { options } = require("./DB/options/mariaDB-products");

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

// ----------------------- Handlebars -----------------------
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ----------------------- Conexiones a BBDDs -----------------------
let chatMessages = new ChatSQL(knexOptionsChat);
let products = new ProductosSQL(options);

chatMessages.createTable();
products.createTable();

// ----------------------- Manejo con sockets -----------------------
io.on(`connection`, async (socket) => {
  console.log("Nuevo cliente conectado");

  socket.emit("productsFromServer", await products.getProducts());
  socket.emit("messagesFromServer", await chatMessages.getMessages());

  socket.on("new-message", async (data) => {
    await chatMessages.insertMessage(data);
    io.sockets.emit("messagesFromServer", await chatMessages.getMessages());
  });

  socket.on("new-product", async (data) => {
    await products.insertProduct(data);
    io.socket.emit("productsFromServer", await products.getProducts());
  });
});

// ----------------------- Router -----------------------
app.use("/api/productos", router);
app.use("/api/productos-test", routerTest);

// ----------------------- Renderiza el formulario -----------------------
app.get("/", (req, res) => {
  res.render("index");
});

// ----------------------- Error 404 -----------------------
app.use((req, res) => {
  res.status(404).send("No se encontró la página que estás buscando");
});
