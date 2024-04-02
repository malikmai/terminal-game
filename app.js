const prompt = require('prompt-sync')();
const username = prompt('What is your name? ');
console.log(`Your name is ${username}`);
console.clear();

// Game data
let totalMoneyEarned = 0; // Initial money earned
let dailyEarnings = 100; // What you earn annually
let endGoal = 20000; // The end goal - 1 truck
let upgradedShovelCrewCost = 500; // Cost of upgraded shovel crew
let snowRemoverCost = 2000; // Cost of snow remover
let flamethrowerCost = 5000; // Cost of flamethrower
let upgradeMultiplier = 1.5; // Multiplier for increasing earnings with each upgrade
let upgradeLevel = 0; // Upgrade level

// Introduction and Challenge prompt
console.log(`Welcome to Snow Removal 2000, ${username}`);
console.log(`You are starting but you currently only have a shovel. Your goal is to get a truck but it costs $20,000.`);

const promptResponse = prompt(`Do you accept this challenge? `).toLowerCase();
if (promptResponse === `yes`) {
    console.log(`Great! We will see you tomorrow!`);
} else if (promptResponse === 'no') {
    console.log(`Have a nice day then.`);
    process.exit(); // Move process.exit() here
}

