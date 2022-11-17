const session = require("express-session");
const MongoStore = require("connect-mongo");

const configs = JSON.parse(process.env.CONFIGS);

// VkCAVriXGpPzWpc3

const Session = session({
  store: MongoStore.create({
    mongoUrl: "mongodb://0.0.0.0:27017/sessions",
  }),
  secret: "mongoSecret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000,
  },
});

module.exports = { Session };
