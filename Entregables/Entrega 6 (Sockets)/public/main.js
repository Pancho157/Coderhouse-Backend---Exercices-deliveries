// -------------------- Conexión Sockets ---------------------
const socket = io.connect();
const tableBody = document.getElementById("table__body");
const messagesContainer = document.getElementById("messagesContainer");

// -------------------- Renderizar mensajes y productos ---------------------
const addMessage = (e) => {
  let date = new Date().toLocaleDateString() + " " + new Date().toTimeString();
  let dateTime = date.split(" ");

  const message = {
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    date: dateTime[0] + " " + dateTime[1],
  };

  socket.emit("new-message", message);

  // Limpia el input para el mensaje, dejando el correo
  document.getElementById("message").value = " ";
  return false;
};

const renderMessages = (messages) => {
  document.querySelector(".chat__messagesContainer").innerHTML = "";
  if (messages.lenght > 0) {
    messages.forEach((message) => {
      document.querySelector(".chat__messagesContainer").innerHTML += `
        <div>
          <span class="message__email">${message.email}</span>:
          <span class="message__date">[${message.date}]<span>
          <br>
          <p class="message__text">${message.message}</p>
        </div>
        `;
    });
  }
};

const renderProducts = (products) => {
  document.getElementById("table__body").innerHTML = "";
  // Renderiza los productos en la tabla
  products.forEach((product) => {
    document.getElementById("table__body").innerHTML += `
          <tr class='table__tr'>
            <td class='table__td'>${product.id}</td>
            <td class='table__td'>${product.title}</td>
            <td class='table__td'>AR${product.price}</td>
            <td class='table__td'><img src="${product.thumbnail}" /></td>
          </tr>`;
  });
};

// -------------------- Guardar producto (formulario) ---------------------
const addProduct = () => {
  const form = document.getElementById("form").value;
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;

  const product = {
    title: title,
    price: price,
    thumbnail: thumbnail,
  };

  socket.emit("new-product", product);
  form.reset();
  return false;
};

// Recibe los productos del servidor
socket.on("messagesFromServer", (messages) => {
  console.log("mensajes");
  console.log(messages);
  renderMessages(messages);
});

socket.on("productsFromServer", (products) => {
  console.log("productos");
  console.log(products);
  renderProducts(products);
});
