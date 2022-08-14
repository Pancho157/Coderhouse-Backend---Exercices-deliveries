var express = require("express");
const { Contenedor } = require("./Contenedor");

const products = new Contenedor("./productos.txt");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/productos", async (req, res) => {
  try {
    let allProducts = await products.getAll();
    res.json(allProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al traer los productos");
  }
});

app.get("/api/productos", async (req, res) => {
  try {
    let id = req.params.id;
    let product = await products.getById(`${id}`);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al traer el producto");
  }
});

app.post("/api/productos/", async (req, res) => {
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
    //TODO: Modificar la clase contenedor para que devuelva el ID del producto sin ser por la consola
    res.json(`El ID del producto guardado es: ${product.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al guardar el producto");
  }
});

app.put("/api/productos/:id", async (req, res) => {
  try {
    // TODO: Modificar la clase Contenedor para poder actualizar productos
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al guardar el producto");
  }
});

app.delete("/api/productos", async (req, res) => {
  try {
    let id = req.params.id;
    await products.deleteById(`${id}`);
    res.json(`Se ha eliminado el producto con el ID: ${id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al eliminar el producto");
  }
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
