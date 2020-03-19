const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const loginHandler = require("./loginHandler");
const mapHandler = require("./mapHandler");
const chatHandler = require("./chatHandler");
const profileHandler = require("./profileHandler");

io.on("connection", socket => {
  loginHandler(socket);
  mapHandler(socket);
  chatHandler(socket);
  profileHandler(socket);
});

app.use(router);
app.use(cors);

app.post("/upload", (req, res) => {
  console.log(req.files);
});

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
