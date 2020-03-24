let users = [
  {
    id: 1,
    username: "Luis",
    password: "1234",
    imageURL: "",
    description: "Test",
    location: { lat: 48.873611896, lng: 8.5862433 }
  },
  {
    id: 2,
    username: "User2",
    password: "123",
    imageURL: "",
    description: "Test ",
    location: { lat: 48.873611896, lng: 8.5870133 }
  },
  {
    id: 3,
    username: "Silas",
    password: "123",
    imageURL: "",
    description: "Ich heiße Silas und würde für 10€ die Stunde Rasen mähen.",
    location: { lat: 48.872611899999995, lng: 8.5862433 }
  }
];

const addUser = ({ username, password }) => {
  if (users.find(user => user.username === username)) {
    callback({ error: "Username already exists" });
  }
  const user = {
    username,
    password,
    imageURL: "",
    description: "",
    location: { lat: 0, lng: 0 }
  };
  user.id = users.length + 1;
  users.push(user);
};

const updateUser = ({ id, username, password, description, location }) => {
  const user = users.find(user => user.id === id);
  if (!user) return;
  user.username = username;
  user.password = password;
  user.description = description;
  user.location = location;
};

const updateImage = ({ id, imageURL }) => {
  const user = users.find(user => user.id === id);
  if (!user) return;
  if (user.imageURL && user.imageURL != imageURL) {
    require("fs").unlink(user.imageURL, err => {
      if (err) console.log(err);
    });
  }

  user.imageURL = imageURL;
};

const getUser = ({ id, username }) => {
  if (id >= 0) {
    const user = users.find(user => user.id === id);
    return user;
  } else if (username) {
    return users.find(user => user.username === username);
  }
};

const getOtherUsers = ({ id }) => {
  return users.filter(user => user.id !== id && user.location.lat);
};

module.exports = { addUser, updateUser, updateImage, getUser, getOtherUsers };
