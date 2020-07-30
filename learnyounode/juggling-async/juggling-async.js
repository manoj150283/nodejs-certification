// Official Solution
// "use strict";
// const http = require("http");
// const bl = require("bl");
// const results = [];
// let count = 0;

// function printResults() {
//   for (let i = 0; i < 3; i++) {
//     console.log(results[i]);
//   }
// }

// function httpGet(index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(
//       bl(function (err, data) {
//         if (err) {
//           return console.error(err);
//         }

//         results[index] = data.toString();
//         count++;

//         if (count === 3) {
//           printResults();
//         }
//       })
//     );
//   });
// }

// for (let i = 0; i < 3; i++) {
//   httpGet(i);
// }

const http = require("http");

// const firstUrl = process.argv[2];
// const secondUrl = process.argv[3];
// const thirdUrl = process.argv[4];
let x = 0;
const urls = [process.argv[2], process.argv[3], process.argv[4]];

function loopArray(array) {
  getData(array[x], function () {
    x++;
    if (x < array.length) {
      loopArray(array);
    }
  });
}

function getData(url, callback) {
  http.get(url, function (response) {
    let characters = "";
    response.setEncoding("utf8");
    response.on("data", function (data) {
      characters = characters + data;
    });
    response.on("end", function () {
      console.log(characters);
      callback();
    });
  });
}

loopArray(urls);
// const urls = [process.argv[2], process.argv[3], process.argv[4]];

// for (let i = 0; i < urls.length; i++) {
//   http.get(urls[i], callback);
// }

// function callback(response) {
//   response.setEncoding("utf8");
//   let characters = "";
//   response.on("data", function (data) {
//     characters = characters + data;
//   });
//   response.on("end", function () {
//     console.log(characters);
//   });
// }
