const http = require("http");
const server = http.createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

io.on("connection", async (socket) => {
  const ids = io.of("/").adapter.sids;
  socket.broadcast.emit("updateYourList", [...ids.keys()]);
  socket.emit("onconnected", [...ids.keys()]);
  socket.on("clientBroadCast", (msg) => {
    socket.broadcast.emit("serverBroadCast", msg);
  });
  socket.on("msgToSpecific", (object) => {
    socket.to(object.reciver_id).emit("msgfromSpecific", object.msg);
  });

  socket.on("joinGroup", (group) => {
    socket.join(group);
  });

  socket.on("messageToGroup", (object) => {
    socket.to(object.group).emit("messageFromServer", object.msg);
  });
});

server.listen(3005, () => {
  console.log("server listen on port 3005");
});
