const {
  getMessagePartners,
  getMessagePartner
} = require("./data/messagePartners");
const { getUser } = require("./data/users");
const { getMessages, addMessage } = require("./data/messages");

const chatHandler = socket => {
  socket.on("getMessagePartners", ({ id }, callback) => {
    partnerIDs = getMessagePartners({ sender: id });
    const res = partnerIDs.map(partner => {
      return ({ id, username, image } = getUser({ id: partner.id }));
    });
    callback(res);
  });

  socket.on("getMessages", ({ sender, receiver }, callback) => {
    callback(getMessages(sender, receiver));
  });

  socket.on("addMessage", (msg, callback) => {
    const id = addMessage(msg);
    const mp = getMessagePartner(msg);
    mp.userActive1 = true;
    mp.userActive2 = true;
    socket.broadcast.emit("newMessagesAvailable", { msg });
    callback(id);
  });
};

module.exports = chatHandler;
