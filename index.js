const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const rooms = {};

app.use(express.json());
app.use(cors());
app.get("/api/rooms", (req, res) => {
  res.json(rooms);
});

app.get("/api/ping", (req, res, next) => {
  res.json({ ping: "pong" });
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  socket.on("create-room", (user) => {
    rooms[user.id] = { 0: user };
    io.emit("room-created", rooms);
    socket.join(user.id);
  });
  socket.on("join-room", (roomId, user) => {
    rooms[roomId][1] = user;
    io.emit("room-created", rooms);
    socket.join(roomId);
  });
  socket.on("send-turn", (roomId, state) => {
    socket.to(roomId).broadcast.emit("turn", state);
  });
  socket.on("close-room", () => {
    delete rooms[id];
    io.emit("room-created", rooms);
  });
  socket.on("disconnect", () => {
    delete rooms[id];
    io.emit("room-created", rooms);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
