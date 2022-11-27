const { logger } = require("../loggers/log4js-config");

function loggerInfo(req, res, next) {
  logger.info(`Request - Route: "${req.baseUrl}", Method: "${req.method}"`);
}

module.exports = { loggerInfo };
