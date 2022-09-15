const express = require("express");
const router = express.Router();
const { ProductosSQL } = require("../DB/controllers/ProductosSQL");
const { options } = require("../DB/options/mariaDB-products");

// let products = new ProductosSQL(options);

// products.createTable();

router.get("/", async (req, res) => {
  // Devuelve todos los productos
});

router.get("/:id", async (req, res) => {
  // Devuelve un producto según su id
});

router.post("/", async (req, res) => {
  // Recibe y agrega un productos, y lo devuelve con su id asignado
});

router.put("/:id", async (req, res) => {
  // Recibe y actualiza un producto según su id
});

router.delete("/:id", async (req, res) => {
  // Elimina un producto según su id
});

module.exports = router;
