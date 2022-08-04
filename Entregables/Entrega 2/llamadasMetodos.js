const { Contenedor } = require("./Contenedor");

const productos = new Contenedor("./productos.txt");

productos.deleteAll();

productos.deleteById(3);

productos.getAll();

productos.getById(3);

productos.save({
  title: "Redragon Horus K621 TKL",
  price: "$13.500",
  thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_767326-MLA50976497312_082022-O.webp",
});

// Se probó cada uno de los métodos y todos funcionan
// Es cuestión de ir comentandolos para poder ir probandolos por separado
