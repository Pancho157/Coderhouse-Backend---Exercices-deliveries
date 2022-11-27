const { Router } = require("express");
const { fork } = require("child_process");
const path = require("path");
const { loggerInfo } = require("../middlewares/infoLogger");

const apiRandoms = Router();

apiRandoms.get("/randoms:reps?", loggerInfo, (req, res) => {
  const repetitions = parseInt(req.query.reps) || 100000000;

  const randomObject = fork(
    path.resolve(__dirname, "../child-process/randomNumbers.js")
  );

  randomObject.on("message", (object) => {
    res.send(object);
  });

  randomObject.send(repetitions);
});

module.exports = { apiRandoms };
