const {
  deleteUserCart,
  updateUserCart,
} = require("../../5-Persistence/repository/carts-repository");
const {
  getProductById,
} = require("../../5-Persistence/repository/products-repository");
const {
  getUserInfoFromDB,
} = require("../../5-Persistence/repository/users-repository");

// Messages
const { sendNewOrderEmailToAdmin } = require("../utils/nodemailerMessages");
const {
  sendNewOrderMessageToAdmin,
  sendOrderConfirmationMessageToUser,
} = require("../utils/twilioMessages");

// ---------------------------------------------------------------
async function getCartProducts(user) {
  let userInfo;
  let userCart;

  try {
    userInfo = await getUserInfoFromDB(user);
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
        const productInfo = await getProductById(product.id);

        const productDetail = {
          thumbnail: productInfo.thumbnail,
          title: productInfo.title,
          quantity: productQuantity,
          price: productInfo.price,
          unitaryPrice: productInfo.price * product.quantity,
          _id: productInfo._id,
        };

        userCartProducts.push(productDetail);
        total += productDetail.unitaryPrice;
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

// ---------------------------------------------------------------
async function addProductToUserCart(user, productId, prodQuantity = 1) {
  if (productId == null) {
    throw { error: "Producto no especificado", errorCode: 400 };
  }

  let userInfo;
  try {
    userInfo = await getUserInfoFromDB(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  let cart = userInfo.userCart;

  const productIndex = cart.findIndex((prod) => prod.id == productId);
  if (productIndex == -1) {
    cart.push({ id: productId, quantity: prodQuantity });
  } else {
    cart[productIndex].quantity += 1;
  }

  try {
    const response = await updateUserCart(userInfo.alias, cart);
    return response;
  } catch (err) {
    throw { error: "Error al actualizar el carrito", errorCode: 500 };
  }
}

// ---------------------------------------------------------------
async function removeOneFromCartProduct(user, productId) {
  let userInfo;
  try {
    userInfo = await getUserInfoFromDB(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  let cart = userInfo.userCart;

  const productIndex = cart.findIndex((prod) => prod.id == productId);
  if (productIndex == -1) {
    throw { error: "Producto no encontrado", errorCode: 400 };
  } else if (cart[productIndex].quantity > 1) {
    cart[productIndex].quantity -= 1;
  }

  try {
    const response = await updateUserCart(userInfo.alias, cart);
    return response;
  } catch (err) {
    throw { error: "Error al actualizar el carrito", errorCode: 500 };
  }
}

// ---------------------------------------------------------------
async function deleteProductFromUserCart(user, productId) {
  let userInfo;
  try {
    userInfo = await getUserInfoFromDB(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  let cart = userInfo.userCart;

  const productIndex = cart.findIndex((prod) => prod.id == productId);
  if (productIndex == -1) {
    throw { error: "Producto no encontrado", errorCode: 400 };
  } else {
    cart.splice(productIndex, 1);
  }

  try {
    const response = await updateUserCart(userInfo.alias, cart);
    return response;
  } catch (err) {
    throw { error: "Error al actualizar el carrito", errorCode: 500 };
  }
}

// ---------------------------------------------------------------
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
