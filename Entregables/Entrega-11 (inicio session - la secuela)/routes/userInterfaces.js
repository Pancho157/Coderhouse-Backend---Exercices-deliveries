const { Router } = require("express");
const {
  UserControllerMongo: Users,
} = require("../DB/DAOs/Users/UsersController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const userInterfaces = Router();

// -------------------- TABLA DE PRODUCTOS Y CHAT --------------------
userInterfaces.get("/", isLoggedIn, (req, res) => {
  res.render("index", { name: req.session.userName });
});

// ----------------- LOGIN --------------------
userInterfaces.get("/login", (req, res) => {
  if (req.session?.usuario) res.redirect("/");

  res.render("loginForm");
});

// ----------------
userInterfaces.post("/login", async (req, res) => {
  const { user, userPass } = req.body;
  let response;

  try {
    response = await Users.verifyUser(user, userPass);
  } catch (err) {
    res.send({ Error: true, message: err.message });
  }

  req.session.userName = response.alias;
  res.redirect("/");
});

// -------------------- LOGOUT --------------------
userInterfaces.get("/logout", isLoggedIn, (req, res) => {
  const userName = req.session.userName;
  req.session.destroy((err) => {
    if (err) {
      res.send({ Error: true, message: err.message });
    }
  });
  res.render("logOut", { name: userName });
});

// -------------------- REGISTER --------------------
userInterfaces.get("/register", (req, res) => {
  res.render("registerForm");
});

userInterfaces.post("/register", async (req, res) => {
  const { userEmail, userAlias, userPass } = req.body;
  let response;

  if (!userEmail || !userAlias || !userPass) {
    res.send("Ingrese los valores requeridos");
  }

  try {
    response = Users.createUser(userAlias, userEmail, userPass);
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }

  if (!response.alias) res.send(response);

  req.session.userName = req.body.userAlias;
  res.redirect("/");
});

module.exports = userInterfaces;
