const { Router } = require("express");
const numCPUs = require("os").cpus().length;
const compression = require("compression");
const { loggerInfo } = require("../middlewares/infoLogger");

const info = Router();

info.use(loggerInfo);

info.get("/info", compression, (req, res) => {
  const information = {
    entryArgs: process.execArgv,
    platformName: process.platform,
    nodeVersion: process.version,
    memoryReserved: process.memoryUsage().rss,
    executionPath: process.argv[0],
    pid: process.pid,
    projectFolder: process.cwd(),
    processorCores: numCPUs,
  };

  console.log(information);

  res.render("info", information);
});

module.exports = { info };
