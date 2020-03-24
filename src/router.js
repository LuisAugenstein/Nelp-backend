const express = require("express");
const router = express.Router();

//delete all images on server restart
const fs = require("fs");
const path = require("path");
fs.readdir(__dirname + "/images/", (err, files) => {
  if (err) console.log(err);
  if (!files) return;
  for (const file of files) {
    fs.unlink(path.join(__dirname + "/images/" + file), err => {
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
