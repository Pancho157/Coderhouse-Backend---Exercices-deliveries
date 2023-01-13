const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("./axios-requests/axios-requests");
const assert = require("assert");

describe("Prueba MOCHA", function () {
  it("GET Products, retorna status 200 y un array de objetos", async function () {
    const { status, data } = await getProducts();
    assert.equal(status, 200);
    assert.equal(expect(data).to.be.an("array"));
  });

  it("POST de un producto, retorna status 200 y un objecto con su ID asignado", async function () {
    const { status, data } = await postProduct({
      title: "Nuevo producto",
      price: 100,
      thumbnail:
        "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
      stock: 9,
    });

    assert.equal(status, 200);
    assert.equal(typeof data, "object");
    assert.equal(
      JSON.stringify(data),
      JSON.stringify({ id: parseInt(data.id) })
    );
  });

  it("PUT de un producto por su ID, retorna status 200 y un objeto con un mensaje de exito", async function () {
    const products = await getProducts();
    const { status, data } = await updateProduct(
      products.data[products.data.length - 1].id, // Último producto
      {
        title: "Nuevo título de producto",
      }
    );
    assert.equal(status, 200);
    assert.equal(typeof data, "object");
    assert.equal(
      JSON.stringify(data),
      JSON.stringify({ respuesta: "Dato actualizado exitosamente" })
    );
  });

  it("Delete product, retorna status 200 y el objeto eliminado", async function () {
    const yproducts = await getProducts();
    const { status, data } = await deleteProduct(
      parseInt(yproducts.data[yproducts.data.length - 1].id)
    );
    assert.equal(status, 200);
    assert.equal(typeof data, "object");
    assert.equal(
      JSON.stringify(data),
      JSON.stringify({ respuesta: "ID eliminado exitosamente" })
    );
  });
});
