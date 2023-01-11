const { logger } = require("../../loggers-testing/loggers/log4js-config");
const {
  getProductsFromDB,
  productById,
  createProduct,
  deleteProductFromDB,
} = require("../4-Service/queries-to-db/products");

async function getProducts(req, res) {
  try {
    const products = await getProductsFromDB();
    res.json(products);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function postProduct(req, res) {
  // {title, price, thumbnail, stock} = req.body
  try {
    const product = await createProduct(req.body);
    res.send(product);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function deleteProduct(req, res) {
  try {
    res.send(await deleteProductFromDB(req.params.id));
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

module.exports = { getProducts, postProduct, deleteProduct };
