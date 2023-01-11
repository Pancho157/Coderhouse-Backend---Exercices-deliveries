const { Router } = require("express");
const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../3-Controller/api-products");

const apiProducts = Router();

apiProducts.get("/", getProducts);

apiProducts.post("/", postProduct);

apiProducts.put("/:id", updateProduct);

apiProducts.delete("/:id", deleteProduct);

module.exports = { apiProducts };
