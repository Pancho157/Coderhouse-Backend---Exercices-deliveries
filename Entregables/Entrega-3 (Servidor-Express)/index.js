var express = require("express");
const { Contenedor } = require("./Contenedor");

const products = new Contenedor("./productos.txt");

var app = express();

app.get("/productos", async (req, res) => {
  try {
    let productos = await products.getAll();
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al traer los productos");
  }
});

app.get("/productoRandom", async (req, res) => {
  try {
    let productos = await products.getAll();

    if (productos.length == 0) {
      res.end("Al parecer estamos sin productos :(");
    }

    // Selecciona un producto random de todos los que hay en el array
    productos = productos[Math.floor(Math.random() * productos.length)];
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al traer el productos");
  }
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor Http escuchando en el puerto ${PORT}`);
});
