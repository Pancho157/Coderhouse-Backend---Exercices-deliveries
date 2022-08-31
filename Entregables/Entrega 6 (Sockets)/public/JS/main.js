const socket = io.connect();

const input = document.querySelectorAll("input");

input.addEventListener("input", () => {
  socket.emit("messageToServer", input.value);
});

socket.on("messageFromServer", (messages) => {
  document.querySelectorAll("p").innerText = mensajes;
});
