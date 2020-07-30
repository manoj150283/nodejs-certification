Understanding Promises in Node.js
A Node.js Promise is a placeholder for a value that will be available in the future, allowing us to handle the result of an asynchronous task once it has completed or encountered an error. Promises make writing asynchronous code easier. They’re an improvement on the callback pattern and very popular in Node.js. Introduced as a standard part of JavaScript with ES6, Promises are used in ES8 async functions as building blocks.

Promises are used for control flow, and to handle errors when executing asynchronous code. Knowing how to work with Promises is an important part of modern JavaScript.

In this tutorial we'll:

Start to understand what Promises are in Node.js
Learn how to create and work with Promises, and why they’re used in standard modern Web APIs
By the end of this tutorial you should be able explain what a Promise is, and when you might want to use them in your code.

Goal
Understand what Promises are, and the use case for Promises in Node.js code.

Prerequisites
Some familiarity with asynchronous JavaScript. See Introducing asynchronous JavaScript (developer.mozilla.org)
Watch

Overview
To understand Promises, it helps to first understand the difference between synchronous and asynchronous code. Synchronous code executes in the sequence it is written; statements wait until the ones before them have finished running before they get to run. Synchronous code is considered blocking because long running tasks block the execution of any other code until the synchronous operation has completed. Blocking can be useful in some situations (like reading important configuration data on startup before letting anything else run), but will make your application unresponsive if used for long running tasks like making HTTP calls or reading files from disk.

Asynchronous code works by starting a long running task, and letting it complete in the background while other code is still able to execute. Once the long running task has completed, the handler function (called a callback) is immediately executed with the result from the task. Asynchronous code is considered non-blocking because it does not prevent the rest of your code from executing while the asynchronous task occurs in the background.

With asynchronous code, we don't always know when, or if, the task will complete. The callback is called either when the result is available, or when an error has been encountered.

Promises were introduced in JavaScript in order to help us work with asynchronous code. A Promise is a placeholder for a value that will be available in the future, allowing us to handle the result of an asynchronous task once it has completed or encountered an error.

For example, imagine the following scenario and pseudo-code.

You go out to eat at a restaurant, and the host gives you a buzzer while you wait for your table. You wait and listen for the buzz. While waiting, you're free to do as you please. Once you hear the buzz, you go back to the host and they escort you to your table.

const buzzer = promise();
fetchTableAsync(host => {
  const table = host.prepareTable();
  host.informServer();
  buzzer.resolve(table);
});

buzzer.then(table => me.sitAtTable(table));
The buzzer is a Promise. It will buzz when the Promise resolves -- when your table is ready. Your reaction to the buzz is the handler.

Once you have started an async process, like an HTTP request, filesystem access, or requesting a table, you are given something that will notify the caller when that process has completed. A Promise is that "something".

Why use Promises?
Much like callbacks, Promises allow us to handle the results of asynchronous code. Unlike callbacks, Promises allow us to write code that is easier to read, maintain, and reason about. Promises look a lot more like synchronous code than nesting callbacks.

Consider a scenario where we want to make 5 consecutive API calls, and want to handle any errors that we encounter. With callbacks, we get an ugly nested mess, and are prone to duplicating code. When using Promises the code is more legible.

// Using Promises
fetch("url")
  .then(() => fetch("url"))
  .then(() => fetch("url"))
  .then(() => fetch("url"))
  .then(() => fetch("url"))
  .then(() => console.log("all done"))
  .catch(err => console.log(err));

// Using callbacks.
fetchCallback("url", err => {
  if (err) return console.log(err);
  fetchCallback("url", err => {
    if (err) return console.log(err);
    fetchCallback("url", err => {
      if (err) return console.log(err);
      fetchCallback("url", err => {
        if (err) return console.log(err);
        console.log("all done");
      });
    });
  });
});
Working with Promises
We can interact with a Promise’s result by chaining together handlers that will either wait for the Promise to be fulfilled with a value, or rejected with the first error thrown within the Promise.

Example:

fetch("url")
  .then(response => console.log(response.status))
  .catch(error => console.log(error));
In this code fetch returns a Promise, and the Promise API allows us to chain the then and catch handlers onto the Promise returned by the function call.

This example makes an HTTP request with fetch, and then waits for a response. Once the response is received from the promise we can act on it. In the event an error occurs either during the HTTP request, or in the handling of the returned data, it will be caught by the catch method which can then process the error.

It's best practice to always catch errors when working with Promises. Your Promise chain should include a catch handler to deal with any Promises that are rejected in the chain. The catch handler is your chance to handle errors that occur in the Promise chain. In future versions of Node.js, unhandled Promise rejections will crash your application with a fatal exception.

A Promise has three states: pending, fulfilled, and rejected. When a Promise is first created, it is considered pending. If a Promise is never explicitly fulfilled or rejected, it will remain pending indefinitely.

state	definition
pending	initial state, neither fulfilled nor rejected.
fulfilled	the operation completed successfully.
rejected	the operation failed.
A Promise exposes then and catch handler methods. We can chain handlers to the Promise, which will run once the Promise has been fulfilled or rejected.

When the Promise has successfully completed, it will be fulfilled, and the resolved value will be passed to the next then handler in the chain.

If something goes wrong with the Promise, or an error is thrown, it will be rejected, and the reason will be passed to the catch handler.

Both then and catch handlers follow a similar format. You pass a function as a handler which will be executed when the Promise either rejects or fulfills. The following three ways to register a handler for a then are equivalent.

// 1
promise.then(value => console.log(value));
// 2
promise.then(value => {
  return console.log(value);
});
// 3
promise.then(handler);

function handler(value) {
  return console.log(value);
}
Creating a Promise
We can create a new Promise by initializing one with the Promise constructor:

Example:

const myPromise = new Promise((resolve, reject) => {
  // do something asynchronous
});
The Promise constructor takes two functions as arguments, resolve and reject. We will do our asynchronous task, and then call either resolve with the result if successful, or reject with the error if something goes wrong.

A Promise object is returned by the constructor, and we can chain then and catch methods on it like shown above.

Example:

const fs = require("fs");

const myPromise = new Promise((resolve, reject) => {
  fs.readFile("example.json", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

myPromise.then(data => console.log(data)).catch(err => console.log(err));
Above, we wrapped fs.readFile in a Promise. If reading the file encountered an error, we pass it to reject, otherwise we pass the data obtained from the file to resolve.

Calling resolve passes the data to our .then handler, and reject passes the error to the .catch handler.

Chaining Promises
Here’s an example of an API call using fetch (which returns a Promise), and transforming the response with chaining:

Example:

fetch("http://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
In this example we fetch some JSON data via an HTTP request. The fetch function returns a Promise, and will either resolve or reject the Promise internally. We attach a then handler to the Promise returned by fetch to handle the response once the Promise resolves.

The response body from fetch has a json method for parsing the response body from JSON format into a JavaScript object. The json method returns a Promise of its own, which resolves with the parsed value of the response body. In the first then handler we are returning the new Promise created by calling the json method on the response.

Because we returned a new Promise from our then handler, the next then handler will receive the resolved value of that Promise, which will be the parsed response body.

We can pass values down a Promise chain by returning a value from within .then handlers. This makes Promises great for transforming data, and chaining tasks or Promises to run one after another. If no value is returned from a Promise then undefined is implicitly returned, and will be passed to the next .then.

Another example:

fetch("http://jsonplaceholder.typicode.com/users/1")
  .then(res1 => res1.json())
  .then(data1 => fetch("http://jsonplaceholder.typicode.com/users/2"))
  .then(res2 => res2.json())
  .then(data2 => console.log(data2))
  .catch(err => console.log(err));
When we return a value from a .then, we can chain another .then onto it and accept the return value of the previous handler. You can even return a new Promise, which will be called once the other Promises higher in the chain have resolved.

Combining multiple Promises like this is one of the big advantages of Promises over using callbacks. It is difficult to orchestrate multiple callbacks together, whereas with Promises it is much more straightforward, and error handling is standardized between the different Promises. You can nest multiple asynchronous callbacks together to make them run in sequence like we have done with Promises above, but it takes more code and is much harder to maintain.

The API exposed by Promises for attaching handlers, returning values, and handling errors improves the experience of writing, reading, and maintaining complicated asynchronous code.

Recap
In this tutorial we learned that Promises function the same as callbacks, but offer a cleaner, more consistent API for dealing with asynchronous code. Promises help deal with the execution flow of asynchronous code by letting us chain handlers together and catch errors. They are often times cleaner and more maintainable than just using callbacks. A Promise says we will deal with something when it is ready.

A Promise can have one of three different states: pending, fulfilled, or rejected. We can chain then and catch methods to a Promise in order to execute code when the state changes from pending to either fulfilled or rejected.

Promises can be used to execute synchronous operations without blocking the Node.js process.

Further your understanding
What are the different states that a Promise can be in? What does each one mean?
Can you think of some examples of asynchronous operations that you might perform in your code?
Can you write some code that wraps a call to setTimeout in a Promise and then calls console.log("I Promised!") after a 10 second delay?


Reference: https://heynode.com/tutorial/what-are-promises