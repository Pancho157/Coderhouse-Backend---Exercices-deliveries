const { DAO } = require("../DAOs/DAOselector");
const { newProductDTO } = require("../DTOs/products-dto");

const DAOs = new DAO(process.env.PERS);

async function getAllProducts() {
  try {
    const products = await DAOs.products.getAll();
    return products;
  } catch (err) {
    throw {
      error: "Se ha producido un error",
      errorCode: 500,
    };
  }
}

async function getProductById(id) {
  try {
    const product = await DAOs.products.findById(id);
    return product;
  } catch (err) {
    throw {
      error: "Se ha producido un error",
      errorCode: 500,
    };
  }
}

async function insertProduct(data) {
  const newProductInfo = newProductDTO(data);

  try {
    const newProduct = await DAOs.products.insertProduct(newProductInfo);
    return true;
  } catch (err) {
    throw {
      error: "Se ha producido un error al generar el producto",
      errorCode: 500,
    };
  }
}

async function updateProduct(id, data) {
  try {
    const product = await DAOs.products.updateById(id, data);
    return product;
  } catch (err) {
    throw {
      error: "Se ha producido un error al generar el producto",
      errorCode: 500,
    };
  }
}

async function deleteProductById(id) {
  try {
    const response = await DAOs.products.deleteById(id);
    if (response.ok == 1) {
      return true;
    } else {
      throw { error: "No se ha encontrado el producto", errorCode: 400 };
    }
  } catch (err) {
    // throw {
    //   error: "Ha ocurrido un error al eliminar el producto",
    //   errorCode: 500,
    // };
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProductById,
};
