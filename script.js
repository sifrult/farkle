// Array to store the dice objects
var diceArr = [];
var clickedDiceValues = [];

// Initialize dice objects with their initial values
function initializeDice() {
    for (var i = 0; i < 6; i++) {
        diceArr[i] = {
            id: "die" + (i + 1),
            value: i + 1,
            clicked: 0
        };
    }
}

// Calculates the total score of all selected dice
function calculateScore(values) {
    var score = 0;
    var countMap = {}; // A map to keep track of the counts for each value

    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        score += getIndividualScore(value); // Add score for individual dice

        // Check if there is a value in countMap, if not set it to 0. This helps check for x-of-a-kind
        countMap[value] = (countMap[value] || 0) + 1;
    }

    for (var key in countMap) {
        if (countMap[key] >= 3) {
            if (key === '1') {
                score += 1000; // Add score for three 1s
                score -= Math.min(countMap[key], 3) * 100; // After getting 3-of-a-kind, deduct additional 1s
                if (countMap[key] === 6) {
                    score += 1000; // Add an additional 1000 points for getting all 1s
                    score -= Math.min(countMap[key], 3) * 100; // Deduct additional 1s for 6-of-a-kind
                }
            } else if (key === '5') {
                score += 500; // Add score for three 5s
                score -= Math.min(countMap[key], 3) * 50; // After getting 3-of-a-kind, deduct additional 5s
                if (countMap[key] === 6) {
                    score += 500; // Add an additional 500 points for getting all 5s
                    score -= Math.min(countMap[key], 3) * 50; // Deduct additional 5s for 6-of-a-kind
                }
            } else {
                score += key * 100; // Other values for three of a kind give 100 times the value
                if (countMap[key] === 6) {
                    score += key * 100; // Double the score for getting all of the same value
                }
            }
        }
    }

    return score;
}


// Calculates score for die value of 1 and 5
function getIndividualScore(value) {
    switch (value) {
        case 1:
            return 100;
        case 5:
            return 50;
        default:
            return 0;
    }
}

// Rolls the dice and updates their values
function rollDice() {
    diceValues = []; // Clear the diceValues array

    for (var i = 0; i < 6; i++) {
      if (diceArr[i].clicked === 0 && !diceArr[i].isTransparent) {
        diceArr[i].value = Math.floor((Math.random() * 6) + 1);
        diceValues.push(diceArr[i].value); // Add non-transparent values to diceValues
      }
    }

    updateDiceImg();

    var availableScore = calculateScore(diceValues);
    if (availableScore === 0) {
      endGame();
      return;
    }
  }

// Updates the images of the dice based on their values
function updateDiceImg() {
    for (var i = 0; i < 6; i++) {
        var diceImage = "assets/" + diceArr[i].value + ".png"; // Get the image URL based on the dice value
        document.getElementById(diceArr[i].id).setAttribute("src", diceImage); // Update the image source
    }
}

// Handles click events on dice images
function diceClick(img) {
    var i = img.getAttribute("data-number"); // Get the index of the clicked dice
    var clickedDice = diceArr[i]; // Get the clicked dice object

    img.classList.toggle("transparent"); // Toggle the transparency of the clicked dice image

    if (clickedDice.clicked === 0) {
        clickedDice.clicked = 1; // Mark the dice as clicked
        clickedDice.isTransparent = img.classList.contains("transparent"); // Set the isTransparent property
    } else {
        clickedDice.clicked = 0; // Mark the dice as unclicked
        clickedDice.isTransparent = false; // Reset the isTransparent property
    }

    // Update the temporary score display
    document.querySelector(".tempScore").innerText = calculateScore(getClickedDiceValues());
}

// Get the values of the clicked dice
function getClickedDiceValues() {
    var clickedDiceValues = [];

    for (var i = 0; i < diceArr.length; i++) {
        if (diceArr[i].clicked === 1) {
            clickedDiceValues.push(diceArr[i].value); // Add the value of clicked dice to the array
        }
    }

    return clickedDiceValues;
}

// Reset the clicked state of the dice
function resetClickedDice() {
    for (var i = 0; i < diceArr.length; i++) {
        if (diceArr[i].clicked === 1) {
            diceArr[i].clicked = 0; // Reset the clicked state only if it was clicked
            var diceImage = "assets/" + diceArr[i].value + ".png"; // Get the image URL based on the dice value
            document.getElementById(diceArr[i].id).setAttribute("src", diceImage); // Update the image source
        }
    }
}

// Keep the score and reset the temporary score and clicked state of the dice
function keepScore() {
    var tempScoreElement = document.querySelector(".tempScore"); // Get the temporary score element
    var scoreElement = document.querySelector(".score"); // Get the score element

    var tempScore = parseInt(tempScoreElement.innerText); // Get the current temporary score
    var score = parseInt(scoreElement.innerText); // Get the current score

    score += tempScore; // Add the temporary score to the score

    scoreElement.innerText = score; // Update the score element

    // Reset the temporary score
    tempScoreElement.innerText = "0";

    // Reset the clicked state of the dice
    resetClickedDice();
}

// Displays a message and disables the "Roll Dice" button
function endGame() {
    var gameOverElement = document.querySelector(".gameOver");
    gameOverElement.style.display = "block"; // Display the "Game Over" message

    var rollDiceButton = document.querySelector(".roll");
    rollDiceButton.disabled = true; // Disable the roll dice button

    console.log('end')
}
