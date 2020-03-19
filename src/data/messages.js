let messages = [];

const addMessage = (msg = { sender, receiver, text, date }) => {
  msg.id = messages.length;
  messages.push(msg);
  return msg.id;
};

const removeMessages = (sender, receiver) => {};

const getMessages = (partner1, partner2) => {
  return messages.filter(msg => {
    return (
      (msg.sender === partner1 && msg.receiver === partner2) ||
      (msg.sender === partner2 && msg.receiver === partner1)
    );
  });
};

module.exports = { addMessage, removeMessages, getMessages };
