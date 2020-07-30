// Official Solution
// "use strict";
// const http = require("http");
// const bl = require("bl");

// http.get(process.argv[2], function (response) {
//   response.pipe(
//     bl(function (err, data) {
//       if (err) {
//         return console.error(err);
//       }
//       data = data.toString();
//       console.log(data.length);
//       console.log(data);
//     })
//   );
// });

const http = require("http");

function callback(response) {
  let characters = "";
  response.setEncoding("utf8");
  response.on("data", function (data) {
    characters = characters + data;
  });
  response.on("error", function (error) {});
  response.on("end", function () {
    console.log(characters.length);
    console.log(characters);
  });
}

http.get(process.argv[2], callback);
