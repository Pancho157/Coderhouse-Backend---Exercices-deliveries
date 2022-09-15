import knexLib from "knex";

class ChatSQL {
  constructor(config) {
    this.knex = knexLib(config);
  }

  createTable() {
    return this.knex.schema.hasTable("productos").then((exists) => {
      if (!exists) {
        return this.knex.schema.createTable("mensajes", (table) => {
          table.increments("id").primary();
          table.string("email", 50).notNullable();
          table.string("fecha").notNullable();
          table.string("mensaje").notNullable();
        });
      }
    });
  }
  insertar(data) {
    return this.knex("mensajes").insert(data);
  }
  consultar() {
    return this.knex("mensajes").select("*");
  }
}

export default ChatSQL;
