/* 
CONSIGNA: Implementar un programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

* save(Object): Number 
 - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
 - El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido
* getById(Number): Object
 - Recibe un id y devielve el objeto con ese id, o null si no está
* getAll(): Object[]
 - Devuelve un array con todos los objetos presentes en el archivo
* deleteById(Number): void
 - Elimina del archivo el objeto con el id buscado
* deleteAll(): void
 - Elimina todos los objetos presentes en el archivo

* Observaciones:
 - Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente
 - Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores
 - Probar el módulo creando un contenedor de productos que se guarde en el archivo "productos.txt"
 - Incluir un llamado de prueba a cada método y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo constuído
 - El formato de cada producto será:
        {
            title: (nombre del producto),
            price: (precio),
            thumbnail: (url de la foto del producto)
        }
*/

const { promises: fs } = require("fs");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(newObject) {
    // Obtiene los datos del archivo
    const objetos = await this.getAll();

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

  async getById(id) {
    const products = await this.getAll();
    const filteredProduct = products.find((product) => product.id === id);

    console.log(filteredProduct);

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
    const products = await this.getAll();

    const filteredProducts = products.filter((product) => product.id != id);

    if (filteredProducts.length === products.length) {
      throw new Error(
        `Error al borrar: No se encontró el id ingresado (${id})`
      );
    }

    try {
      await fs.writeFile(this.ruta, JSON.stringify(filteredProducts, null, 2));
    } catch {
      throw new Error(`Error al guardar: ${Error}`);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch {
      throw new Error(`Error al borrar: ${Error}`);
    }
  }
}

module.exports = { Contenedor };
