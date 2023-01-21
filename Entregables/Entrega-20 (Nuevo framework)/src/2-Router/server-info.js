const { Router } = require("express");
const { getServerInfo } = require("../3-Controller/server-info");


const info = Router();

info.get("/info", getServerInfo);

module.exports = { info };
