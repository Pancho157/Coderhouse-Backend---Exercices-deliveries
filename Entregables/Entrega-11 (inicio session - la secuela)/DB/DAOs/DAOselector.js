const { ProductosSQL } = require("./Products/ProductsController");

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
    const { ChatControllerMongo } = require("./Chat/ChatController_mongoose");
    chatDao = new ChatControllerMongo();
    break;

  // ------------- File System (fs) -------------
  default:
    const { ChatControllerFS } = require("./Chat/ChatController_FS");
    chatDao = new ChatControllerFS("./DB/chat.txt");
    break;
}

module.exports = { productsDao, chatDao };
