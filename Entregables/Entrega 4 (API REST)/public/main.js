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
          title: title,
          price: price,
          thumbnail: thumbnail,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      // Deja la data en el formulario si hay un error
      form.reset();
    } catch (err) {
      return new Error(err);
    }
  });
};
