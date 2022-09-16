const knexLib = require("knex");

class ProductosSQL {
  constructor(config) {
    this.knex = knexLib(config);
    this.createTable();
  }

  createTable() {
    try {
      return this.knex.schema.hasTable("products").then((exists) => {
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
      console.error(`Error: ${err}`);
    }
  }

  insertProduct(data) {
    try {
      return this.knex("products").insert(data);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  getProducts() {
    try {
      return this.knex("products").select("*");
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  getProductById(productId) {
    try {
      return this.knex("products").select({ id: productId });
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  deleteById(productId) {
    try {
      return this.knex("products")
        .where({
          id: productId,
        })
        .del();
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  deleteAll() {
    try {
      return this.knex("products").del("*");
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
}

module.exports = { ProductosSQL };
