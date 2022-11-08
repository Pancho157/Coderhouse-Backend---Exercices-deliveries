const { Router } = require("express");
const { UserControllerMongo } = require("../DB/DAOs/Users/UsersController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const userInterfaces = Router();

let Users = new UserControllerMongo();

// -------------------- TABLA DE PRODUCTOS Y CHAT --------------------
userInterfaces.get("/", (req, res) => {
  if (req.session.userName == undefined) {
    res.redirect("/login");
  } else {
    res.render("index", { name: req.session.userName });
  }
});

// ----------------- LOGIN --------------------
userInterfaces.get("/login", (req, res) => {
  if (req.session?.usuario) {
    res.redirect("/");
  } else {
    res.render("loginForm");
  }
});

// ----------------
userInterfaces.post("/login", async (req, res) => {
  const { user, userPass } = req.body;
  let response;

  try {
    response = await Users.verifyUser(user, userPass);
    res.send(response);
    if (!response.alias) res.redirect("/login/error");
    req.session.userName = response.alias;
  } catch (err) {
    res.send({ Error: true, message: err.message });
  }

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
  try {
    response = await Users.createUser(userAlias, userEmail, userPass);

    //  En caso de existir un email y/o alias la respuesta es un objeto con el valor encontrado
    if (response.alias || response.email)
      res.redirect(
        `/register/error?email=${response.email}&alias=${response.alias}`
      );

    /* En caso de salir todo correctamente devuelve un objeto con newUserAlias */
    req.session.userName = response.newUserAlias;
    console.log(response);
  } catch (err) {
    res.send({ error: true, message: err.message });
  }

  res.redirect("/");
});

// -------------------- LOGIN / REGISTER ERROR --------------------

userInterfaces.get("/register/error", (req, res) => {
  res.render("registerError", {
    email: req.query.email,
    alias: req.query.alias,
  });
});

userInterfaces.get("/login/error", (req, res) => {
  res.render("loginError");
});

// -------------------- Pruebas --------------------

userInterfaces.get("/prueba", async (req, res) => {
  try {
    let response = await Users.createUser("userAlias", "userEmail", "userPass");
    console.log(response);
    res.send(response);
  } catch (err) {
    res.send({ error: true, message: err.message });
  }
});

module.exports = userInterfaces;
