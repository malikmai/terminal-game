const prompt = require('prompt-sync')();

// Constants
const NUM_DAYS = 30;
const MIN_DAILY_EARNINGS = 100;
const MAX_DAILY_EARNINGS = 500;
const END_GOAL = 20000;
const UPGRADE_COSTS = {
    'A': 500,
    'B': 1000,
    'C': 5000
};
const UPGRADE_MULTIPLIERS = {
    'A': [1, 1.5, 2.5, 3.0],
    'B': [1, 2.0, 4.0, 5.0],
    'C': [1, 2.5, 6.5, 7.0]
};

// Introduction and Challenge prompt
console.log(`Welcome to Snow Removal 2000!`);

const username = prompt('What is your name? ').trim();
console.clear(); // Clear the console
console.log(`Your name is ${username}`);

console.log(`You are starting but you currently only have a shovel. Your goal is to get a truck but it costs $${END_GOAL}.`);

const acceptChallenge = prompt('Do you accept this challenge? (yes/no) ').toLowerCase();
console.clear(); // Clear the console
if (acceptChallenge !== 'yes') {
    console.log(`Have a nice day then.`);
    process.exit(); // Exit the program if the user declines the challenge
}

// Function to generate random daily earnings based on level
function generateRandomEarnings(level) {
    switch (level) {
        case 1:
            return Math.floor(Math.random() * (MAX_DAILY_EARNINGS - MIN_DAILY_EARNINGS + 1)) + MIN_DAILY_EARNINGS;
        case 2:
            return Math.floor(Math.random() * (750 - 250 + 1)) + 500;
        case 3:
            return Math.floor(Math.random() * (1200 - 800 + 1)) + 2000;
        case 4:
            return Math.floor(Math.random() * (2000 - 1200 + 1)) + 5000;
        default:
            return 0;
    }
}

// Function to handle mission
function handleMission(day, upgradeLevels, currentMoney) {
    console.log(`Day ${day}`);
    console.log("Do you want to shovel houses today?");
    console.log("A. Yes");
    console.log("B. No");
    console.log("C. Upgrade equipment");
    console.log("D. End");
    const missionChoice = prompt("Enter your choice (A/B/C/D): ").toUpperCase();
    console.clear(); // Clear the console
    switch (missionChoice) {
        case 'A':
            console.log("You chose to shovel houses today!");
            const dailyEarnings = generateRandomEarnings(upgradeLevels['A']);
            console.log(`You earned $${dailyEarnings} today.`);
            return dailyEarnings; // Return the daily earnings
        case 'B':
            console.log("You have chosen not to work today and have earned $0.");
            return 0; // Return $0 if the user chooses not to work
        case 'C':
            console.log("You chose to upgrade equipment.");
            currentMoney = handleUpgrade(upgradeLevels, currentMoney); // Update currentMoney with the result of handleUpgrade
            return currentMoney; // Return the updated currentMoney
        case 'D':
            console.log("You chose to end the game. Goodbye!");
            process.exit(); // Quit out of the game
            break;
        default:
            console.log("Invalid choice. Please select A, B, C, or D.");
            return handleMission(day, upgradeLevels, currentMoney); // Prompt again for valid choice and return the result
    }
}

// Function to handle upgrade
function handleUpgrade(upgradeLevels, currentMoney) {
    console.log("What upgrade would you like?");
    console.log("A. Snow Removal Crew - $500");
    console.log("B. Snow Remover + Crew - $1000");
    console.log("C. Flamethrower - $5000");
    const upgradeChoice = prompt("Enter your choice (A/B/C): ").toUpperCase();
    console.clear(); // Clear the console
    const upgradeCost = UPGRADE_COSTS[upgradeChoice];
    if (upgradeCost === undefined) {
        console.log("Invalid upgrade choice.");
        return currentMoney;
    }
    if (currentMoney < upgradeCost) {
        console.log("You don't have enough money to purchase this upgrade.");
        return currentMoney;
    }
    const upgradeLevel = upgradeLevels[upgradeChoice];
    if (upgradeLevel >= 4) {
        console.log("You've already reached the maximum upgrade level for this option.");
        return currentMoney;
    }
    // Subtract upgrade cost and maintenance cost from current money
    const totalCost = upgradeCost + (upgradeCost * 0.1); // Total cost including maintenance
    currentMoney -= totalCost;
    upgradeLevels[upgradeChoice]++; // Increment upgrade level
    
    console.log(`Congrats, you purchased the upgrade! Your business should be better from here on!`);
    console.log(`Upgrade cost: $${upgradeCost}`);
    console.log(`Maintenance cost for this upgrade: $${upgradeCost * 0.1}`);
    console.log(`Current amount: $${currentMoney}`);
    console.log(); // Add an empty line for better readability

    return currentMoney;
}

// Initialize current money and upgrade levels
let currentMoney = 0;
const upgradeLevels = {
    'A': 1,
    'B': 1,
    'C': 1
};

// Gameplay Loop
for (let day = 1; day <= NUM_DAYS; day++) {
    const dailyEarnings = handleMission(day, upgradeLevels, currentMoney); // Call the mission function
    currentMoney += dailyEarnings; // Add daily earnings to current money
    console.log(`Current amount: $${currentMoney}`);
    console.log(); // Add an empty line for better readability

    // Check if it's the last day
    if (day === NUM_DAYS) {
        if (currentMoney >= END_GOAL) {
            console.log(`Congrats, you business mogul! You've made a living removing snow!`);
            console.log(`How does that make you feel?`);
        } else {
            console.log(`You have failed in business and must file for bankruptcy.`);
            console.log(`I guess this isn't for everyone.`);
        }
        console.log(`Game over.`);
        process.exit();
    }

    // Prompt to continue
    if (day < NUM_DAYS) {
        const continueChoice = prompt('Do you wish to continue? (y/n) ').toLowerCase();
        console.clear(); // Clear the console
        if (continueChoice !== 'yes' && continueChoice !== 'y') {
            console.log(`You have earned a total of $${currentMoney} over the course of the game. Goodbye!`);
            process.exit(); // Exit the program if the user declines to continue
        }
    }
}