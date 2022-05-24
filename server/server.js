const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const Game = require("./models/game");

const port = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

let availableRooms = [];
const games = {};

const emitMenuData = () => {
  io.to("menu").emit("data", {
    room: "menu",
    availableRooms,
  });
};

const emitRoomData = (roomName) => {
  io.to(roomName).emit("data", { room: games[roomName].data() });
};

io.on("connection", (socket) => {
  console.log(`[SOCKET CONNECTED] ${socket.id}`);

  socket.emit("connected");
  socket.join("menu");

  emitMenuData();

  socket.on("new-message", ({ message }) => {
    io.to(socket.data.room).emit("received-message", message);
    // socket.broadcast
    //   .to(socket.data.room)
    //   .emit(
    //     "received-notification",
    //     message.split(":")[0] + " a trimis un mesaj!"
    //   );
  });

  socket.on("create-room", (roomName) => {
    console.log("[CREATED ROOM]" + roomName);

    // indexOf returneaza -1 sau indexul
    if (availableRooms.indexOf(roomName) >= 0) {
      socket.emit("create-room-error", "Name is already used!");
    } else {
      availableRooms.push(roomName);
      socket.leave("menu");
      socket.join(roomName);
      socket.data.room = roomName;

      games[roomName] = new Game(roomName);

      emitRoomData(roomName);
      emitMenuData();
    }
  });

  socket.on("join-room", (roomName) => {
    socket.leave("menu");
    socket.join(roomName);
    socket.data.room = roomName;
    games[roomName].addPlayer();

    availableRooms = availableRooms.filter((room) => room !== roomName);

    emitRoomData(roomName);
    emitMenuData();
  });
});
