const request = require("supertest")("http://localhost:8080/api/products");
let lastId;

console.log("\n \n");
console.log(
  "-----------------------------------------------------------------------------------------------------"
);
console.log(
  "- - - - - - - - - - - - - - - - - - - - - - - SUPERTEST - - - - - - - - - - - - - - - - - - - - - - -"
);
console.log(
  "-----------------------------------------------------------------------------------------------------"
);
describe("Pruebas api-productos utilizando SUPERTEST", () => {
  console.log("\n");
  console.log("----------------------------------------");
  console.log("------------ GET - Products -----------");
  console.log("----------------------------------------");
  // --------------------------------------------------------------------------
  it("GET Products - retorna status 200 y un array de objetos", (done) => {
    request
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        if (typeof res.data != "array") {
          throw new Error("GET Products - no retorna un array de objetos");
        }
        done();
      });
  });

  // --------------------------------------------------------------------------
  it("POST Product - retorna status 200 y el mensaje 'Se ha generado el producto exitosamente'", (done) => {
    console.log("\n");
    console.log("----------------------------------------");
    console.log("------------ POST - Product ------------");
    console.log("----------------------------------------");

    request
      .post("/")
      .send({
        title: "Nuevo producto",
        price: 100,
        thumbnail:
          "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
        stock: 9,
      })
      .expect(function (res) {
        res == "Se ha generado el producto exitosamente";
      })
      .expect(200, done);
  });

  // --------------------------------------------------------------------------
  it("PUT Product, retorna status 200 y un objeto con el producto luego de los cambios", (done) => {
    console.log("\n");
    console.log("----------------------------------------");
    console.log("------------- PUT - Product ------------");
    console.log("----------------------------------------");

    request
      .put(`/${lastId}`)
      .send({
        title: "Nuevo título de producto",
      })
      .expect(200)
      .expect(
        // Info del producto agregado en el test de POST
        {
          title: "Nuevo título de producto",
          price: 100,
          thumbnail:
            "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
          stock: 9,
        }
      )
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // --------------------------------------------------------------------------
  it("Delete product, retorna status 200 y un string diciendo 'Producto eliminado exitosamente'", (done) => {
    console.log("\n");
    console.log("----------------------------------------");
    console.log("----------- DELETE - Product -----------");
    console.log("----------------------------------------");

    request
      .delete(`/${lastId}`)
      .expect(200)
      .expect("Producto eliminado exitosamente", done);
  });
});
