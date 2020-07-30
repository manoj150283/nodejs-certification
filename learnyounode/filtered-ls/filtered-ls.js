// Official Solution
// "use strict";
// const fs = require("fs");
// const path = require("path");

// const folder = process.argv[2];
// const ext = "." + process.argv[3];

// fs.readdir(folder, function (err, files) {
//   if (err) return console.error(err);
//   files.forEach(function (file) {
//     if (path.extname(file) === ext) {
//       console.log(file);
//     }
//   });
// });

const fs = require("fs");
const path = require("path");

function callback(err, data) {
  if (err) console.log("");
  if (data) {
    if (process.argv[3]) {
      for (let i = 0; i < data.length; i++) {
        if (path.extname(data[i]) === `.${process.argv[3]}`)
          console.log(data[i]);
      }
    } else console.log("");
  }
}

fs.readdir(process.argv[2], callback);
