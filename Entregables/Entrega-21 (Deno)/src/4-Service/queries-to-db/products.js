const {
  getAllProducts,
  getProductById,
  insertProduct,
  deleteProductById,
} = require("../../5-Persistence/repository/products-repository");

// ---------------------------------------------------------------
async function getProductsFromDB() {
  try {
    const products = await getAllProducts();
    return products;
  } catch (err) {
    logger.error(err);
    throw {
      error: err.error,
      errorCode: err.errorCode,
    };
  }
}
// ---------------------------------------------------------------
async function productById(id) {
  if (!id) {
    throw { error: "No se ingresó el producto a buscar", errorCode: 400 };
  }

  try {
    const products = await getProductById(id);
    return products;
  } catch (err) {
    logger.error(err);
    throw {
      error: err.error,
      errorCode: err.errorCode,
    };
  }
}

// ---------------------------------------------------------------
async function createProduct(data) {
  try {
    const response = await insertProduct(data);
    return "Se ha generado el producto exitosamente";
  } catch (err) {
    throw {
      error: "Se ha producido un error al generar el producto",
      errorCode: 500,
    };
  }
}

// ---------------------------------------------------------------
async function deleteProductFromDB(id) {
  if (!id) {
    throw {
      error: "Ingrese el id del producto a eliminar",
      errorCode: 400,
    };
  }

  try {
    const response = await deleteProductById(id);
    return "Producto eliminado exitosamente";
  } catch (err) {
    throw { error: err.error, errorCode: err.errorCode };
  }
}

module.exports = {
  getProductsFromDB,
  productById,
  createProduct,
  deleteProductFromDB,
};
