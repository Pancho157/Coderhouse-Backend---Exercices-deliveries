const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const ejs = require("ejs");
const pug = require("pug");
const { products } = require("./router/productos");

var app = express();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Todo: Para utilizar handlebars descomentar las 3 lineas siguientes
// app.engine(".hbs", engine({ extname: ".hbs" }));
// app.set("view engine", ".hbs");
// app.set("views", path.join(__dirname, "views/handlebars"));

// Todo: Para utilizar ejs descomentar la siguiente linea
// app.set("view engine", ".ejs");
// app.set("views", path.join(__dirname, "views/ejs"));

// Todo: Para utilizar pug descomentar la siguiente linea
app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views/pug"));

// Establece donde buscar las vistas

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/api/productos", require("./router/sin_usar_clases"));

// Renderiza el formulario
app.get("/", (req, res) => {
  res.render("form");
});

// Renderiza la tabla con los productos y le envía los productos
app.get("/productos", (req, res) => {
  res.render("productsTable", { products: products });
});

// Da el error 404 en caso de no encontrar un endpoint (debe estar debajo de todas las rutas)
app.use((req, res) => {
  res.status(404).send("No se encontró la página que estás buscando");
});
