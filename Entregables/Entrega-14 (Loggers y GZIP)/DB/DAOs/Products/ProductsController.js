const knexLib = require("knex");
const { logger } = require("../../../loggers/log4js-config");

class ProductosSQL {
  constructor(config) {
    this.knex = knexLib(config);
    this.createTable();
  }

  async createTable() {
    try {
      return await this.knex.schema.hasTable("products").then((exists) => {
        if (!exists) {
          return this.knex.schema.createTable("products", (table) => {
            table.increments("id").primary();
            table.string("title", 50).notNullable();
            table.float("price").notNullable();
            table.string("thumbnail").notNullable();
            table.integer("stock").notNullable();
          });
        } else {
          return "Ya exite la tabla products";
        }
      });
    } catch (err) {
      logger.error(`Error: ${err}`);
    }
  }

  async insertProduct(data) {
    try {
      return await this.knex("products").insert(data);
    } catch (err) {
      logger.error(`Error: ${err}`);
    }
  }

  async updateById(productId, data) {
    try {
      return await this.knex("products").where({ id: productId }).update(data);
    } catch (err) {
      logger.error(`El error es: ${err}`);
    }
  }

  async getProducts() {
    try {
      return await this.knex("products").select("*");
    } catch (err) {
      logger.error(`Error: ${err}`);
    }
  }

  async getProductById(productId) {
    try {
      return await this.knex("products")
        .select("id", "title", "price", "thumbnail", "stock")
        .where({ id: productId });
    } catch (err) {
      logger.error(`Error: ${err}`);
    }
  }

  async deleteById(productId) {
    try {
      await this.knex("products")
        .where({
          id: productId,
        })
        .del();
      return "Producto eliminado";
    } catch (err) {
      logger.error(`Error: ${err}`);
    }
  }

  async deleteAll() {
    try {
      return await this.knex("products").del();
    } catch (err) {
      logger.error(`Error: ${err}`);
    }
  }
}

module.exports = { ProductosSQL };
