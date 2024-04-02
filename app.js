const prompt = require('prompt-sync')();
const username = prompt('What is your name? ');
console.log(`Your name is ${username}`);
console.clear

console.log(`Welcome to Snow Removal 2000, ${username}`);
console.log(`You are starting but you currently only have a shovel. Your goal is to get at least 2 trucks by next winter.`);

const promptResponse = prompt(`Do you accept this challenge? `).toLowerCase();
if (promptResponse === `yes`) {
    console.log (`Great! We will see you tomorrow!`);

} else if (promptResponse === 'no') {
    console.log (`Have a nice day then.`);
}
// console.clear();
