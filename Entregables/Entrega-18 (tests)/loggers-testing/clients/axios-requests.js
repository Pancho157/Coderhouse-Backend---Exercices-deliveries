const axios = require("axios");

const getProducts = async () => {
  const response = await axios.get("http://localhost:8080/api/products");
};

const postProduct = async (data) => {
  const response = await axios.post("http://localhost:8080/api/products", data);
};

const updateProduct = async (id, data) => {
  const response = await axios({
    method: "put",
    url: `http://localhost:8080/api/products${id}`,
    data: data,
  });
};

const deleteProduct = async (id) => {
  const response = await axios.delete("https://reqres.in/api/posts/1");
};
