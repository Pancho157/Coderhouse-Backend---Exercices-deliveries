const normalizr = require("normalizr");
const { chatDao } = require("../DAOs/DAOselector");

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
// La normalización trabaja bien!
async function normalizeData(data) {
  console.log(`normalizeData (before): ${data}`);
  let normalizedData = normalize(data, chat);
  console.log(`normalizeData (after): ${normalizedData}`);
  return normalizedData;
}

function desnormalizeData(data) {
  console.log(`desnormalizeData (before): ${data}`);
  let desnormalizedData = denormalize(data.result, chat, data.entities);
  console.log(`desnormalizeData (after): ${desnormalizedData}`);
  return desnormalizedData;
}

module.exports = { normalizeData, desnormalizeData };
