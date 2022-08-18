const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("hello.pug", { mensaje: "felipe" });
});

app.get("/datos", (req, res) => {
  const { min, max, value } = req.query;
  res.render("meter.pug", {
    min: value,
    max: min,
    value: max,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server on - PORT: ${PORT}`);
});
