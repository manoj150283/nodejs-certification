// Official Solution
// "use strict";

// let result = 0;

// for (let i = 2; i < process.argv.length; i++) {
//   result += Number(process.argv[i]);
// }

// console.log(result);

const inputs = process.argv;
let total = 0;
if (inputs && inputs.length > 2) {
  for (let i = 2; i < inputs.length; i++) {
    total = total + Number(inputs[i]);
  }
}
console.log(total);
