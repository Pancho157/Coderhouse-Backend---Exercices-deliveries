const express = require("express");
const routerTest = express.Router();
const { faker } = require("@faker-js/faker");

function createRandomProduct() {
  const randomProduct = {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail: faker.image.cats(),
  };

  return randomProduct;
}

routerTest.get("/", async (req, res) => {
  // Devuelve 5 productos generados al azar utilizando Faker.js
  // El producto se debe conformar por: nombre, precio y foto

  const randomProducts = [];

  for (let i = 0; i < 5; i++) {
    randomProducts.push(createRandomProduct());
  }

  res.json(randomProducts);
});

module.exports = routerTest;
