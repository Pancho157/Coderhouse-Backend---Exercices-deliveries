// Funciones necesarias para los mensajes:

// insertMessage(data)
// getMessages()

const { db } = require("../../utils/firebaseConnection");
const { FieldValue } = require("firebase-admin/firestore");

class ChatControllerFirebase {
  constructor() {
    this.coleccion = db.collection("Messages");
  }

  async insertMessage(data) {
    let allMessages;
    let newId;

    // -------- Genera el id del nuevo mensaje -------
    try {
      allMessages = await this.coleccion.get();
      newId = allMessages.size + 1;
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }

    // -------- Estructura del mensaje a guardar -------
    var docData = {
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

    // -------- Guarda el mensaje -------
    try {
      await this.coleccion.doc(`${newId}`).set(docData);
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
      const query = await this.coleccion.get();
      const messages = query.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      }));

      return messages;
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }
  }
}

module.exports = { ChatControllerFirebase };
