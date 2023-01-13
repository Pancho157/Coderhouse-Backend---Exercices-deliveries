const { logger } = require("../../loggers-testing/loggers/log4js-config");
const { productsService } = require("../4-Service/queries-to-db/products");

async function getProducts(req, res) {
  try {
    const products = await productsService.getAll();
    res.json(products);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function postProduct(req, res) {
  // {title, price, thumbnail, stock} = req.body
  try {
    const product = await productsService.create(req.body);
    res.send(product);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function updateProduct(req, res) {
  // {title, price, thumbnail, stock} = req.body
  try {
    const product = await productsService.update(req.params.id, req.body);
    res.send(product);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function deleteProduct(req, res) {
  try {
    res.send(await productsService.deleteById(req.params.id));
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

module.exports = { getProducts, postProduct, updateProduct, deleteProduct };
