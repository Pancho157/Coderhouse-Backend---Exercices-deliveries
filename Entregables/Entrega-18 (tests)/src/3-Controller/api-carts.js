const { logger } = require("../../loggers-testing/loggers/log4js-config");
const { userCart } = require("../4-Service/queries-to-db/carts");

async function getUserCartProducts(req, res) {
  try {
    const userAndCart = await userCart.getProducts(req.session.userName);
    res.render("userCart", userAndCart);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function addOneToCartProduct(req, res) {
  const { productId, prodQuantity } = req.body;
  const user = req.session.userName;

  try {
    let response = await userCart.addOne(user, productId, prodQuantity);
    if (response) res.redirect("/userCart");
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function removeOneOfProduct(req, res) {
  const { productId } = req.body;
  const user = req.session.userName;

  try {
    let cart = await userCart.removeOne(user, productId);
    if (cart) res.redirect("/userCart");
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function deleteProductFromCart(req, res) {
  const { productId } = req.body;
  const user = req.session.userName;

  try {
    let response = await userCart.deleteProduct(user, productId);
    res.redirect("/userCart");
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function buyUserCart(req, res) {
  const user = req.session.userName;

  try {
    const response = await userCart.buy(user);
    res.status(response.status).send();
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

module.exports = {
  getUserCartProducts,
  addOneToCartProduct,
  removeOneOfProduct,
  deleteProductFromCart,
  buyUserCart,
};
