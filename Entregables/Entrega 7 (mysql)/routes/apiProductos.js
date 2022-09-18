const express = require("express");
const router = express.Router();
const { ProductosSQL } = require("../DB/controllers/ProductsController");
const { options } = require("../DB/options/mariaDB-products");

let products = new ProductosSQL(options);

router.get("/", async (req, res) => {
  // Devuelve todos los productos
  try {
    res.send(await products.getProducts());
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

router.get("/:id", async (req, res) => {
  // Devuelve un producto según su id
  try {
    res.send(await products.getProductById(req.params.id));
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

router.post("/", async (req, res) => {
  // Recibe y agrega un productos, y lo devuelve con su id asignado
  // const { title, price, thumbnail, stock } = req.body;
  try {
    res.send(await products.insertProduct(req.body));
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

router.put("/:id", async (req, res) => {
  // Recibe y actualiza un producto según su id
  try {
    res.send(await products.updateById(req.params.id, req.body));
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

router.delete("/:id", async (req, res) => {
  // Elimina un producto según su id
  try {
    res.send(await products.deleteById(req.params.id));
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

module.exports = router;
