const { Router } = require("express");

const apiRandoms = Router();

apiRandoms.get("/randoms:reps?", (req, res) => {
  const repetitions = parseInt(req.query.reps) || 100000000;

  res.send(JSON.stringify(repetitions));
});

module.exports = { apiRandoms };
