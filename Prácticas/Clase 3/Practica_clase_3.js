// Primer ejercicio de práctica

const ejecutar = (unaFuncion, params) => unaFuncion(params);
const saludar = (nombre) => console.log(`saludos, ${nombre}`);

ejecutar(saludar, "terricola");

//  ---------------------------
// Segundo ejercicio de práctica

const operación = (func, ele1, ele2) => func(ele1, ele2);

const suma = (ele1, ele2) => ele1 + ele2;
const resta = (ele1, ele2) => ele1 - ele2;
const multiplicación = (ele1, ele2) => ele1 * ele2;
const división = (ele1, ele2) => ele1 / ele2;
const módulo = (ele1, ele2) => ele1 % ele2;

let resultado = operación(suma, 1, 3);
console.log(resultado);

// -------------------------
// Tercer ejercicio de práctica

function dividir(dividendo, divisor) {
  return new Promise((resolve, reject) => {
    // SI O SI el resolve va primero en la declaración de la promesa
    if (divisor == 0) {
      reject("No es posible dividir por 0");
    } else {
      resolve(dividendo / divisor);
    }
  });
}

dividir(10, 0)
  .then((resultado) => {
    console.log(`resultado: ${resultado}`);
  })
  .catch((error) => {
    console.log(`error: ${error}`);
  });
