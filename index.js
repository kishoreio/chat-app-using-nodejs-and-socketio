var express = require("express");
var socket = require("socket.io");
var port = process.env.PORT || 8000;

var app = express();

var serve = app.listen(port, function() {
  console.log("Listening on port ");
});

var io = socket(serve);

//connection for client and server
io.on("connection", function(socket) {
  console.log("connection made");
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});

app.use(express.static("public"));
