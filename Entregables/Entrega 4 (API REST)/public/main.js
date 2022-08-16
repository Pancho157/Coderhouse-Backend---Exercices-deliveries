const postProduct = async () => {
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const thumbnail = document.getElementById("thumbnail");
  document.getElementById("form").reset();

  // TODO: Reparar el fetch para el POST
  try {
    const request = await fetch("/api/productos", {
      method: "POST",
      body: {
        productTitle: title,
        productPrice: price,
        productThumbnail: thumbnail,
      },
    });

    const result = await request.json();

    // Deja la data en el formulario si hay un error

    return result;
  } catch (err) {
    return new Error(err);
  }
};
