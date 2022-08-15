const express = require("express");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", require("./router/productos"));

// Da el error 404, debe estar debajo de todas las rutas
app.use((req, res) => {
  res.status(404).send("No se encontró la página que estás buscando");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
