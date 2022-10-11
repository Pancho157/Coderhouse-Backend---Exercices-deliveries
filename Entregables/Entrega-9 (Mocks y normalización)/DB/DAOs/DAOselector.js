const { ProductosSQL } = require("./ProductsController");

// Por defecto FS

const configs = JSON.parse(process.env.CONFIGS);
let productsDao = new ProductosSQL(configs.mariadb);
let chatDao;

switch (process.env.PERS) {
  // ------------- Firebase -------------
  case "firebase":
    const {
      ChatControllerFirebase,
    } = require("./Chat/ChatController_firebase");
    chatDao = new ChatControllerFirebase();
    break;

  // ------------- Mongoose -------------
  case "mongodb":
    const { connectToMongo } = require("../utils/mongooseConnection");
    connectToMongo();

    const { ChatControllerMongo } = require("./Chat/ChatController_mongoose");
    chatDao = new ChatControllerMongo();
    break;

  // ------------- File System (fs) -------------
  default:
    const { ChatControllerFS } = require("./Chat/ChatController_fs");
    chatDao = new ChatControllerFS();
    break;
}

module.exports = { productsDao, chatDao };
