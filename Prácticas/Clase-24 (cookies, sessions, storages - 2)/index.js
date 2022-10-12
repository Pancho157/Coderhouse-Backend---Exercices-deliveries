const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Http - Socket Server On - Port: ${PORT}`);
});

app.use(cookieParser);
app.use(
  session({
    store: new FileStore({ path: "./sesions", ttl: 60 }),
    secret: "shhhh",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", require("./routes/index"));
app.use("/cookies", require("./routes/api"));

app.use((req, res) => {
  res.status(404).send({
    error: -1,
    descripción: `ruta ${req.url} método ${req.method} no implementada`,
  });
});
