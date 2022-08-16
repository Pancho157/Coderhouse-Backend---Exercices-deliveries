const express = require("express");
const router = express.Router();

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Contenedor } = require("../Contenedor");

const products = new Contenedor("./productos.txt");

router.get("/", async (req, res) => {
  try {
    let allProducts = await products.getAll();
    res.json(allProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al traer los productos");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let product = await products.getById(`${id}`);

    if (product == []) {
      product = { Error: "Producto no encontrado" };
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al traer el producto");
  }
});

router.post("/", async (req, res) => {
  try {
    const { productTitle, productPrice, productThumbnail } = req.body;

    if (!productTitle || !productPrice || !productThumbnail) {
      res.status(400).send("Tus datos no están completos");
    }

    let product = await products.save({
      title: productTitle,
      price: productPrice,
      thumbnail: productThumbnail,
    });

    res.send(`El ID del producto guardado es: ${product.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al guardar el producto");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { productTitle, productPrice, productThumbnail } = req.body;

    if (!productTitle || !productPrice || !productThumbnail) {
      res.status(400).send("Tus datos no están completos");
    }

    let product = await products.update(id, {
      title: productTitle,
      price: productPrice,
      thumbnail: productThumbnail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al guardar el producto");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await products.deleteById(`${id}`);
    res.json(`Se ha eliminado el producto con el ID: ${id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al eliminar el producto");
  }
});

module.exports = router;
