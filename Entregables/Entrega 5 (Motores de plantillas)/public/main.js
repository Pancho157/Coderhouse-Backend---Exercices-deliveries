const guardarProducto = async () => {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const urlImagen = document.getElementById("urlImagen").value;

  try {
    const data = { nombre, precio, urlImagen };
    const response = await fetch("/api/productos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    let err = new Error(error);
    return err;
  }
};
