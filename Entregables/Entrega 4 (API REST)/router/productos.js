const express = require("express");
const router = express.Router();

let products = [
  {
    title: "Redragon Horus K621 TKL",
    price: "$13.500",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0606/6529/9176/products/TKL-2_79565deb-364f-4b52-a3c2-22e34d19aeed_800x.jpg?v=1653779226",
    id: 1,
  },
  {
    title: "Redragon Lamia 2 RGB Blanco",
    price: "$7.800",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdA2DDK4Z0ZgLuM387x2rqnB97LUyFLtpmbQHQAqyXJdpOFiGSQU1RKyopY9dOi9h7heA&usqp=CAU",
    id: 2,
  },
  {
    title: "Redragon Magic Wand K587",
    price: "$11.000",
    thumbnail: "https://i.ytimg.com/vi/SME6NCVQhD0/maxresdefault.jpg",
    id: 3,
  },
];

let lastID = 3;

router.get("/", (req, res) => {
  // Devuelve todos los productos
  res.send(products);
});

router.get("/:id", (req, res) => {
  // Devuelve un producto según su id
  let { id } = req.params;
  let product = products.find((actualProduct) => {
    if (actualProduct.id == id) {
      return actualProduct;
    }
  });

  console.log(product);

  if (!product) {
    // En la duda sobre si poner un status(204) => sin contenido
    res.status(400).send({ Error: "producto no encontrado" });
  }

  res.send(product);
});

router.post("/", (req, res) => {
  const { productTitle, productPrice, productThumbnail } = req.body;

  if (!productTitle || !productPrice || !productThumbnail) {
    res.status(400).send({ Error: "Tus datos no están completos" });
  }

  lastID++;

  products.push({
    title: productTitle,
    price: productPrice,
    thumbnail: productThumbnail,
    id: lastID,
  });

  res.send(`El ID del producto guardado es: ${lastID}`);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  let productIndex = products.findIndex((product) => {
    product.id = id;
  });

  if (!productIndex) {
    res.status(400).send("Error: producto no encontrado");
  } else if (
    !req.body.productTitle &&
    !req.body.productPrice &&
    !req.body.productThumbnail
  ) {
    res.status(400).send("Error: No se ingresaron modificaciones al producto");
  } else {
    // Actualiza los datos en caso de que existan
    if (req.body.productTitle) {
      products[productIndex].title = productTitle;
    }
    if (req.body.productPrice) {
      products[productIndex].price = productPrice;
    }
    if (req.body.productThumbnail) {
      products[productIndex].thumbnail = productThumbnail;
    }
  }
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  const filteredProducts = products.filter((product) => product.id != id);
  products = filteredProducts;
  res.send(`Se ha eliminado el producto con el ID: ${id}`);
});

module.exports = router;
