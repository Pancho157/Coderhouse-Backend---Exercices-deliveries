const {
  deleteUserCart,
} = require("../../5-Persistence/repository/carts-repository");
const {
  getUserInfoFromDB,
} = require("../../5-Persistence/repository/users-repository");
const { sendNewOrderEmailToAdmin } = require("../utils/nodemailerMessages");
const {
  sendNewOrderMessageToAdmin,
  sendOrderConfirmationMessageToUser,
} = require("../utils/twilioMessages");

async function getCartProducts(user) {}

async function addProductToUserCart(user, productId, prodQuantity = 1) {}

async function removeOneFromCartProduct(user, productId) {}

async function deleteProductFromUserCart(user, productId) {}

async function buyCart(user) {
  let userInfo;
  let userCart;

  try {
    userInfo = await getUserInfoFromDB(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  try {
    userCart = await getCartProducts(user);
  } catch (err) {
    throw { error: "No se ", errorCode: 400 };
  }

  try {
    // Twilio Messages
    await sendNewOrderMessageToAdmin(userCart.userCartProducts, userInfo);
    await sendOrderConfirmationMessageToUser(userInfo);

    // Nodemailer Messages
    await sendNewOrderEmailToAdmin(userCart.userCartProducts, userInfo);

    // Empties user cart
    await deleteUserCart(user);
  } catch (err) {
    throw { error: err, errorCode: 400 };
  }

  return { status: 200 };
}

module.exports = {
  getCartProducts,
  addProductToUserCart,
  removeOneFromCartProduct,
  deleteProductFromUserCart,
  buyCart,
};
