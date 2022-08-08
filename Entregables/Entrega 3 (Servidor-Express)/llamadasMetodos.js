const { Contenedor } = require("./Contenedor");

const productos = new Contenedor("./productos.txt");

llamados = async () => {
  await productos.save({
    title: "Redragon Horus K621 TKL",
    price: "$13.500",
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_767326-MLA50976497312_082022-O.webp",
  });

  await productos.save({
    title: "Redragon Lamia 2 RGB Blanco",
    price: "$7.800",
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_767326-MLA50976497312_082022-O.webp",
  });

  console.log(await productos.getAll());

  console.log("");
  console.log("");

  await productos.getById(1);
  // await productos.deleteById(2);

  console.log("");
  console.log("");

  await productos.getById(2);

  console.log("");
  console.log("");

  console.log(await productos.getAll());

  console.log("");
  console.log("");

  // await productos.deleteAll();
};

llamados();
