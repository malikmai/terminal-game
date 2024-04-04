const prompt = require("prompt-sync")();

// Constants
const NUM_DAYS = 30;
const MIN_DAILY_EARNINGS = 100;
const MAX_DAILY_EARNINGS = 600;
const END_GOAL = 100000;
const UPGRADE_COSTS = {
  A: 500,
  B: 1500,
  C: 3000,
};
const UPGRADE_MULTIPLIERS = {
  A: [1, 0.5, 1.5, 3.0],
  B: [1.5, 2.0, 2.5, 3.0], // Adjusted multipliers for option B
  C: [2, 2.5, 3.0, 4.0], // Adjusted multipliers for option C
};
const BASE_DAILY_EARNINGS = {
  B: 1000, // Base daily earnings for option B
  C: 1500, // Base daily earnings for option C
};

// Introduction and Challenge prompt
console.log(`Welcome to Snow Removal Simulator 2024 ya go-getter!`);

const username = prompt("What is your name champ? ").trim();
console.clear(); // Clear the console
console.log(`So your name is ${username} huh?`);
console.log(); // added for visibility
console.log(
  `Well ${username}, here's the jazz. Its been a bad winter and has been snowing all year! We need you to get this place up and running in 30 DAYS!`
);
console.log(); // added for visibility
console.log(
  `I'll need you to use your cunning and wit to manage us out of this pickle. You can buy some upgrades as needed but we're dirt broke right now and alls we got is this here shovel.`
);
console.log(); // added for visibility
console.log(
  `Anywho! Your goal is to get us a big ol' truck and some new building upgrades but its gonna run us $${END_GOAL}!`
);
console.log(); // added for visibility
console.log();
console.log(`Well.. I'm off to Florida with the wife. See ya in a month!`);
console.log(); // added for visibility
const acceptChallenge = prompt(
  "Do you accept this challenge? (y/n) "
).toLowerCase();
console.clear(); // Clear the console
if (acceptChallenge !== "y") {
  console.log(`Have a nice day then.`);
  process.exit(); // Exit the program if the user declines the challenge
}

// Function to generate random daily earnings based on level
function generateRandomEarnings(level, upgradeLevels) {
  switch (level) {
    case 1:
      return (
        Math.floor(
          Math.random() * (MAX_DAILY_EARNINGS - MIN_DAILY_EARNINGS + 1)
        ) + MIN_DAILY_EARNINGS
      );
    case 2:
      const minEarningsB =
        BASE_DAILY_EARNINGS["B"] + (upgradeLevels["B"] - 1) * 250; // Adjust minimum earnings based on upgrade level
      const maxEarningsB = 1250 + (upgradeLevels["B"] - 1) * 250; // Adjust maximum earnings based on upgrade level
      const earningsB =
        Math.floor(Math.random() * (maxEarningsB - minEarningsB + 1)) +
        minEarningsB;
      const multiplierB = UPGRADE_MULTIPLIERS["B"][upgradeLevels["B"] - 1]; // Get the multiplier for option B
      return Math.floor(earningsB * multiplierB);
    case 3:
      const minEarningsC =
        BASE_DAILY_EARNINGS["C"] + (upgradeLevels["C"] - 1) * 500; // Adjust minimum earnings based on upgrade level
      const maxEarningsC = 2000 + (upgradeLevels["C"] - 1) * 500; // Adjust maximum earnings based on upgrade level
      const earningsC =
        Math.floor(Math.random() * (maxEarningsC - minEarningsC + 1)) +
        minEarningsC;
      const multiplierC = UPGRADE_MULTIPLIERS["C"][upgradeLevels["C"] - 1]; // Get the multiplier for option C
      return Math.floor(earningsC * multiplierC);
    case 4:
      const multiplierCLevel4 =
        UPGRADE_MULTIPLIERS["C"][upgradeLevels["C"] - 1]; // Get the multiplier for option C
      return (
        Math.floor(Math.random() * (2000 - 1200 + 1)) * multiplierCLevel4 + 5000
      );
    default:
      return 0;
  }
}

// Function to handle mission
function handleMission(day, upgradeLevels, currentMoney) {
  console.log(`Day ${day}`);
  console.log("Do you want to shovel houses today?");
  console.log(); // added for visibility
  console.log(`You currently have $${currentMoney}`);
  console.log(); // added for visibility
  console.log("A. Yes");
  console.log("B. No");
  console.log("C. Upgrade equipment");
  console.log("D. End");
  console.log(); // added for visibility
  const missionChoice = prompt("Enter your choice (A/B/C/D): ").toUpperCase();
  console.clear(); // Clear the console
  switch (missionChoice) {
    case "A":
      console.log(`You chose to shovel houses today!`);
      console.log(); // added for visibility
      console.log(`Current Amount: $${currentMoney}`);
      console.log(); // added for visibility
      const dailyEarnings = generateRandomEarnings(
        upgradeLevels["A"],
        upgradeLevels
      );
      console.log(); // added for visibility
      console.log(`You earned $${dailyEarnings} today.`);
      currentMoney += dailyEarnings; // Add daily earnings to current money
      console.log(); // added for visibility
      console.log(`Total Amount Earned so far: $${currentMoney}`);
      return currentMoney; // Return the updated currentMoney
    case "B":
      console.log("You have chosen not to work today and have earned $0.");
      return currentMoney; // Return currentMoney without any changes
    case "C":
      console.log("You chose to upgrade equipment.");
      console.log(); // added for visibility
      currentMoney = handleUpgrade(upgradeLevels, currentMoney, day); // Update currentMoney with the result of handleUpgrade
      console.log(`Current Amount Left after Purchase: $${currentMoney}`);
      return currentMoney; // Return the updated currentMoney
    case "D":
      console.log("You chose to end the game. Goodbye!");
      process.exit(); // Quit out of the game
      break;
    default:
      console.log("Invalid choice. Please select A, B, C, or D.");
      return handleMission(day, upgradeLevels, currentMoney); // Prompt again for valid choice and return the result
  }
}

// Function to handle upgrade
function handleUpgrade(upgradeLevels, currentMoney, day) {
  console.log("What upgrade would you like?");
  console.log(); // added for visibility
  console.log(`You currently have $${currentMoney}`);
  console.log(); // added for visibility
  console.log("A. Snow Removal Crew - $500");
  console.log("B. Snow Remover - $1500");
  console.log("C. Flamethrower - $3000");
  console.log(); // added for visibility
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
    console.log(
      "You've already reached the maximum upgrade level for this option."
    );
    return currentMoney;
  }
  // Subtract upgrade cost and maintenance cost from current money
  const totalCost = upgradeCost + upgradeCost * 0.1; // Total cost including maintenance
  currentMoney -= totalCost;
  upgradeLevels[upgradeChoice]++; // Increment upgrade level

  console.log(
    `Congrats, you purchased the upgrade! Your business should be better from here on!`
  );
  console.log(); // added for visibility
  console.log(`Upgrade cost: $${upgradeCost}`);
  console.log(`Maintenance cost for this upgrade: $${upgradeCost * 0.1}`);
  console.log(); // added for visibility

  return currentMoney;
}

// Initialize current money and upgrade levels
let currentMoney = 0;
const upgradeLevels = {
  A: 1,
  B: 1,
  C: 1,
};

// Gameplay Loop
for (let day = 1; day <= NUM_DAYS; day++) {
  const prevDay = day - 1; // Store the previous day

  const dailyEarnings = handleMission(day, upgradeLevels, currentMoney); // Call the mission function
  currentMoney = dailyEarnings; // Set current money to the updated value returned from handleMission
  console.log(); // Add an empty line for better readability

  // Check if it's the last day
  if (day === NUM_DAYS) {
    if (currentMoney >= END_GOAL) {
      console.log(
        `Congrats, you business mogul! You've made a living removing snow!`
      );
      console.log(); // added for visibility
      console.log(`How does that make you feel?`);
      console.log(); // added for visibility
    } else {
      console.log(
        `You have failed in business and in life! You MUST file for bankruptcy.`
      );
      console.log(); // added for visibility
      console.log(`I guess this isn't for everyone huh kid?!`);
      console.log(); // added for visibility
    }
    console.log(`Game over.`);
    console.log(); // added for visibility
    process.exit();
  }

  // Prompt to continue
  if (day < NUM_DAYS) {
    const continueChoice = prompt(
      "Do you wish to continue? (y/n) "
    ).toLowerCase();
    console.clear(); // Clear the console
    if (continueChoice === "no" || continueChoice === "n") {
      console.log(`You have decided not to continue.`);
      day = prevDay; // Set the day back to the previous one
    }
  }
}