const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

// ------------------- Schemas -------------------
const author = new schema.Entity("authors", {}, { idAttribute: "email" });
const message = new schema.Entity("messages", { autor: author });

const authorMessages = new schema.Entity(
  "authorMessages",
  {
    autor: author,
    text: [message],
  },
  { idAttribute: "id" }
);

const chatSchema = new schema.Array(authorMessages);

// ------------------- Normalize data -------------------
function normalizeMessages(messages) {
  console.log(`normalizeMessages (before): ${messages}`);
  let normalizedData = normalize(messages, chatSchema);
  console.log(`normalizeMessages (after): ${normalizedData}`);
  return normalizedData;
}

function desnormalizeChatMessages(data) {
  console.log(`desnormalizeChatMessages (before): ${data}`);
  let desnormalizedData = denormalize(data.result, chatSchema, data.entities);
  console.log(`desnormalizeChatMessages (after): ${desnormalizedData}`);
  return desnormalizedData;
}
