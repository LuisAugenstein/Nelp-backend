const { getOtherUsers, getUser } = require("./data/users");
const { addMessagePartner } = require("./data/messagePartners");

const mapHandler = socket => {
  socket.on("getOtherProfiles", ({ id }, callback) => {
    if (!getUser({ id })) return;
    callback(getOtherUsers({ id }));
  });

  socket.on("addMessagePartner", ({ sender, receiver }) => {
    if (!getUser({ id: sender }) || !getUser({ id: receiver })) return;
    addMessagePartner({ sender, receiver });
  });
};

module.exports = mapHandler;
