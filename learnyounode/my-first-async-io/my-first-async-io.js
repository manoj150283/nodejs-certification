// Official Solution
// "use strict";
// const fs = require("fs");
// const file = process.argv[2];

// fs.readFile(file, function (err, contents) {
//   if (err) {
//     return console.log(err);
//   }
//   // fs.readFile(file, 'utf8', callback) can also be used
//   const lines = contents.toString().split("\n").length - 1;
//   console.log(lines);
// });

const fs = require("fs");
function callback(err, data) {
  if (err) console.log(0);
  if (data) {
    console.log(data.toString().split("\n").length - 1);
  }
}

fs.readFile(process.argv[2], callback);
