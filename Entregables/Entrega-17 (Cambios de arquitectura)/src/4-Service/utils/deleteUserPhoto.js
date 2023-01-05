const fs = require("fs");
const path = require("path");

function deleteUserPhoto(photo) {
  fs.unlinkSync(path.join(__dirname, `../../1-Server/public/images/${photo}`));
}

module.exports = { deleteUserPhoto };
