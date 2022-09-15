const knexLib = require("knex");

class ProductosSQL {
  constructor(config) {
    this.knex = knexLib(config);
  }

  createTable() {
    return this.knex.schema.hasTable("products").then((exists) => {
      if (!exists) {
        return this.knex.schema.createTable("products", (table) => {
          table.increments("id").primary();
          table.string("nombre", 50).notNullable();
          table.float("precio").notNullable();
          table.string("imagenUrl").notNullable();
          table.integer("stock").notNullable();
        });
      } else {
        return "Ya exite la tabla products";
      }
    });
  }
  insertProduct(data) {
    return this.knex("products").insert(data);
  }

  getProducts() {
    return this.knex("products").select("*");
  }

  getProductById(productId) {
    return this.knex("products").select({ id: productId });
  }

  deleteById(productId) {
    return this.knex("products")
      .where({
        id: productId,
      })
      .del();
  }

  deleteAll() {
    return this.knex("products").del("*");
  }
}

module.exports = ProductosSQL;
