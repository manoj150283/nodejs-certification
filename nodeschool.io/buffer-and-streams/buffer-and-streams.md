Streams and Buffer

## What are streams ?

A stream is am abstract interface for working with streaming data in Node.js

That means you can consume data as is loaded or produced, chunk by chunk (or piece by piece), instead get all in memory.

Streams can be readable, writable or both.

There are four type of streams:

* Readable stream, which data can be read.
* Writable stream, which data can be written
* Duplex stream, which is both readable and writable.
* Transform stream, which is a Duplex stream that can modify or transform the data as it is written and read.

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
\_read() {}
}

Note: This _read method MUST NOT be called by application code directly. It should be called by the internal Readable class methods only.

### Reading modes

Readable streams operate in one of the two modes: flowing and paused

* In flowing mode, data is read from the underlying system automatically and provided as quickly as possible.
* In paused mode, the read() method must be called explicitly to read chunks of data from the stream.

All readable streams begin in paused mode but can be switched to flowing mode, and also can switch back to paused mode.

### Consuming a Readable Stream

* readable.pipe(writable), attaching Writable stream to the readable, cause it to switch automatically into flowing mode and push all of its data to the attached Writable.
* Readable.on('readable', ...), here the stream (readable) is in paused mode and have to use the read(size) method for start comsuming the data.
* readable.on('data', ...), adding the data event handler switch the stream to a flowing mode. We can pause and resume the stream by using pause() and resume() methods respectively. This is useful when you need to do sometime consuming action with the stream's data (such as writing to the database)

### Adding data to stream

You can use the push() method to add content into the readable internal Buffer.

## Transform

A transform stream takes input data and applies an operation to the data to produce the output data.

Convert data from process.stdin to upper case data on process.stdout using the through2 module.

To get the through module, you will need to do:

$ npm install through2

Create a through stream with a write and end function.

const through = require('through2');
const stream = through(write, end)

The write function is called for every buffer of available input.

function write (buffer, encoding, next){
    // ...
}

and end function is called when there is no more data:

function end(){
    // ...
}

Inside the write function, call this.push() to produce output data and call next() when you are ready to receive the next chunk:

function write (buffer, encoding, next){
    this.push('I got some data' + buffer + '\n')
    next()
}

write and end are both optional.

If write is not specified, the default implementation passes the input data to the output unmodified.

If end is not specified, the default implementation call this.push(null) to close the output side when the input side ends.

Make sure to pipe process.stdin into your transform stream and pipe your transform stream into process.stdout, like this:

process.stdin.pipe(stream).pipe(process.stdout);

To convert a buffer to a string, call buffer.toSting().

## Lines

