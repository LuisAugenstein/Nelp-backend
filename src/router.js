const express = require("express");
const router = express.Router();

//delete all images on server restart
const fs = require("fs");
fs.readdir("./src/images", (err, files) => {
  if (err) console.log(err);
  if (!files) return;
  for (const file of files) {
    fs.unlink("./src/images/" + file, err => {
      if (err) console.log(err);
    });
  }
});

router.get("/", (req, res) => {
  res.send("server is up and running");
});

const provideImage = ({ imageURL }) => {
  router.get("/" + imageURL, (req, res) => {
    res.sendFile(__dirname.replace("src", "") + imageURL);
  });
};

module.exports = { router, provideImage };
