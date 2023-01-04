const axios = require("axios");

async function postRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  try {
    const response = await axios.post("http://localhost:3000", {
      number: randomNumber,
    });
  } catch (err) {
    console.log(err);
  }
}

