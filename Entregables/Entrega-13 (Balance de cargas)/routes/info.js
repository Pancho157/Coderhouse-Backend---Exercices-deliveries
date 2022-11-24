const { Router } = require("express");
const numCPUs = require("os").cpus().length;

const info = Router();

info.get("/info", (req, res) => {
  const info = {
    entryArgs: process.execArgv,
    platformName: process.platform,
    nodeVersion: process.version,
    memoryReserved: process.memoryUsage().rss,
    executionPath: process.argv[0],
    pid: process.pid,
    projectFolder: process.cwd(),
    processorCores: numCPUs,
  };

  res.render("info", info);
});

module.exports = { info };
