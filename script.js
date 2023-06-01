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

    for (var i = 0; i < values.length; i++) {
        switch (values[i]) {
            case 1:
                score += 100;
                break;
            case 5:
                score += 50;
                break;
            default:
                break;
        }
    }

    return score;
}

/*Rolling dice values*/
function rollDice(){
    var totalScore = 0;

    for(var i=0; i < 6; i++){
        if(diceArr[i].clicked === 0){
            diceArr[i].value = Math.floor((Math.random() * 6) + 1);
            diceArr[i].score = calculateScore([diceArr[i].value]);
            totalScore += diceArr[i].score;
        }
    }

    document.querySelector(".row.score").innerText = totalScore;

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

function diceClick(img){
	var i = img.getAttribute("data-number");

	img.classList.toggle("transparent");
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1;
	}
	else{
		diceArr[i].clicked = 0;
	}

}
