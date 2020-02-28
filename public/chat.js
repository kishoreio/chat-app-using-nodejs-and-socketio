var port = location.href;
var socket = io.connect(port);

var message = document.getElementById("message");
var user = document.getElementById("user");
var btn = document.getElementById("btn");
var output = document.getElementById("output");
var typing = document.getElementById("typing");

//Emit Event
btn.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    user: user.value
  });
  message.value = "";
});

message.addEventListener("keypress", function() {
  socket.emit("typing", user.value);
});

//Listen Emit
socket.on("chat", function(data) {
  typing.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.user + "</strong>: " + data.message + "</p>";
});

socket.on("typing", function(data) {
  typing.innerHTML = "<p><em>" + data + " is typing</em></p>";
});
