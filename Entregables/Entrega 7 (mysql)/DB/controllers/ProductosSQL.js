import knexLib from "knex";

class ProductosSQL {
  constructor(config) {
    this.knex = knexLib(config);
  }

  createTable() {
    return this.knex.schema.hasTable("productos").then((exists) => {
      if (!exists) {
        return this.knex.schema.createTable("productos", (table) => {
          table.increments("id").primary();
          table.string("nombre", 50).notNullable();
          table.float("precio").notNullable();
          table.string("imagenUrl").notNullable();
          table.integer("stock").notNullable();
        });
      } else {
        return "Ya exite la tabla productos";
      }
    });
  }
  insertProduct(data) {
    return this.knex("productos").insert(data);
  }

  getProducts() {
    return this.knex("productos").select("*");
  }

  getProductById(productId) {
    return this.knex("productos").select({ id: productId });
  }

  deleteById(productId) {
    return this.knex("productos")
      .where({
        id: productId,
      })
      .del();
  }

  deleteAll() {
    return this.knex("productos").del("*");
  }
}

export default ProductosSQL;
