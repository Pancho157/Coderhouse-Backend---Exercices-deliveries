const session = require("express-session");
const MongoStore = require("connect-mongo");

const configs = JSON.parse(process.env.CONFIGS);

const Session = session({
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://Pancho:VkCAVriXGpPzWpc3@tests-with-mongoatlas.mnyne3y.mongodb.net/?retryWrites=true&w=majority",
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
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
