const options = {
  client: "mysql",
  connection: {
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "rootUs3rs",
    database: "ecommerce",
  },
};

module.exports = { options };
