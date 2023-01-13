const axios = require("axios");

const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products");
    return response;
  } catch (err) {
    console.error(err);
  }
};

const postProduct = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/products",
      data
      // {
      //   title: "Nombre del producto",
      //   price: 100,
      //   thumbnail: "",
      //   stock: 0,
      // }
    );

    return response;
  } catch (err) {
    console.error(err);
  }
};

const updateProduct = async (id, data) => {
  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:8080/api/products/${id}`,
      data: data,
      // data: {
      // title: "Nuevo nombre de producto",
      // price: 100,
      // thumbnail: "",
      // stock: 0,
      // },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/products/${id}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
};
