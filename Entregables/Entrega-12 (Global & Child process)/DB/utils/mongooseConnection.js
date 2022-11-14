const mongoose = require("mongoose");

function connectToMongo() {
  mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
    console.log("Connected");
  });
}

module.exports = { connectToMongo };
