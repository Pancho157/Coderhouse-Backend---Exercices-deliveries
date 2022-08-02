class Usuario {
  constructor(nombre = "", apellido = "", libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName = () => {
    return `${this.nombre} ${this.apellido}`;
  };

  addMascota = (name = "") => {
    if (name === "")
      return console.log("Debe ingresar el nombre de su mascota");
    this.mascotas.push(name);
  };

  countMascotas = () => {
    return this.mascotas.length;
  };

  addBook(bookAuthor = "", bookTitle = "") {
    if (bookTitle === "")
      return console.log("Es obligatorio ingresar el titulo del libro");
    this.libros.push({ author: bookAuthor, title: bookTitle });
  }

  getBookNames = () => {
    let bookNames = this.libros.map((book) => {
      return book.title;
    });
    return bookNames;
  };
}

const primerUsuario = new Usuario(
  "Juan",
  "Alcachofa",
  [
    { author: "Brent Weeks <3", title: "The Burning White (Lightbringer)" },
    {
      author: "James Frey and Jobie Hughes",
      title: "Pitaccus Lore - 1 (Soy el número 4)",
    },
    { author: "Brent Weeks", title: "The Way of Shadows" },
  ],
  ["Gary"]
);

// Llamados a los métodos
console.log("");
console.log("--- Llamadas a los métodos ---");

console.log("");
console.log("Nombre completo con la función: " + primerUsuario.getFullName());

console.log("");
primerUsuario.addMascota("Catha");
console.log("Mascotas (luego de agregar una): " + primerUsuario.mascotas);

console.log("");
console.log("Cantidad de mascotas: " + primerUsuario.countMascotas());

console.log("");
primerUsuario.addBook("Robert T. Kiyosaki", "Padre Rico - Padre Pobre");
console.log("Agregado el libro: Padre Rico - Padre Pobre");

console.log(primerUsuario.getBookNames());
