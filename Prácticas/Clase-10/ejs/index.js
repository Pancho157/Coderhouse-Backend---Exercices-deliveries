const express = require("express");

const app = express();

app.set("PORT", 8080);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("", {
    mensaje: "Hola mundo",
  });
});

app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});
