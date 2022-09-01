const socket = io.connect();
const input = document.getElementById("input");
const messagesContainer = document.getElementById("messagesContainer");

input.addEventListener("input", () => {
  socket.emit("messageToServer", input.value);
});

socket.on("messagesFromServer", (data) => {
  var p = document.createElement("p");
  p.innerText = data
  messagesContainer.appendChild(p);
});
