const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const {
  getChatMessages,
  newChatMessage,
} = require("../../5-Persistence/repository/chat-repository");

async function getAllMessages() {
  try {
    const messages = await getAllMessages();
    return messages;
  } catch (err) {
    logger.error(err);
    throw {
      error: "Se ha producido un error al traer los mensajes",
      errorCode: 500,
    };
  }
}

async function chatNewMessage(message, user) {
  if (!message || !user) {
    throw {
      error: "Ingrese todos los datos requeridos (mensaje / usuario)",
      errorCode: 400,
    };
  }

  try {
    const response = await newChatMessage(message, user);
    return response;
  } catch (err) {
    logger.error(err);
    throw {
      error: "Se ha producido un error al guardar el mensaje",
      errorCode: 500,
    };
  }
}

module.exports = { getAllMessages, chatNewMessage };
