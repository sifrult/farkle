var diceArr = [];

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
        diceArr[i].score = 0;
	}
}

function calculateScore(values) {
    var score = 0;
    var countMap = {};

    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        score += getIndividualScore(value);

        if (countMap[value]) {
            countMap[value]++;
        } else {
            countMap[value] = 1;
        }
    }

    for (var key in countMap) {
        if (countMap[key] >= 3) {
            if (key === '1') {
                score += 1000; // Three 1s give 1000 points
                score -= 300; // Deduct the score for individual 1s (100 each)
            } else if (key === '5') {
                score += 500;
                score-= 150;
            }
            else {
                score += key * 100; // Other values for three of a kind give 100 times the value
                score -= (key * 100) * 2; // Deduct the score for individual values (100 each)
            }
        }
    }

    return score;
}



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


/*Rolling dice values*/
function rollDice(){
    var diceValues = [];

    for(var i = 0; i < 6; i++){
        if(diceArr[i].clicked === 0){
            diceArr[i].value = Math.floor((Math.random() * 6) + 1);
        }
        diceValues.push(diceArr[i].value);
    }

    var totalScore = calculateScore(diceValues);

    // Displays dice scores on page
    console.log(totalScore);

    updateDiceImg();
}


/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "assets/" + diceArr[i].value + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img) {
    var i = img.getAttribute("data-number");
    var clickedDice = diceArr[i];

    img.classList.toggle("transparent");

    if (clickedDice.clicked === 0) {
        clickedDice.clicked = 1;
        document.querySelector(".row.tempScore").innerText = calculateScore(getClickedDiceValues());
    } else {
        clickedDice.clicked = 0;
        document.querySelector(".row.tempScore").innerText = calculateScore(getClickedDiceValues());
    }
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
