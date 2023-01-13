const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("./axios-requests/axios-requests");

const manualTesting = async () => {
  console.log("\n");
  console.log("----------------------------------------");
  console.log("------------ GET - Products -----------");
  console.log("----------------------------------------");
  try {
    const products = await getProducts();
    console.log(products.data);
  } catch (err) {
    console.log(err.message);
  }

  console.log("\n");
  console.log("----------------------------------------");
  console.log("------------ POST - Product ------------");
  console.log("----------------------------------------");
  try {
    const post = await postProduct({
      title: "Nuevo producto",
      price: 100,
      thumbnail:
        "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
      stock: 9,
    });
    console.log(post.data);
  } catch (err) {
    console.log(err.message);
  }

  console.log("\n");
  console.log("----------------------------------------");
  console.log("------------ GET - Products -----------");
  console.log("----------------------------------------");
  try {
    const products = await getProducts();
    console.log(products.data);
  } catch (err) {
    console.log(err.message);
  }

  console.log("\n");
  console.log("----------------------------------------");
  console.log("------------- PUT - Product ------------");
  console.log("----------------------------------------");
  try {
    const update = await updateProduct(2, {
      title: "Actualización de producto",
      price: 100,
      // thumbnail:
      // "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
      // stock: 9,
    });
    console.log(update.data);
  } catch (err) {
    console.log(err.message);
  }

  console.log("\n");
  console.log("----------------------------------------");
  console.log("------------ GET - Products -----------");
  console.log("----------------------------------------");
  try {
    const products = await getProducts();
    console.log(products.data);
  } catch (err) {
    console.log(err.message);
  }

  console.log("\n");
  console.log("----------------------------------------");
  console.log("----------- DELETE - Product -----------");
  console.log("----------------------------------------");
  try {
    const deleteById = await deleteProduct(2);
    console.log(deleteById.data);
  } catch (err) {
    console.log(err.message);
  }

  console.log("\n");
  console.log("----------------------------------------");
  console.log("------------ GET - Products -----------");
  console.log("----------------------------------------");
  try {
    const products = await getProducts();
    console.log(products.data);
  } catch (err) {
    console.log(err.message);
  }
};

manualTesting();
