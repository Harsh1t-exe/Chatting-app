const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./")));

app.get("/", (req, res) => {
  return res.sendFile("index.html");
});

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", { message, id: socket.id });
  });
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));
