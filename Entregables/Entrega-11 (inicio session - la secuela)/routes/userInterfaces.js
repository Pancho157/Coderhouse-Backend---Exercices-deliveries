const { Router } = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const { Users } = require("../DB/utils/Mongoose-Schemas_Models");

const userInterfaces = Router();

// -------------------- PRODUCTOS Y CHAT --------------------
userInterfaces.get("/", isLoggedIn, (req, res) => {
  res.render("index", { name: req.session.userName });
});

// ----------------- LOGIN --------------------
userInterfaces.get("/login", (req, res) => {
  if (req.session?.usuario) res.redirect("/");

  res.render("loginForm");
});

userInterfaces.post("/login", async (req, res) => {
  const user = req.body.user;
  const userPass = req.body.userPass;
  let returnedUser;

  if (!user || !userPass) {
    res.send("Ingrese los valores requeridos");
  }

  try {
    returnedUser = await Users.find({
      // Devuelve el usuario si cohincide con el alias o el email
      $or: [{ email: user }, { alias: user }],
    });
    if (!returnedUser || user.password != userPass) {
      res.send("Usuario o contraseña incorrecto");
    }
  } catch (err) {
    res.send({ Error: true, message: err.message });
  }

  // Establece el nombre dentro de la app
  req.session.userName = returnedUser.alias;
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
  const userEmail = req.body.userEmail;
  const userAlias = req.body.userAlias;
  const userPass = req.body.userPass;

  if (!userEmail || !userPass) {
    res.send("Ingrese los valores requeridos");
  }

  try {
    await Users.create({
      alias: userAlias,
      email: userEmail,
      password: userPass,
    });
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
  req.session.userName = req.body.userAlias;
  res.redirect("/");
});

module.exports = userInterfaces;
