const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../axios-requests/axios-requests");

let lastId;

const manualTesting = async () => {
  console.log("\n \n");
  console.log(
    "-----------------------------------------------------------------------------------------------------"
  );
  console.log(
    "- - - - - - - - - - - - - - - - - - - - - - - AXIOS TEST - - - - - - - - - - - - - - - - - - - - - - "
  );
  console.log(
    "-----------------------------------------------------------------------------------------------------"
  );

  console.log("\n");
  console.log("----------------------------------------");
  console.log("------------ GET - Products -----------");
  console.log("----------------------------------------");
  try {
    const products = await getProducts();

    if (Array.isArray(products.data)) {
      lastId = products.data.length - 1;
      console.log("[ok] - El método GET devuelve un array de objetos");
    } else {
      console.error("[error] - El método GET no devuelve un array de objetos");
    }
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

    if (post.data == "Se ha generado el producto exitosamente") {
      console.log("[ok] - El método POST devuelve un mensaje de éxito ");
    } else {
      console.error("[error] - El método POST no devuelve un meesaje de éxito");
    }
  } catch (err) {
    console.log(err.message);
  }

  console.log("\n");
  console.log("----------------------------------------");
  console.log("------------- PUT - Product ------------");
  console.log("----------------------------------------");
  try {
    const update = await updateProduct(lastId, {
      title: "Actualización de producto",
      price: 100,
      // thumbnail:
      // "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
      // stock: 9,
    });

    console.log(update.data);

    if (update.data.title == "Actualización de producto") {
      console.log(
        "[ok] - El método PUT devuelve el producto actualizado como objeto"
      );
    } else {
      console.error(
        "[error] - El método PUT no devuelve el producto actualizado como objeto"
      );
    }
  } catch (err) {
    console.log(err.message);
  }

  console.log("\n");
  console.log("----------------------------------------");
  console.log("----------- DELETE - Product -----------");
  console.log("----------------------------------------");
  try {
    const deleteById = await deleteProduct(lastId);

    if (deleteById.data == "Producto eliminado exitosamente") {
      console.log("[ok] - El método DELETE devuelve un mensaje de éxito ");
    } else {
      console.error(
        "[error] - El método DELETE no devuelve un meesaje de éxito"
      );
    }
  } catch (err) {
    console.log(err.message);
  }
};

manualTesting();
