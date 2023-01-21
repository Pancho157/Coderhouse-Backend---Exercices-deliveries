const { logger } = require("../../loggers-testing/loggers/log4js-config");
const { productsService } = require("../4-Service/queries-to-db/products");

async function getProducts() {
  try {
    const products = await productsService.getAll();
    res.json(products);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function postProduct({ data }) {
  // {title, price, thumbnail, stock} = req.body
  try {
    const product = await productsService.create(data);
    res.send(product);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function updateProduct({ id, data }) {
  // {title, price, thumbnail, stock} = req.body
  try {
    const product = await productsService.update(id, data);
    res.send(product);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function deleteProduct(id) {
  try {
    res.send(await productsService.deleteById({ id }));
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

module.exports = { getProducts, postProduct, updateProduct, deleteProduct };
