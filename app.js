const prompt = require('prompt-sync')();

// Constants
const NUM_DAYS = 30;
const MIN_DAILY_EARNINGS = 100;
const MAX_DAILY_EARNINGS = 200;
const END_GOAL = 20000;

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

// Function to generate random daily earnings
function generateRandomEarnings() {
    return Math.floor(Math.random() * (MAX_DAILY_EARNINGS - MIN_DAILY_EARNINGS + 1)) + MIN_DAILY_EARNINGS;
}

// Function to handle mission
function handleMission(day) {
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
            const dailyEarnings = generateRandomEarnings();
            console.log(`You earned $${dailyEarnings} today.`);
            return dailyEarnings; // Return the daily earnings
        case 'B':
            console.log("You have chosen not to work today and have earned $0.");
            return 0; // Return $0 if user chooses not to work
        case 'C':
            console.log("You chose to upgrade equipment.");
            // Implement upgrade equipment logic
            return 0; // For now, return $0
        case 'D':
            console.log("You chose to end the game. Goodbye!");
            process.exit(); // Quit out of the game
            break;
        default:
            console.log("Invalid choice. Please select A, B, C, or D.");
            return handleMission(day); // Prompt again for valid choice and return the result
    }
}

// Initialize current money
let currentMoney = 0;

// Gameplay Loop
for (let day = 1; day <= NUM_DAYS; day++) {
    const dailyEarnings = handleMission(day); // Call the mission function
    currentMoney += dailyEarnings; // Add daily earnings to current money
    console.log(`Current amount: $${currentMoney}`);
    console.log(); // Add an empty line for better readability
    
    // Prompt to continue
    if (day < NUM_DAYS) {
        const continueChoice = prompt('Do you wish to continue? (yes/no) ').toLowerCase();
        console.clear(); // Clear the console
        if (continueChoice !== 'yes' && continueChoice !== 'y') {
            console.log(`You have earned a total of $${currentMoney} over the course of the game. Goodbye!`);
            process.exit(); // Exit the program if the user declines to continue
        }
    }
}
