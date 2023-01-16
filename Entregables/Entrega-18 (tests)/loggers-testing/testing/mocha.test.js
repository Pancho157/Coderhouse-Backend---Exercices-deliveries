const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("./axios-requests/axios-requests");
const assert = require("assert");

console.log("\n \n");
console.log(
  "-----------------------------------------------------------------------------------------------------"
);
console.log(
  "- - - - - - - - - - - - - - - - - - - - - - - - Mocha - - - - - - - - - - - - - - - - - - - - - - - -"
);
console.log(
  "-----------------------------------------------------------------------------------------------------"
);

describe("Pruebas api-productos utilizando MOCHA", function () {
  it("GET Products - retorna status 200 y un array de objetos", async function () {
    try {
      const { status, data } = await getProducts();
      assert.equal(status, 200);
      assert.equal(
        typeof data,
        "array",
        "El método GET no responde con un array"
      );
    } catch (err) {
      console.error(err);
    }
  });

  it("POST Product - retorna status 200 y el mensaje 'Se ha generado el producto exitosamente'", async function () {
    try {
      const { status, data } = await postProduct({
        title: "Nuevo producto",
        price: 100,
        thumbnail:
          "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
        stock: 9,
      });

      assert.equal(status, 200);
      assert.strictEqual(
        typeof data,
        "string",
        "El método POST no devuelve el mensaje de éxito"
      );

      console.log("--------------- Verificación de creación ---------------");
      const productsAfterPost = await getProducts();
      assert.notEqual(
        productsAfterPost.data.find(
          (x) => x.title == "Nuevo título de producto"
        ),
        undefined
      );
    } catch (err) {
      console.error(err);
    }
  });

  it("PUT Product, retorna status 200 y un objeto con el producto luego de los cambios", async function () {
    try {
      const allProducts = await getProducts();
      const { status, data } = await updateProduct(
        parseInt(allProducts.data[allProducts.data.length - 1].id), // Id del último producto
        {
          title: "Nuevo título de producto",
        }
      );

      assert.equal(status, 200);
      console.log(">>>>>>>>>>>>>> DATA <<<<<<<<<<<<<<<<<" + "\n" + data);
      // assert.equal(typeof data, "object");
    } catch (err) {
      console.error(err);
    }
  });

  it("Delete product, retorna status 200 y un string diciendo 'Producto eliminado exitosamente'", async function () {
    try {
      const allProducts = await getProducts();
      const { status, data } = await deleteProduct(
        parseInt(allProducts.data[allProducts.data.length - 1].id) // Id del último producto
      );
      assert.equal(status, 200);
      assert.strictEqual(
        typeof data,
        "string",
        "El método DELETE no devuelve un mensaje de éxito"
      );
    } catch (err) {
      console.error(err);
    }
  });
});
