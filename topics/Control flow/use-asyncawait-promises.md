Use JavaScript's Async/Await with Promises
If promises are like a yield sign, JavaScript’s await function modifier is a stop sign. To write asynchronous code in Node.js in a way that reads like synchronous code, we can use the async/await JavaScript keywords. Sometimes you want a logical flow to wait for something to complete without blocking the Node process, and only then move on to the next line. Async/await are relatively new features, available in Node.js v7.6 and up. The basic idea behind async/await is to write asynchronous code that looks and behaves similarly to synchronous code. Code that will be executed in the order it was written.

In this tutorial you'll learn:

What the JavaScript async/await function modifiers do
How to use async/await with Promises in Node
How to handle errors with async/await
By the end of this tutorial you'll have a better understanding of what the async/await keywords do and how to make use of them to manage the flow of asynchronous code.

Goal
Learn about the use case for, and see examples of how to use, the async and awaitfunction keywords.

Prerequisites
Understanding Promises in Node.js
Watch: Use Async/Await with Promises

What is async/await?
Promises are like a yield sign; await is a stop sign.

Any code that uses Promises can be converted to use async/await. In fact, async and await use Promises in the background to do their thing.

Note: async/await is a relatively new feature, and is available in Node.js v7.6 and up.

The basic idea behind async/await is to write asynchronous code that looks and behaves similarly to synchronous code. The code will be executed in the order it was written, much like synchronous code.

Here's some example code:

const fetch = require('node-fetch')

async function run() {
    // Will wait for promise to resolve before logging to console.
    const status = await fetch('https://jsonplaceholder.typicode.com/comments/1')
        .then(res => res.status)
    console.log(status + ' - Complete!')
}
run()
const fetch = require('node-fetch')

// with promises, 'Complete!' will be logged before the promise resolves
const data = fetch("url")
	.then(res => console.log(res.status))
console.log('Complete!')
With async/await, execution of the code inside the run function is paused without blocking the Node.js process until the fetch Promise chain resolves. And then the next lines will run, logging to the console. Without async/await, if you tried mixing Promises and synchronous code like the above, the two console.log statements might run before the data was available. You would need to nest the synchronous console.log inside the Promise chain to ensure the fetch data was present before using it.

Using async/await allows us to write asynchronous code that behaves and reads similarly to synchronous code, without the performance drawbacks. That's a major win for readability and maintainability, in our opinion.

Async functions will implicitly return a Promise, which resolves with the return value from the function. Using await will pause execution in the async function, until the awaited Promise resolves. Using await doesn’t block the main thread like a synchronous operation would, but pauses execution within the async function where it is used. Once the Promise resolves, execution will begin again where it left off.

await can only be used inside functions marked with the async keyword. This means you can’t use await in the global context, and must enclose it in an async function.

Example:

// This won't work, because await must be called from a function 
// marked with the async keyword.
function syncRun() {
	await fetch('url')
}
Error handling
There are some changes to error handling when using async/await. For one, when an exception is thrown, it will reference the function the error originated from. This is an improvement over Promises, where the context of the call is lost and the stack trace is not as helpful.

Similarly to synchronous code, with async/await, errors are handled by wrapping await calls in a try...catch block, instead of using .catch handlers like you do with Promises.

Using a try...catch block makes sure we catch any thrown errors. Something you'll want to do in most cases.

Example:

// Wrap await calls in try...catch to catch any errors.
async function handleAsync() {
	try {
		const data = await fetch('url').then(res => res.json()
		console.log(data)
	} catch(error) {
		// If the fetch call has any errors, or if the Promise it
		// returns is rejected, an error is thrown and we can process it
		// here.
		console.log('Uh oh!', error)
	}
}

handleAsync()
Because an async function returns a Promise implicitly, we can also attach a catch handler to the async function call itself:

Example:

// Another option: handle the exception outside the async function.
async function catchAsync() {
	const data = await fetch('url').then(res => res.json()
	console.log(data)
}

catchAsync.catch(error => console.log('Uh oh!', error))
This example is functionally equivalent to the previous one, but allows us to delegate handling the error to any function outside the async function. Sometimes the best way to handle an error is to let it bubble up to be handled outside of the context it occurred in, so the error can be handled properly by some other logic.

Recap
Async/Await is the modern standard for asynchronous code in Node. Building off of Promises, we can use the async and await keywords to even further reduce nesting and write asynchronous code that looks and behaves similar to synchronous code.

Further your understanding
What happens if you use await inside of a function that has not been declared async?
Can you think of an example where you might want to write a Promise instead of using async and await?

Reference: https://heynode.com/tutorial/use-asyncawait-promises
