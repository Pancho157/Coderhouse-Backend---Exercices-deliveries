const { DAO } = require("../DAOs/DAOselector");
const {
  sendNewOrderEmailToAdmin,
} = require("../../4-Service/utils/nodemailerMessages");
const {
  sendNewOrderMessageToAdmin,
  sendOrderConfirmationMessageToUser,
} = require("../../4-Service/utils/twilioMessages");
const { getProductById } = require("./products-repository");
const { cartProductDTO } = require("../DTOs/products-dto");

const DAOs = new DAO(process.env.PERS);

async function getCartProducts(user) {
  let userInfo;
  try {
    userInfo = await DAOs.users.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  if (userInfo.userCart == []) {
    return { userCartProducts: [], total: 0, name: user };
  } else {
    const cartProducts = userInfo.userCart;
    let userCartProducts = [];
    let total = 0;
    // for of = secuencial  -  forEach = paralelo (deja los await como promesas)
    for (const product of cartProducts) {
      try {
        const foundProduct = await getProductById(product.id);

        const cartProductInfo = cartProductDTO(foundProduct, product.quantity);

        userCartProducts.push(cartProductInfo);
        total += cartProductInfo.unitaryPrice;
      } catch (err) {
        throw {
          errorCode: 500,
          error: "Error al buscar un producto del carrito",
        };
      }
    }

    return { userCartProducts, total, name: user };
  }
}

async function updateUserCart(userAlias, cart) {
  try {
    const response = await DAOs.users.updateCart(userAlias, cart);
    return response;
  } catch (err) {
    throw { error: "Error al actualizar el carrito", errorCode: 500 };
  }
}

async function deleteUserCart(user) {
  const cart = [];
  try {
    const response = await DAOs.users.updateCart(user, cart);
    return response;
  } catch (err) {
    throw { error: "Error al actualizar el carrito", errorCode: 500 };
  }
}

module.exports = {
  getCartProducts,
  updateUserCart,
  deleteUserCart,
};
