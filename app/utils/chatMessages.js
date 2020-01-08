const createChatMessage = (newMessage, username, channelId) => ({
  action: 'CHAT_MESSAGE',
  id: new Date().getTime(),
  timestamp: new Date().getTime(),
  message: newMessage,
  sender: username,
  channelId,
});

export default {
  createChatMessage,
};
