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
