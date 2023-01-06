function cartProductDTO(productInfo, productQuantity) {
  return {
    thumbnail: productInfo.thumbnail,
    title: productInfo.title,
    quantity: productQuantity,
    price: productInfo.price,
    unitaryPrice: productInfo.price * product.quantityproductQuantity,
    _id: productInfo._id,
  };
}

function newProductDTO(data) {
  if (!data.title || !data.price || !data.thumbnail || !data.stock) {
    throw {
      error: "No se ingresaron todos los datos necesarios",
      errorCode: 400,
    };
  }

  return {
    title: data.title,
    price: data.price,
    thumbnail: data.thumbnail,
    stock: data.stock,
  };
}

module.exports = { allProductsDTO, cartProductDTO, newProductDTO };
