const { promises: fs } = require("fs");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(newObject) {
    // Obtiene los datos del archivo
    let objetos = [];
    try {
      objetos = await this.getAll();
    } catch {
      throw new Error(`Error al traer los productos: ${Error}`);
    }

    let isUnique = objetos.find((product) => product.title === newObject.title);
    if (isUnique != undefined) {
      return `El objeto ingresado ya existe`;
    }

    // Genera el id
    let newId;
    if (objetos.length == 0) {
      newId = 1;
    } else {
      const ultimoId = objetos[objetos.length - 1].id;
      newId = ultimoId + 1;
    }

    // Agrega el nuevo objeto al array
    objetos.push({ ...newObject, id: newId });

    try {
      await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2));
      return newId;
    } catch {
      throw new Error(`Error al guardar: ${Error}`);
    }
  }

  async update(id, newObject) {
    const { title, price, thumbnail } = newObject;
    let productos;

    try {
      productos = await this.getAll();
    } catch {
      throw new Error(`Error: no fue posible traer los productos`);
    }

    let productIndex = productos.findIndex((product) => product.id === id);

    if (!product) {
      throw new Error(`Error: producto no encontrado`);
    } else {
      productos[productIndex].title = title;
      productos[productIndex].price = price;
      productos[productIndex].thumbnail = thumbnail;
    }

    try {
      await fs.writeFile(this.ruta, JSON.stringify(productos, null, 2));
      return console.log(`Se ha actualizado el producto`);
    } catch {
      throw new Error(`Error al guardar: ${Error}`);
    }
  }

  async getById(id) {
    let products;
    try {
      products = await this.getAll();
    } catch {
      throw new Error(`Error al traer los productos: ${Error}`);
    }
    const filteredProduct = products.find((product) => product.id === id);
    if (filteredProduct == undefined) {
      return [];
    }
    console.log(`Devuelto el elemento con ID = ${id}`);
    return filteredProduct;
  }

  async getAll() {
    try {
      const objetos = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(objetos);
    } catch {
      return [];
    }
  }

  async deleteById(id) {
    let products;

    try {
      products = await this.getAll();
    } catch {
      throw new Error(`Error al traer los productos: ${Error}`);
    }

    const filteredProducts = products.filter((product) => product.id != id);

    if (filteredProducts.length === products.length) {
      throw new Error(
        `Error al borrar: No se encontró el id ingresado (${id})`
      );
    }

    try {
      await fs.writeFile(this.ruta, JSON.stringify(filteredProducts, null, 2));
      console.log(`Eliminado el elemento con el ID = ${id}`);
    } catch {
      throw new Error(`Error al guardar: ${Error}`);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
      console.log(`Eliminados todos los productos`);
    } catch {
      throw new Error(`Error al borrar: ${Error}`);
    }
  }
}

module.exports = { Contenedor };
