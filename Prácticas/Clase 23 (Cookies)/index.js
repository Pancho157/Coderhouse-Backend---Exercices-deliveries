/* // TODO:
Realizar un programa de backend que permita gestionar cookies desde el frontend. 
Para ello: 
    Definir una ruta “cookies”.
    Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.
    Definir un método GET que devuelva todas las cookies presentes.
    Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.

NOTA 1: Utilizar la librería express como estructura de servidor.
NOTA 2: Si algún parámetro recibido es inválido, o directamente inexistente, el servidor devolverá un objeto de error.
    Ej: { error: 'falta nombre ó valor' } o { error: 'nombre no encontrado' }. Si todo sale bien, devolver el objeto { proceso: 'ok'}.
NOTA 3: Si el tiempo no está presente, generar una cookie sin tiempo de expiración.
NOTA 4:  Generar los request con varios navegadores (Chrome, edge, Firefox) para simular los distintos clientes en forma local.
*/

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Http - Socket Server On - Port: ${PORT}`);
});

app.use(cookieParser);

app.use(express.static(path.join(__dirname, "cookies")));

app.use("/cookies", require("./routes/api"));

app.use((req, res) => {
  res.status(404).send({
    error: -1,
    descripción: `ruta ${req.url} método ${req.method} no implementada`,
  });
});
