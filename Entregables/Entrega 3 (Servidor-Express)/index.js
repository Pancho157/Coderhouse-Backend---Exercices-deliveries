var express = require("express");
const { Contenedor } = require("./Contenedor");

const products = new Contenedor("./productos.txt");

getAllFileProducts = async () => {
  return await products.getAll();
};

var app = express();

app.get("/productos", (req, res) => {
  res.send(getAllFileProducts());
});

app.get("/productoRandom", (req, res) => {});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor Http escuchando en el puerto ${PORT}`);
});
