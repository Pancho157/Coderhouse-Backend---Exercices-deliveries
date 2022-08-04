const http = require("http");

const getMensaje = () => {
  const date = new Date();
  let hour = date.getHours();
  if (hour >= 6 && hour <= 12) {
    return "Buenos días!"
  } else if (hour >= 13 && hour <= 19) {
    return "Buenas tardes!"
  } else {
    return "Buenas noches!"
  }
};

const server = http.createServer((peticion, respuesta) => {
  respuesta.end(getMensaje());
});

const connectedServer = server.listen(8080, () => {
  console.log(
    `Servidos Http escuchando en el puerto ${connectedServer.address().port}`
  );
});
