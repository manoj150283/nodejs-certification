// Official Solution
// "use strict";
// const filterFn = require("./solution_filter.js");
// const dir = process.argv[2];
// const filterStr = process.argv[3];

// filterFn(dir, filterStr, function (err, list) {
//   if (err) {
//     return console.error("There was an error:", err);
//   }

//   list.forEach(function (file) {
//     console.log(file);
//   });
// });

const mymodule = require("./mymodule");

if (process.argv.length == 4)
  mymodule(process.argv[2], process.argv[3], function (err, data) {
    if (err) console.log(err);
    if (data) {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    }
  });
