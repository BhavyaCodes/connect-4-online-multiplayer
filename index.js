const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const rooms = {};

app.use(express.json());
app.get("/api/rooms", (req, res) => {
  res.json(rooms);
});

app.post("/api/room", (req, res) => {
  rooms[req.body.id] = { 0: req.body };
  io.emit("room-created", rooms);
  res.json();
});

app.get("/api/ping", (req, res, next) => {
  res.json({ ping: "pong" });
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  socket.on("join-room", (roomId, user) => {
    rooms[roomId][2] = user;
    console.log(rooms);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
