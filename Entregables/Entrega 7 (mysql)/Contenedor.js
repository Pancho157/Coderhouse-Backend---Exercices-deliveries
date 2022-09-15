import kinexLib from "knex";

class ClienteSQL {
  constructor(config) {
    this.knex = kinexLib(config);
  }

  createTable() {
    return this.knex.schema.hasTable("productos").then((exists) => {
      if (!exists) {
        return this.knex.schema.createTable("productos", (table) => {
          table.increments("id").primary();
          table.string("nombre", 50).notNullable();
          table.float("precio").notNullable();
          table.string("imagenUrl").notNullable();
        });
      }
    });
  }

  request() {}

  requestById(id) {}

  insert(data) {}

  delete(id) {}

  close() {
    this.knex.destroy();
  }
}

export default ClienteSQL;

// 1. Enviar las opciones de conexión al cliente (dentro de la carpeta DB)
// 2. Realizar operaciones sobre la DB usando la conexión abierta
/* 
        Crear tabla
        Insertar datos en tabla
        Consultar datos en tabla
        Eliminar datos de tabla
    */
// 3. Cerrar la conexión
