// Funciones necesarias para los mensajes:

// insertMessage(data)
// getMessages()

const { promises: fs } = require("fs");

class ChatControllerFS {
  constructor(route) {
    this.route = route;
  }

  async insertNewMessage(data) {
    // Obtiene los datos del archivo
    let messages = [];
    try {
      messages = await this.getMessages();
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }

    // Genera el id
    let newId;
    if (messages.length == 0) {
      newId = 1;
    } else {
      const lastId = messages[messages.length - 1].id;
      newId = lastId + 1;
    }

    // Estructura del mensaje
    const messageData = {
      author: {
        id: data.author.email,
        name: data.author.name,
        lastName: data.author.lastName,
        age: data.author.age,
        alias: data.author.alias,
        avatar: data.author.avatar,
      },
      message: data.message,
      date: new Date(),
    };

    // Agrega el nuevo objeto al array
    messages.push(messageData);

    try {
      await fs.writeFile(this.route, JSON.stringify(messages));
      return `${newId}`;
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }
  }

  async getMessages() {
    try {
      const objetos = await fs.readFile(this.route, "utf-8");
      return JSON.parse(objetos);
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }
  }

  async insertMessage(data) {
    await this.insertNewMessage(data);
  }
}

module.exports = { ChatControllerFS };
