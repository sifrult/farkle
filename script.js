var diceArr = [];

function initializeDice() {
  for (var i = 0; i < 6; i++) {
    diceArr[i] = {
      id: "die" + (i + 1),
      value: i + 1,
      clicked: 0
    };
  }
}

// Calculates total score of all selected dice
function calculateScore(values) {
  var score = 0;
  var countMap = {};

  for (var i = 0; i < values.length; i++) {
    var value = values[i];
    score += getIndividualScore(value);

    // Check if there is a value in countMap, if not set it to 0. This helps check for 3-of-a-kind
    countMap[value] = (countMap[value] || 0) + 1;
  }

  for (var key in countMap) {
    if (countMap[key] >= 3) {
      if (key === '1') {
        score += 1000;
        score -= Math.min(countMap[key], 3) * 100; // Deduct the score for individual 1s
        if (countMap[key] === 6) {
          score += 1000; // Add an additional 1000 points for getting all 1s
          score -= Math.min(countMap[key], 3) * 100;
        }
      } else if (key === '5') {
        score += 500;
        score -= Math.min(countMap[key], 3) * 50; // Deduct the score for individual 5s
        if (countMap[key] === 6) {
          score += 500; // Add an additional 500 points for getting all 5s
          score -= Math.min(countMap[key], 3) * 50;
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

function rollDice() {
  var diceValues = [];

  for (var i = 0; i < 6; i++) {
    if (diceArr[i].clicked === 0) {
      diceArr[i].value = Math.floor((Math.random() * 6) + 1);
    }
    diceValues.push(diceArr[i].value);
  }

  updateDiceImg();
}

function updateDiceImg() {
  for (var i = 0; i < 6; i++) {
    var diceImage = "assets/" + diceArr[i].value + ".png";
    document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
  }
}

function diceClick(img) {
  var i = img.getAttribute("data-number");
  var clickedDice = diceArr[i];

  img.classList.toggle("transparent");

  if (clickedDice.clicked === 0) {
    clickedDice.clicked = 1;
  } else {
    clickedDice.clicked = 0;
  }

  document.querySelector(".tempScore").innerText = calculateScore(getClickedDiceValues());
}

function getClickedDiceValues() {
  var clickedDiceValues = [];

  for (var i = 0; i < diceArr.length; i++) {
    if (diceArr[i].clicked === 1) {
      clickedDiceValues.push(diceArr[i].value);
    }
  }

  return clickedDiceValues;
}
