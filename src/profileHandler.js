const { updateUser } = require("./data/users");

const profileHandler = socket => {
  socket.on("updateUser", user => {
    updateUser(user);
  });
};

module.exports = profileHandler;
