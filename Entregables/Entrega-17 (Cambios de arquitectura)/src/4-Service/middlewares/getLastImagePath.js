const fs = require("fs");

getPhotoPathAsReqBody = (req, res, next) => {
  const photos = fs.readdirSync("./src/1-Server/public/images");
  req.body.pathToPhoto = photos[photos.length - 1];
  next();
};

module.exports = { getPhotoPathAsReqBody };
