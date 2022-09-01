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

// -------------------- Mensajes del chat ---------------------
const addMessage = (e) => {
  let date = new Date().toLocaleDateString() + " " + new Date().toTimeString();
  let dateTime = date.split(" ");

  const message = {
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    date: dateTime[0] + " " + fyh[1],
  };

  socket.emit("new-message", message);

  // Limpia el input para el mensaje, dejando el correo
  document.getElementById("message").value = " ";
  return false;
};

const renderMessages = (data) => {
  const html = data.messages
    .map((elem, index) => {
      return `<div>
                <strong class="text-primary">${elem.author}</strong>:
                <span class="text-danger">[${elem.date}]<span>
                <em class="text-success">${elem.text}</em>
              </div>`;
    })
    .join(" ");

  document.getElementById("chat__messagesContainer").innerHTML = html;
  const productsHTML = data.products
    .map((product) => {
      return `
      <tr class='table__tr'>
        <td class='table__td'>${product.id}</td>
        <td class='table__td'>${product.title}</td>
        <td class='table__td'>AR${product.price}</td>
        <td class='table__td'><img src="${product.thumbnail}" /></td>
      </tr>`;
    })
    .join(" ");

  document.getElementById("table__body").innerHTML = productsHTML;
};

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
