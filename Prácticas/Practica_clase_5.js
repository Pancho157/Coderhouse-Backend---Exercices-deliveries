function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const numbers = {};

for (let i = 0; i < 10; i++) {
  const valor = Math.floor(getRandomNumber(1, 20));
  console.log(valor);

  if (numbers[valor]) {
    numbers[valor]++;
  } else {
    numbers[valor] = 1;
  }
}

console.log(numbers);

// Hacer un algoritmo en el cual se ingrese una fecha de nacimiento e indique cuantos años y días pasadon desde esa fecha

const moment = require("moment");

const hoy = moment();
const fechaNacimiento = moment("19/11/1999", "DD/MM/YYYY");

const difYears = hoy.diff(fechaNacimiento, "years");
const difDays = hoy.diff(fechaNacimiento, "days");

console.log(`Hoy es ${hoy.format}`);
