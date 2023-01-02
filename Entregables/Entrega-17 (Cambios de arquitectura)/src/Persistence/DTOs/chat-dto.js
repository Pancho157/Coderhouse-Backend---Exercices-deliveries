function chatMessagesDTO(data) {
  return data;
}

function newChatMessageDTO(data) {
  return {
    message: data.message,
    author: data.user,
    date: new Date(),
  };
}

module.exports = { chatMessagesDTO, newChatMessageDTO };
