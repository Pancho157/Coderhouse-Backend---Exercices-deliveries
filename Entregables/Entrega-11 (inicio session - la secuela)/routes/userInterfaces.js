const { Router } = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const userInterfaces = Router();

userInterfaces.get("/", isLoggedIn, (req, res) => {
  res.render("index", { name: req.session.userName });
});

userInterfaces.get("/login", (req, res) => {
  if (req.session?.usuario) res.redirect("/");

  res.render("loginForm");
});

userInterfaces.post("/login", (req, res) => {
  req.session.userName = req.body.userName;

  // TODO: Ver por qué no redirige
  // * Por ahora lo solucioné redirigiendo desde el front
  res.redirect("/");
});

userInterfaces.get("/logout", isLoggedIn, (req, res) => {
  const userName = req.session.userName;
  req.session.destroy((err) => {
    if (err) {
      res.send({ Error: true, message: err });
    }
  });
  res.render("logOut", { name: userName });
});

module.exports = userInterfaces;
