const { DAO } = require("../DAOs/DAOselector");

const DAOs = new DAO(process.env.PERS);

async function getCart(user) {
  try {
    const response = await DAOs.users.getUserInfo(user);
    return response.userCart;
  } catch (err) {
    throw { error: "Error al buscar el carrito", errorCode: 500 };
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
  getCart,
  updateUserCart,
  deleteUserCart,
};
