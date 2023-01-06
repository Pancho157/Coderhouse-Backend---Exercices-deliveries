function allProductsDTO(data) {}

function productDTO(data) {}

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

module.exports = { allProductsDTO, productDTO, newProductDTO };
