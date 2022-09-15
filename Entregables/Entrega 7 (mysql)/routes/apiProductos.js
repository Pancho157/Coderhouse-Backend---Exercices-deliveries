const express = require("express");
const router = express.Router();
const { ProductosSQL } = require("../DB/controllers/ProductosSQL");
const { options } = require("../DB/options/mariaDB-products");

router.get("/", (req, res) => {
  // Devuelve todos los productos
});

router.get("/:id", (req, res) => {
  // Devuelve un producto según su id
});

router.post("/", (req, res) => {
  // Recibe y agrega un productos, y lo devuelve con su id asignado
});

router.put("/:id", (req, res) => {
  // Recibe y actualiza un producto según su id
});

router.delete("/:id", (req, res) => {
  // Elimina un producto según su id
});

module.exports = router;
