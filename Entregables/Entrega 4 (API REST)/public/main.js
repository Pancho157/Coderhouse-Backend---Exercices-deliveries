const postProduct = async () => {
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const thumbnail = document.getElementById("thumbnail");

  const data = { title, price, thumbnail };

  try {
    const request = await fetch("/api/productos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await request.json();

    // Deja la data en el formulario si hay un error
    document.getElementById("form").reset();

    return result;
  } catch (err) {
    return new Error(err);
  }
};
