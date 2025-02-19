// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Delay Function
async function delays(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  getRandomInt,
  delays,
};
