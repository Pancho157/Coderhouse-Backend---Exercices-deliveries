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

// ------------------- Normalize data -------------------
async function normalizeMessages(messages) {
  let normalizedData = normalize(messages, chat);
  console.log(normalizedData);
  return normalizedData;
}

async function desnormalizeChatMessages(messages) {
  let desnormalizedData = denormalize(
    messages.result,
    chat,
    messages.entities
  );
  console.log(desnormalizedData);
  return desnormalizedData;
}
