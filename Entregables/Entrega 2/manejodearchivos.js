/***************************************************************************
 *                  M A N E J O   D E   A R C H I V O S                    *
 *                                                                         *
 * CONSIGNA:                                                               *
 *          Implementar un programa que contenga una clase llamada         *
 *          Contenedor que reciba el nombre del archivo con el que va a    *
 *          trabajar e implemente los siguientes métodos:                  *
 *                                                                         *
 *          save(Object): Number                                           *
 *               Recibe un objeto, lo guarda en el archivo, devuelve el    *
 *               id asignado.                                              *
 *                                                                         *
 *          getById(Number): Object                                        *
 *               Recibe un id y devuelve el objeto con ese id, o null si   *
 *               no está.                                                  *
 *                                                                         *
 *          getAll(): Object[]                                             *
 *               Devuelve un array con los objetos presentes en el archivo.*
 *                                                                         *
 *          deleteById(Number): void                                       *
 *               Elimina del archivo el objeto con el id buscado.          *
 *                                                                         *
 *          deleteAll(): void                                              *
 *               Elimina todos los objetos presentes en el archivo.        *
 **************************************************************************/

/***************************************************************************
 * ASPECTOS A INCLUIR EN EL ENTREGABLE:                                    *
 *                                                                         *
 * - El método save incorporará al producto un id numérico, que deberá ser *
 *   siempre uno más que el id del último objeto agregado (o id 1 si es    *
 *   el primer objeto que se agrega) y no puede estar repetido.            *
 * - Tomar en consideración el contenido previo del archivo, en caso de    *
 *   utilizar uno existente.                                               *
 * - Implementar el manejo de archivos con el módulo fs de node.js,        *
 *   utilizando promesas con async/await y manejo de errores.              *
 * - Probar el módulo creando un contenedor de productos, que se guarde en *
 *   el archivo "productos.txt".                                           *
 * - Incluir un llamado de prueba a cada método, y mostrando por pantalla  *
 *   según corresponda para verificar el correcto funcionamiento del       *
 *   módulo construido.                                                    *
 * - El formato de cada producto será:                                     *
 *        {                                                                *
 *            title: (nombre del producto),                                *
 *            price: (precio),                                             *
 *            thumbnail: (url de la foto del producto)                     *
 *        }                                                                *
 *                                                                         *
 * EJEMPLO:                                                                *
 *         Contenido de "productos.txt" con 3 productos almacenados.       *
 * [                                                                       *
 *     {                                                                   *
 *         title: 'Escuadra',                                              *
 *         price: 123.45,                                                  *
 *         thumbnail: 'https://localhost:3000',                            *
 *         id: 1                                                           *
 *     },                                                                  *
 *     {                                                                   *
 *         title: 'Calculadora',                                           *
 *         price: 345.75,                                                  *
 *         thumbnail: 'https://localhost:3000',                            *
 *         id: 2                                                           *
 *     },                                                                  *
 *     {                                                                   *
 *         title: 'Globo Terráqueo',                                       *
 *         price: 459.90,                                                  *
 *         thumbnail: 'https://localhost:3000',                            *
 *         id: 3                                                           *
 *     }                                                                   *
 * ]                                                                       *
 **************************************************************************/

const { Contenedor } = require("./contenedor");

const c = new Contenedor(
  "productos.txt",
  ["title", "price", "thumbnail"],
  "title"
);
const prod1 = {
  title: "Escuadra",
  price: 123.45,
  thumbnail: "http://localhost:3000",
};
const prod2 = {
  title: "Calculadora",
  price: 345.75,
  thumbnail: "http://localhost:3000",
};
const prod3 = {
  title: "Globo Terráqueo",
  price: 459.9,
  thumbnail: "http://localhost:3000",
};

(async function main() {
  try {
    console.log(
      "| Método: deleteAll() | - Comenzamos el ejercicio vaciando el archivo"
    );
    await c.deleteAll();
    let allProducts = await c.getAll();
    console.log(
      "\n| Método: getAll() | - Así está ahora el archivo productos.txt: ",
      allProducts
    );
    console.log(
      "\n| Método: save(item) | - Vamos ahora a agregar 3 productos al archivo."
    );
    let id1 = await c.save(prod1);
    let id2 = await c.save(prod2);
    let id3 = await c.save(prod3);
    allProducts = await c.getAll();
    console.log(
      `\n| Método: getAll() | - Estos son todos los productos insertados id: ${id1} id: ${id2} id: ${id3}`
    );
    console.log(allProducts);
    console.log(
      "\n| Método: getByField(campo, valor) | - Ahora voy a recuperar por el campo title la calculadora"
    );
    let product = await c.getByField("title", "Calculadora");
    console.log(product);
    console.log(
      "\n| Método: getById(id) | - Ahora voy a recuperar el producto con id 1"
    );
    product = await c.getById(1);
    console.log(product);
    console.log(
      "\n| Método: deleteById(id) | - Ahora voy a borrar el producto con id 2"
    );
    await c.deleteById(2);
    allProducts = await c.getAll();
    console.log(
      "\n| Método: getAll() | - Estos son todos los productos que quedaron"
    );
    console.log(allProducts);
    console.log(
      "\n| Método: save(item) | - Por último, obtendremos una excepción al intentar insertar un producto repetido"
    );
    await c.save(prod1);
  } catch (err) {
    console.error(err.message);
  }
})();
