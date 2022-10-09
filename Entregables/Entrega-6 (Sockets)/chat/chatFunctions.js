const fs = require("fs");

const getChatMessages = async () => {
  try {
    const data = await fs.promises.readFile(
      "./chat/chatMessages.txt",
      "utf-8",
      (err, data) => {
        if (err) throw err;
        return data;
      }
    );
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al leer el chat: ${error}`);
  }
};

const addMessage = async (mensaje) => {
  try {
    const chat = await getChatMessages();
    chat.push(mensaje);
    await fs.promises.writeFile(
      "./chat/chatMessages.txt",
      JSON.stringify(chat, null, 2),
      (err) => {
        if (err) throw err;
      }
    );
  } catch (error) {
    console.error(`Error al agregar el mensaje: ${error}`);
  }
};

module.exports = { getChatMessages, addMessage };
