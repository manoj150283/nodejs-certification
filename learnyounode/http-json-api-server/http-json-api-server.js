// Official Solution
// 'use strict'
//     const http = require('http')

//     function parsetime (time) {
//       return {
//         hour: time.getHours(),
//         minute: time.getMinutes(),
//         second: time.getSeconds()
//       }
//     }

//     function unixtime (time) {
//       return { unixtime: time.getTime() }
//     }

//     const server = http.createServer(function (req, res) {
//       const parsedUrl = new URL(req.url, 'http://example.com')
//       const time = new Date(parsedUrl.searchParams.get('iso'))
//       let result

//       if (/^\/api\/parsetime/.test(req.url)) {
//         result = parsetime(time)
//       } else if (/^\/api\/unixtime/.test(req.url)) {
//         result = unixtime(time)
//       }

//       if (result) {
//         res.writeHead(200, { 'Content-Type': 'application/json' })
//         res.end(JSON.stringify(result))
//       } else {
//         res.writeHead(404)
//         res.end()
//       }
//     })
//     server.listen(Number(process.argv[2]))

const http = require("http");

const server = http.createServer(function (req, res) {
  console.log(req.url);
  if (req.url) {
    const url = new URL(req.url, `http://localhost:${process.argv[2]}`);
    const iso = url.searchParams.get("iso");
    const newDate = new Date(iso);
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
    const second = newDate.getSeconds();
    res.writeHead(200, { "Content-Type": "application/json" });
    if (url.pathname === "/api/parsetime") {
      res.end(
        JSON.stringify({
          hour: hour,
          minute: minute,
          second: second,
        })
      );
    } else if (url.pathname === "/api/unixtime") {
      res.end(
        JSON.stringify({
          unixtime: newDate.getTime(),
        })
      );
    }
  }
});

server.listen(process.argv[2]);
