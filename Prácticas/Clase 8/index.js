const express = require("express");
const { Router } = express;

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const personas = Router();
const mascotas = Router();

const listaPersonas = [];
const listaMascotas = [];

personas.get("/", (req, res) => {
  res.send(listaPersonas);
});

personas.post("/", (req, res) => {
  const { nombre, edad } = req.body;

  if (!nombre || !edad) {
    res.status(400).send("Tus datos no están completos");
  }

  listaPersonas.push(nombre, edad);
  res.send("Persona guardada con éxito");
});

mascotas.get("/", (req, res) => {
  res.send(listaMascotas);
});

mascotas.post("/", (req, res) => {
  const { nombre, raza } = req.body;

  if (!nombre || !raza) {
    res.status(400).send("Tus datos no están completos");
  }

  listaPersonas.push(nombre, raza);
  res.send("Mascota guardada con éxito");
});

app.use("/personas", personas);
app.use("/mascotas", mascotas);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server on - Port ${PORT}`);
});
