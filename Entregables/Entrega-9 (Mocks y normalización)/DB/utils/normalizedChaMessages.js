const normalizr = require("normalizr");
const util = require("util");
const { chatDao } = require("../DAOs/DAOselector");

const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

// ------------------- Schemas -------------------
const message = new schema.Entity("messages");

const author = new schema.Entity("authors");

const chatMessage = new schema.Entity("chatMessage", {
  author: author,
  message: message,
});

const chat = new schema.Entity("chat", {
  messages: [chatMessage],
});

// ------------------- Normal data -------------------
async function getChatMessages() {
  const data = await chatDao.getChatMessages();
  return data;
}

// ------------------- Normalized object -------------------
const normalizedData = normalize(getChatMessages(), chat);

module.exports = { normalizedData };
