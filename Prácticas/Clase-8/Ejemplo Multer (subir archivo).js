const express = require("express");
const multer = require("multer");
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/uploadfile", upload.single("file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    // caso de error
    const error = new Error("Por favor carga un archivo valido");
    error.httpStatusCode = 400;
    return next(error);
  }
  //caso de exito
  res.send(file);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("server on");
});
