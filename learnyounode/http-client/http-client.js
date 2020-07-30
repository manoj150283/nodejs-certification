// Official Solution
// "use strict";
// const http = require("http");

// http
//   .get(process.argv[2], function (response) {
//     response.setEncoding("utf8");
//     response.on("data", console.log);
//     response.on("error", console.error);
//   })
//   .on("error", console.error);

const http = require("http");

function callback(response) {
  response.setEncoding("utf8");
  response.on("data", function (data) {
    console.log(data);
  });
  response.on("error", function (err) {
    console.log("error occurred");
  });
  // response.on("end", function () {
  //   console.log("");
  // });
}

http.get(process.argv[2], callback);
