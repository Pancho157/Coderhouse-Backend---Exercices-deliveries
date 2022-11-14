const { Router } = require("express");

const apiRandoms = Router();

apiRandoms.get("/randoms", (req, res) => {});

module.exports = { apiRandoms };
