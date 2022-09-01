const express = require("express");
const router = express.Router();
const products = require("./Contenedor");

router.get("/", (req, res) => {
  // Devuelve todos los productos
  try {
    res.json(products.getAll());
  } catch {
    res
      .status(500)
      .send({ error: "Ha ocurrido un error al traer los productos" });
  }
});

router.get("/:id", (req, res) => {
  // Devuelve un producto según su id
  try {
    res.send(products.getById(req.params.id));
  } catch {
    res.status(400).send({ Error: "Producto no encontrado" });
  }
});

router.post("/", (req, res) => {
  // Recibe y agrega un productos, y lo devuelve con su id asignado
  try {
    res.send(products.add(req.body));
  } catch (err) {
    //? No se como hacer para verificar cual error me dio y dar una respuesta personalizada :(
    res.status(500).send("Ha ocurrido un error, ingresaste todos los datos?");
  }
});

router.put("/:id", (req, res) => {
  // Recibe y actualiza un producto según su id
  try {
    products.update(req.params.id, req.body);
    res.send("Se ha actualizado el producto");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", (req, res) => {
  // Elimina un producto según su id
  try {
    products.deleteById(req.params.id);
    res.send("Producto eliminado exitosamente");
  } catch (err) {
    console.log(err);
    res.status(400).send("Producto no encontrado");
  }
});

module.exports = router;
