const { logger } = require("../../loggers-testing/loggers/log4js-config");
const { productsService } = require("../4-Service/queries-to-db/products");

async function getProducts() {
  try {
    const products = await productsService.getAll();
    return products;
  } catch (err) {
    logger.error(err);
  }
}

async function postProduct({ data }) {
  // {title, price, thumbnail, stock} = req.body
  try {
    const product = await productsService.create(data);
    return product;
  } catch (err) {
    logger.error(err);
  }
}

async function updateProduct({ id, data }) {
  // {title, price, thumbnail, stock} = req.body
  try {
    const product = await productsService.update(id, data);
    return product;
  } catch (err) {
    logger.error(err);
  }
}

async function deleteProduct(id) {
  try {
    return await productsService.deleteById(id.id);
  } catch (err) {
    logger.error(err);
  }
}

module.exports = { getProducts, postProduct, updateProduct, deleteProduct };
