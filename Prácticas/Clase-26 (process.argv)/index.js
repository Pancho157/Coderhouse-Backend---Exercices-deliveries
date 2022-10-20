const yargs = require("yargs/yargs")(process.argv.slice(2));

const { modo, puerto, debug, _ } = yargs
  .alias({
    m: "modo",
    p: "puerto",
    d: "debug",
  })
  .default({
    m: "prod",
    p: 0,
    d: false,
  }).argv;

console.log({ modo, puerto, debug, otros: _ });
