const { Products } = require("../../utils/Mongoose-Schemas_Models");
const { logger } = require("../../../../loggers-testing/loggers/log4js-config");

class ProductsMongoAtlas {
  static instance;

  constructor() {
    // Doble negación de "undefined" = false
    if (!!ProductsMongoAtlas.instance) {
      return ProductsMongoAtlas.instance;
    }

    ProductsMongoAtlas.instance = this;
    this.lastId = this.getLastId();
  }

  async updateById(productId, data) {
    try {
      const updated = await Products.findByIdAndUpdate(productId, data, {
        new: true,
      });

      return updated;
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }

  async getLastId() {
    const foundId = await Products.find().sort({ _id: -1 }).limit(1);
    foundId[0] ? (this.lastId = foundId[0]._id) : (this.lastId = 1);
  }

  async getProducts() {
    try {
      const allProducts = await Products.find();
      return allProducts;
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }

  async insertProduct(data) {
    this.lastId++;

    try {
      await Products.create({
        _id: this.lastId,
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        stock: data.stock,
      });
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }

  async getAll() {
    try {
      const allProducts = await Products.find();
      return allProducts;
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }

  async findById(productId) {
    try {
      const product = await Products.findOne({ _id: productId });
      return product;
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }

  async deleteById(productId) {
    try {
      const deleted = await Products.deleteOne({ _id: productId });

      if (deleted) return `Producto (id = ${productId}) eliminado`;
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }
}

module.exports = { ProductsMongoAtlas };
