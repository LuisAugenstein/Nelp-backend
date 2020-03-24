const { updateUser, updateImage } = require("./data/users");
const { provideImage } = require("./router");

const profileHandler = socket => {
  socket.on("updateUser", user => {
    updateUser(user);
  });

  socket.on("updateImage", ({ id, image }, callback) => {
    if (!image || (!id && id != 0)) return;
    let base64Data;
    const random = Math.floor(Math.random() * 10000);
    let imageURL = `src/images/user-${id}-${random}-image.`;
    if (image.substr(0, 20).search("png") >= 1) {
      base64Data = image.replace("data:image/png;base64,", "");
      imageURL += "png";
    } else if (image.substr(0, 20).search("jpeg") >= 1) {
      base64Data = image.replace("data:image/jpeg;base64,", "");
      imageURL += "jpg";
    } else {
      console.log("ERROR: image must be png or jpg");
      return;
    }
    require("fs").writeFile(imageURL, base64Data, "base64", function(err) {
      if (err) console.log(err);
    });
    //update the internal server datastructure
    updateImage({ id, imageURL });
    provideImage({ imageURL });
    callback(imageURL);
  });
};

module.exports = profileHandler;
