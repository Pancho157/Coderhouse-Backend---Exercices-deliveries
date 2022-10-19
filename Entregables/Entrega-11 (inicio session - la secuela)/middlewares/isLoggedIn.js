function isLoggedIn(req, res, next) {
  if (!req.session.userName) {
    res.redirect("/login");
  }
  next();
}

module.exports = { isLoggedIn };
