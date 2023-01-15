const request = require("supertest")("http://localhost:8080/api/products");
let lastId;

describe("Pruebas api-productos utilizando SUPERTEST", () => {
  // --------------------------------------------------------------------------
  it("GET Products - retorna status 200 y un array de objetos", (done) => {
    request
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done)
      .expect();
  });

  // --------------------------------------------------------------------------
  it("POST Product - retorna status 200 y el mensaje 'Se ha generado el producto exitosamente'", (done) => {
    request
      .post("/")
      .send({
        title: "Nuevo producto",
        price: 100,
        thumbnail:
          "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
        stock: 9,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(function (res) {
        res == "Se ha generado el producto exitosamente";
      })
      .expect(200, done);
  });

  // --------------------------------------------------------------------------
  it("PUT Product, retorna status 200 y un objeto con el producto luego de los cambios", (done) => {
    request
      .put(`/${lastId}`)
      .send({
        title: "Nuevo título de producto",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
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
    request
      .delete(`/${lastId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect("Producto eliminado exitosamente", done);
  });
});
