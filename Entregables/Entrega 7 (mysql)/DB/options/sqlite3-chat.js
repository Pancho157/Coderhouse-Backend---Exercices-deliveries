const knexOptionsChat = {
  client: "sqlite3",
  connection: {
    filename: "src/database/ecommerce.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = knexOptionsChat;
