const { postProduct } = require("../axios-client/axios-requests");
const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("./axios-requests/axios-requests");

const manualTesting = async () => {
  console.log("-------------------- GET - All products --------------------");
  const products = await getProducts();
  console.log(products);

  console.log("\n \n");

  console.log("-------------------- POST - Product --------------------");
  const post = await postProduct({
    title: "Nuevo producto",
    price: 100,
    thumbnail:
      "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
    stock: 9,
  });
  console.log(post);

  console.log("-------------------- PUT - Product --------------------");
  const update = await updateProduct(3, {
    title: "Actualización de producto",
    price: 100,
    // thumbnail:
    // "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
    // stock: 9,
  });
  console.log(update);

  console.log("-------------------- DELETE - Product --------------------");
  const deleteById = await deleteProduct(7);
  console.log(deleteById);
};
