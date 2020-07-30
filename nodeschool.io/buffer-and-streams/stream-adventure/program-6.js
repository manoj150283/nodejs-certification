const through = require("through2");
const split = require("split");

const stream = through(write, end);

let counter = 1;
function write(buffer, _, next) {
  const strData = buffer.toString();
  this.push(buffer.toString());
//   const objLines = strData.split(",");
//   objLines &&
//     objLines.forEach((line, index) => {
//       this.push(line.toString());
//       // console.info("index", index);
//       //   if ((index + 1) % 2 === 0) this.push(line.toUpperCase());
//       //   else this.push(line.toString());
//     });

  //   console.log("line Number", counter);
  //   counter++;
  //   console.info("buffer", buffer.toString());
  //   console.info("counter", counter);
  //   if (counter % 2 === 0) this.push(buffer.toString().toUpperCase());
  //   else this.push(buffer.toString());
  //   counter = counter++;
  next();
}

function end(done) {
  done();
}

process.stdin.pipe(split()).pipe(stream).pipe(process.stdout);
