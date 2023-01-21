const {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProductById,
} = require("../../5-Persistence/repository/products-repository");

class ProductsService {
  constructor() {}

  // ---------------------------------------------------------------
  async getAll() {
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
  async getById(id) {
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
  async create(data) {
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
  async update(id, data) {
    const { title, price, thumbnail, stock } = data;
    const dataToUpdate = {};

    if (title) dataToUpdate.title = title;
    if (price) dataToUpdate.price = price;
    if (thumbnail) dataToUpdate.thumbnail = thumbnail;
    if (stock) dataToUpdate.stock = stock;

    try {
      const response = await updateProduct(id, dataToUpdate);
      return response;
    } catch (err) {
      throw {
        error: "Se ha producido un error al generar el producto",
        errorCode: 500,
      };
    }
  }

  // ---------------------------------------------------------------
  async deleteById(id) {
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
}

const productsService = new ProductsService();

module.exports = {
  productsService,
};
