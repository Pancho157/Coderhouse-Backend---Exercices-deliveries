const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

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
    console.log(response)
    // Deja la data en el formulario si hay un error
    form.reset();
  } catch (err) {
    return new Error(err);
  }
});
