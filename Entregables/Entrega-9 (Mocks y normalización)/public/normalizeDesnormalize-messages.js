const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

// ------------------- Schemas -------------------
const author = new schema.Entity("authors", {}, { idAttribute: "id" });
const message = new schema.Entity("messages", { autor: author });

const authorMessages = new schema.Entity(
  "authorMessages",
  {
    autor: author,
    text: [message],
  },
  { idAttribute: "id" }
);

const chat = new schema.Array(authorMessages);

// ------------------- Normalize data -------------------
function normalizeMessages(messages) {
  console.log(`normalizeMessages (before): ${messages}`);
  let normalizedData = normalize(messages, chat);
  console.log(`normalizeMessages (after): ${normalizeMessages}`);
  return normalizedData;
}

function desnormalizeChatMessages(data) {
  console.log(`desnormalizeChatMessages (before): ${data}`);
  let desnormalizedData = denormalize(data.result, chat, data.entities);
  console.log(`desnormalizeChatMessages (before): ${desnormalizedData}`);
  return desnormalizedData;
}
