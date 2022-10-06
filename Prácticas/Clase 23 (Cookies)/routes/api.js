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
const api = express.Router();

api.post("/", (req, res) => {
  const { nombre, valor, tiempo } = req.body;

  if (!nombre || !valor) {
    res.json({ error: "Falta nombre o valor" });
  }

  res.json({ proceso: "ok" });
});

api.get("/", (req, res) => {
  res.json({ cookies: req.cookies, signedCookies: req.cookies.signedCookies });
});

api.delete("/:nombreCookie", (req, res) => {
  if (
    !req.cookies[req.params.nombreCookie] &&
    !req.cookies.signedCookies[req.params.nombreCookie]
  ) {
    res.json({ error: "Nombre de cookie erroneo" });
  }
  res.json({ proceso: "ok" });
});
