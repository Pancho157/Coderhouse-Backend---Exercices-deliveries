const express = require("express");

const app = express();

const server = app.listen(8080, () => {
  console.log("Server on");
});

app.get("/", (req, res) => {
  res.send("Hola yarn");
});
