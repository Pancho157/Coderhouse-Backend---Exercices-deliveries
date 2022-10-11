const express = require("express");

const app = express();

const frase = "Esta es la frase";

app.get("/api/frase", (req, res) => {
  res.send(`La palabra enviada es: ${frase}`);
});

app.get("/api/letras/:num", (req, res) => {
  let num = req.params.num;
  res.send(`La palabra seleccionada es: ${frase.charAt(num)}`);
});

app.get("/api/palabras/:num", (req, res) => {
  let num = req.params.num;
  let frase = frase.split(" ", num);
  res.send(`La palabra seleccionada es: ${frase[num]}`);
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor Http escuchando en el puerto ${PORT}`);
});
