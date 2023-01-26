const { Router } = require("express");
const { getRandoms } = require("../3-Controller/api-randoms");

const apiRandoms = Router();

apiRandoms.get("/randoms/:reps", getRandoms);

module.exports = { apiRandoms };
