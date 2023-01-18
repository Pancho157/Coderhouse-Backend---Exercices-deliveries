// -------------------- Conexión Sockets ---------------------
const socket = io.connect();
const tableBody = document.getElementById("table__body");
const messagesContainer = document.getElementById("messagesContainer");

// -------------------- Renderizar mensajes y productos ---------------------
const addMessage = (e) => {
  const message = {
    message: document.getElementById("message").value,
  };

  socket.emit("new-message", message);

  // Limpia el input para el mensaje, dejando el correo
  document.getElementById("message").value = " ";
  return false;
};

const renderMessages = (messages) => {
  const messagesHTML = messages
    .map((message) => {
      return `
        <div>
          <span class="message__email">${message.author}</span>:
          <span class="message__date">[${message.date}]<span>
          <br>
          <p class="message__text">${message.message}</p>
        </div>
        `;
    })
    .join(" ");
  document.getElementById("chat__messagesContainer").innerHTML = messagesHTML;
};

const renderProducts = (products) => {
  document.getElementById("table__body").innerHTML = "";
  // Renderiza los productos en la tabla
  products.forEach((product) => {
    document.getElementById("table__body").innerHTML += `
          <tr class='table__tr'>
            <td class='table__td'>${product._id}</td>
            <td class='table__td table__name'>${product.title}</td>
            <td class='table__td'>AR$ ${product.price}</td>
            <td class='table__td'><img src="${product.thumbnail}" /></td>
            <td class='table__td'><button class="productsAddItem" onclick="addProductToCart(${product._id})">Agregar al carrito</button></td>
          </tr>`;
  });
};

// Recibe los productos del servidor
socket.on("messagesFromServer", (messages) => {
  renderMessages(messages);
});

socket.on("productsFromServer", (products) => {
  renderProducts(products);
});
