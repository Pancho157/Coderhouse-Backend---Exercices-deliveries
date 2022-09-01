// -------------------- Conexión Sockets ---------------------
const socket = io.connect();
const tableBody = document.getElementById("table__body");
const messagesContainer = document.getElementById("messagesContainer");

window.onload = function () {
  socket.emit("productsRequest");
};

socket.on("serverProducts", (data) => {
  var p = document.createElement("p");
  p.innerText = data;
  tableBody.appendChild(p);
});

// input.addEventListener("input", () => {
//   socket.emit("messageToServer", input.value);
// });

socket.on("messagesFromServer", (data) => {
  var p = document.createElement("p");
  p.innerText = data;
  messagesContainer.appendChild(p);
});

// -------------------- Guardar producto (formulario) ---------------------
const guardarProducto = async () => {
  const form = document.getElementById("form").value;
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;

  try {
    const response = await fetch("/api/productos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        price: price,
        thumbnail: thumbnail,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    // Deja la data en el formulario si hay un error
    form.reset();
  } catch (err) {
    return new Error(err);
  }
};
