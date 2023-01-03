const { DAO } = require("../../Persistence/DAOs/DAOselector");

const DAOs = new DAO(process.env.PERS);

async function getChatMessages() {
  try {
    const messages = await DAOs.chat.getMessages();
    return messages;
  } catch (err) {
    throw {
      error: "El producto ingresado ya existe",
      errorCode: 400,
    };
  }
}

async function newChatMessage(message, user) {
  if (!message || !user) {
    throw {
      error: "Ingrese todos los datos requeridos (mensaje / usuario)",
      errorCode: 400,
    };
  }

  const messageinfo = {
    message: message,
    author: user,
    date: new Date(),
  };

  try {
    await DAOs.chat.insertMessage(messageinfo);
    return true;
  } catch (err) {
    throw {
      error: "Hubo un error, recargue la página e intentelo nuevamente",
      errorCode: 500,
    };
  }
}

module.exports = { getChatMessages, newChatMessage };
