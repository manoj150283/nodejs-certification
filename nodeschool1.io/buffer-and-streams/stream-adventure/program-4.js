// const { Readable } = require("stream");
// const mySteam = new Readable({});
// mySteam._read = () => {};
// mySteam.push(process.argv[2]);
// mySteam.pipe(process.stdout);

const { Readable } = require("stream");
class readableStream extends Readable {
  constructor(content, options = {}) {
    super(options);
    this.content = content;
  }

  _read(size) {
    if (!this.content) return this.push(null);

    this.push(this.content.slice(0, size));
    this.content = this.content.slice(size);
  }
}

const stream = new readableStream(process.argv[2]);
stream.pipe(process.stdout);
