const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Http - Socket Server On - Port: ${PORT}`);
});

io.on(`connection`, (socket) => {
  console.log("Nuevo cliente conectado");

  // Solo se puede distinguir los sockets desde dentro de io (conexión)
  socket.on("messageToServer", (messages) => {
    io.sockets.emit("messagesFromServer", messages);
  });
});

connectedServer.on("error", (error) => console.warn(error));
