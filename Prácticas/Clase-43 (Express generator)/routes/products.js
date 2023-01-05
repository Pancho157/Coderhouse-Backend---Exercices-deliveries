var express = require("express");
var router = express.Router();

let products = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/", function (req, res, next) {
  const { title, price } = req.body;
  products.push({ id: products[-1].id + 1, title: title, price: price });
  res.status(200);
});

router.delete("/", function (req, res, next) {
  const { title, price } = req.body;
  products.push({ id: products[-1].id + 1, title: title, price: price });
  res.status(200);
});
module.exports = router;
