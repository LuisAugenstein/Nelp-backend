const { getUser, addUser } = require("./data/users");

const loginHandler = socket => {
  //only for Register. check if user is already taken
  socket.on("checkUser", ({ username }, callback) => {
    if (getUser({ username: username })) {
      callback({ res: "Username is already taken" });
    } else {
      callback({ res: "" });
    }
  });

  //click on register button adds a user
  socket.on("addUser", ({ username, password }) => {
    if (getUser({ username })) {
      return;
    }
    addUser({ username, password });
  });

  //click on login button sends logged in user to frontend
  socket.on("getUser", ({ username, id }, callback) => {
    callback(getUser({ username, id }));
  });
};

module.exports = loginHandler;
