const mongoose = require("mongoose");

function connectToMongo() {
  mongoose.connect("mongodb://0.0.0.0:27017/ecommerce", () => {
    // console.log("Connected");
  });
}

module.exports = { connectToMongo };
