const postProduct = async () => {
  const form = document.getElementById("form");
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const thumbnail = document.getElementById("thumbnail");

  // TODO: Reparar el fetch para el POST
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const request = await fetch("/api/productos", {
        method: "POST",
        body: JSON.stringify({
          productTitle: title,
          productPrice: price,
          productThumbnail: thumbnail,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await request.json();

      // Deja la data en el formulario si hay un error
      form.reset();

      return result;
    } catch (err) {
      return new Error(err);
    }
  });
};
