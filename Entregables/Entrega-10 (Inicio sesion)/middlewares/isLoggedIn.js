function idLoggedIn(req, res, next) {
  if (req.session.userName) {
    next();
  }
  res.redirect("/login");
}

module.exports = { isLoggedIn };
