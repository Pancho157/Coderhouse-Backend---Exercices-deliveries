let counter = 0;

for (let i = 2; i < process.argv.length; i++) {
  let actualNumber = Number(process.argv[i]);
  counter += actualNumber;
}

console.log(counter);
