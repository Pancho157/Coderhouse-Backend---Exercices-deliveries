// Funciones necesarias para los mensajes:

// insertMessage(data)
// getMessages()

const mongoose = require("mongoose");
const { Message } = require("../../utils/Mongoose-Schemas_Models");

class ChatControllerMongo {
  constructor() {}

  async insertMessage(data) {
    try {
      await Message.create({
        message: data.message,
        author: [
          new mongoose.Schema({
            _id: `${data.author.email}`,
            name: `${data.author.name}`,
            lastName: `${data.author.lastName}`,
            age: data.author.age,
            alias: `${data.author.alias}`,
            avatar: `${data.author.avatar}`,
          }),
        ],
      });
    } catch (err) {
      console.log(err.message);
    }
    // El ID del autor es su email
  }

  async getMessages() {
    try {
      const allMessages = await Message.find();
      return allMessages;
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = { ChatControllerMongo };
