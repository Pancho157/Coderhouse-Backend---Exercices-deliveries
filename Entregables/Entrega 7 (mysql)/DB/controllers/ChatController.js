const knexLib = require("knex");

class ChatSQL {
  constructor(config) {
    this.knex = knexLib(config);
  }

  createTable() {
    return this.knex.schema.hasTable("messages").then((exists) => {
      if (!exists) {
        return this.knex.schema.createTable("messages", (table) => {
          table.increments("id").primary();
          table.string("email", 50).notNullable();
          table.string("date").notNullable();
          table.string("message").notNullable();
        });
      }
    });
  }

  insertMessage(data) {
    return this.knex("messages").insert(data);
  }

  getMessages() {
    return this.knex("messages").select("*");
  }
}

module.exports = { ChatSQL };
