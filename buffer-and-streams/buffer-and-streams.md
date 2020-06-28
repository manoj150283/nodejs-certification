Streams and Buffer

## What are streams ?

A stream is am abstract interface for working with streaming data in Node.js

That means you can consume data as is loaded or produced, chunk by chunk (or piece by piece), instead get all in memory.

Streams can be readable, writable or both.

There are four type of streams:

> > Readable stream, which data can be read.
> > Writable stream, which data can be written
> > Duplex stream, which is both readable and writable.
> > Transform stream, which is a Duplex stream that can modify or transform the data as it is written and read.

Steams are present in many Node.js modules, for example http.request(), zlib.createGzip(), fs.createReadStream(), process.stdout... all of these return streams.

## The pipe method

The pipe method allow you to connect the output of readable stream as the input of writable stream.

readable.pipe(writable)

If you pipe into a duplex stream, you can chain to other stream.

readable.pipe(duplex).pipe(writable)

## Implementing a Readable Stream

To implement a Readable stream, you need to construct an object, or inherit, from stream. Readable class and implement a \_read() method in it.

const { Readable } = require('stream);

const myStream = new Readable({});
mystream.\_read=()=>{}

or

const { Readable } = require('stream);

class myStream extends Readable {
\_read() {

    }
}
