function estadoNgix(varNginx) {
  if (varNginx === "SINIGNX") {
    if (parseInt(process.argv[2]) !== 8080) {
      const appRandom = express();
      appRandom.use("/api/randoms", router);
      appRandom.listen(parseInt(process.argv[2]), (err) => {
        if (!err)
          console.log(
            `Servidor express escuchando en el puerto ${parseInt(
              process.argv[2]
            )} - PID WORKER ${process.pid}`
          );
      });
      appRandom.get("/api/randoms", (req, res) => {
        res.send(
          `Server en PORT(${parseInt(process.argv[2])}) - PID(${
            process.pid
          }) - FYH(${new Date().toLocaleString()})`
        );
      });
    } else {
      const port = parseInt(process.env.PUERTO);

      controllersdb.conectarDB(
        process.env.URLBASE,
        JSON.parse(process.env.MI_USER),
        (err) => {
          if (err)
            return console.log("error en conexión de base de datos", err);
          console.log("BASE DE DATOS CONECTADA");

          http.listen(port, (err) => {
            if (err) return console.log("error en listen server", err);
            console.log(
              `Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`
            );
          });
        }
      );
    }
  }
  if (varNginx !== "SINIGNX") {
    const port = parseInt(process.argv[2]) || parseInt(process.env.PUERTO);

    controllersdb.conectarDB(
      process.env.URLBASE,
      JSON.parse(process.env.MI_USER),
      (err) => {
        if (err) return console.log("error en conexión de base de datos", err);
        console.log("BASE DE DATOS CONECTADA");

        http.listen(port, (err) => {
          if (err) return console.log("error en listen server", err);
          console.log(
            `Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`
          );
        });
      }
    );
  }
}
