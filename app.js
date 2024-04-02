const prompt = require('prompt-sync')();

// Constants
const NUM_DAYS = 30;
const DAILY_EARNINGS = 100;
const END_GOAL = 20000;

// Game data
let totalMoneyEarned = 0;
let upgradeLevel = 0;

// Introduction and Challenge prompt
console.log(`Welcome to Snow Removal 2000!`);

const promptResponse = prompt(`What is your name? `);
const username = promptResponse.trim();

console.log(`Your name is ${username}`);
console.log(`You are starting but you currently only have a shovel. Your goal is to get a truck but it costs $${END_GOAL}.`);

const acceptChallenge = prompt(`Do you accept this challenge? (yes/no) `).toLowerCase();
if (acceptChallenge !== 'yes') {
    console.log(`Have a nice day then.`);
    process.exit(); // Exit the program if the user declines the challenge
}

// Functions
function earnMoney(baseEarnings, upgradeLevel) {
    return baseEarnings * (upgradeLevel + 1); // Increasing earnings with each upgrade
}

// Gameplay Loop
for (let day = 1; day <= NUM_DAYS; day++) {
    console.log(`Day ${day}`);
    const earnings = earnMoney(DAILY_EARNINGS, upgradeLevel);
    totalMoneyEarned += earnings;
    console.log(`You earned $${earnings} today. Total earnings: $${totalMoneyEarned}`);
    // Display other game information and implement upgrade logic here
}
