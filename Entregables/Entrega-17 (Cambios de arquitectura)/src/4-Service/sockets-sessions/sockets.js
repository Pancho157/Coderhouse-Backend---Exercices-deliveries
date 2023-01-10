const sharedsession = require("express-socket.io-session");
const { Session } = require("./sessions");

const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const { getAllMessages, chatNewMessage } = require("../queries-to-db/chat");
const {
  getProductsFromDB,
  createProduct,
} = require("../queries-to-db/products");

async function sockets(io) {
  io.use(
    sharedsession(Session, {
      autoSave: true,
    })
  );
  io.on(`connection`, async (socket) => {
    logger.info("Nuevo cliente conectado");

    socket.emit("productsFromServer", await getProductsFromDB());
    socket.emit("messagesFromServer", await getAllMessages());

    socket.on("new-message", async (data) => {
      // let user = socket.handshake.session.userId;
      let user = socket.handshake.session.userName;
      try {
        await chatNewMessage(data.message, user);
      } catch (err) {
        logger.warn(err);
      }

      io.sockets.emit("messagesFromServer", await getAllMessages());
    });

    socket.on("new-product", async (data) => {
      try {
        await createProduct(data);
      } catch (err) {
        logger.warn(err);
      }

      io.socket.emit("productsFromServer", await getProductsFromDB());
    });
  });
}

module.exports = { sockets };
