// Official Solution
// "use strict";
// const fs = require("fs");
// const path = require("path");

// module.exports = function (dir, filterStr, callback) {
//   fs.readdir(dir, function (err, list) {
//     if (err) {
//       return callback(err);
//     }

//     list = list.filter(function (file) {
//       return path.extname(file) === "." + filterStr;
//     });

//     callback(null, list);
//   });
// };

const fs = require("fs");
const path = require("path");

module.exports = function (dirName, extName, callback) {
  //   if (!dirName) callback("Directory name is not provided", null);
  //   if (!extName) callback("Extension is not provided", null);
  fs.readdir(dirName, function (err, files) {
    if (err) callback(err, null);
    if (files) {
      const fileList = [];
      for (let i = 0; i < files.length; i++) {
        if (path.extname(files[i]) === `.${extName}`) {
          fileList.push(files[i]);
        }
      }
      callback(null, fileList);
    }
  });
};
