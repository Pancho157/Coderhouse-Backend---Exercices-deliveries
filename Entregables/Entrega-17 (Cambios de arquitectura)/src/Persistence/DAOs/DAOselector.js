const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const { ProductsMongoAtlas } = require("./Products/ProductsController");
const { UserControllerMongo } = require("./Users/UsersController");

class DAO {
  static instance;

  constructor(persistance) {
    this.products = new ProductsMongoAtlas();
    this.users = new UserControllerMongo();

    switch (persistance) {
      // ------------- Firebase -------------
      case "firebase":
        const {
          ChatControllerFirebase,
        } = require("./Chat/ChatController_firebase");
        this.chat = new ChatControllerFirebase();
        break;

      // ------------- Mongoose -------------
      default:
        const {
          ChatControllerMongo,
        } = require("./Chat/ChatController_mongoose");
        this.chat = new ChatControllerMongo();
        break;
    }

    // logger.info(`Instancia usuarios: ${this.users.instance}`);
    // logger.info(`Instancia productos: ${this.products.instance}`);
    // logger.info(`Instancia chat: ${this.chat.instance}`);
  }
}

module.exports = { DAO };
