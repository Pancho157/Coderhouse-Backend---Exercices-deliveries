const parseArgs = require("minimist");

const options = {
  alias: {
    m: "modo",
    p: "puerto",
    d: "debug",
  },
  default: {
    m: "prod",
    p: 0,
    d: false,
  },
};

const commandLineArgs = process.argv.slice(2);

const { modo, puerto, debug, _ } = parseArgs(commandLineArgs, options);

console.log({ modo, puerto, debug, otros: _ });
