function newChatMessageDTO(message, user) {
  return {
    message: message,
    author: user,
    date: new Date(),
  };
}

module.exports = { newChatMessageDTO };
