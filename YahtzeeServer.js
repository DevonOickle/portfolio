const express = require('express');
const app = express();
const PORT = 3010;

app.use(express.static('public')); 

app.get('roll-dice', async (req, res) => {
    try {
        let response = await fetch('roll-dice');
        let data = await response.json();
        console.log('Dice value:', data.diceValue);
        document.getElementById("pip").innerHTML = " ";

        let isYahtzee = true;

        const counts = {};

        for (let i = 0; i < dice.length; i++) {
            if (!dice[i].classList.contains('held')) {
                const randomNumber = Math.floor(Math.random() * 6) + 1;
                dice[i].style.animation = 'none';
                dice[i].style.backgroundPosition = -100 * (randomNumber - 1) + '% 0';

                diceNumber[i] = randomNumber;
                counts[randomNumber] = (counts[randomNumber] || 0) + 1;
            }
        }

        for (let i = 0; i < dice.length; i++) {
            if (dice[i].classList.contains('held')) {
                diceNumber[i] = diceNumber[i] || Math.floor(Math.random() * 6) + 1;
            }

            document.getElementById("pip").innerHTML += diceNumber[i] + " ";
        }

        rollButton.disabled = rollCount === 3 ? true : false;

        const total = sumArray(diceNumber);

        document.getElementById("totalupper").innerHTML = upperSum;

        if (upperSum >= 63) {
            bonus = true;
            document.getElementById("bonus").innerHTML = 35;
            totalScore += 35;
            bonus = false;
        }

        countDiceNumbers();
        res.json({ diceNumber, total, upperSum, bonus });

    } catch (error) {
        console.error('Error fetching dice value:', error);
    }
});

async function sumArray(array) {
    return array.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    }, 0);

}

async function countDiceNumbers() {
    const numOfPips = [0, 0, 0, 0, 0, 0];

    let twoOfKind = false;
    let threeOfKind = false;

    for (let i = 0; i < diceNumber.length; i++) {
        const number = diceNumber[i];
        if (number >= 1 && number <= 6) {
            numOfPips[number - 1]++;
        }
    }

    let hasThreeOfAKind = false;
    let hasFourOfAKind = false;
    let hasTwoOfAKind = false;
    let twoOfKindNum = 0;
    let threeOfKindNum = 0;

    for (let i = 0; i < numOfPips.length; i++) {
        if (numOfPips[i] >= 3) {
            hasThreeOfAKind = true;
            document.getElementById("possibleThreeOfKind").textContent = (i + 1) * 3;
            threeOfKindScore = (i + 1) * 3;
            threeOfKindNum = i;
        }

        if (numOfPips[i] >= 4) {
            hasFourOfAKind = true;
            document.getElementById("possibleFourOfKind").textContent = (i + 1) * 4;
            fourOfKindScore = (i + 1) * 4;
        }


    }

    for (let j = 0; j < numOfPips.length; j++) {
        if (numOfPips[j] >= 2) {
            if (j !== threeOfKindNum) {
                hasTwoOfAKind = true;
                twoOfKindNum = j;
            }
        }
    }

    if (hasThreeOfAKind && hasTwoOfAKind) {
        document.getElementById("possibleFullHouse").textContent = "25";
        fullHouseScore = 25;
    } else {
        document.getElementById("possibleFullHouse").textContent = "-";
    }

    function isSmallStraight(diceNumbers) {
        const uniqueNumbers = Array.from(new Set(diceNumbers));
        if (uniqueNumbers.length < 4) {
            return false;
        }
        uniqueNumbers.sort();
        for (let i = 0; i < uniqueNumbers.length - 1; i++) {
            if (uniqueNumbers[i + 1] - uniqueNumbers[i] > 1) {
                return false;
            }
        }
        smallStraightScore = 30;
        return true;
    }


    function isLargeStraight(diceNumbers) {
        const uniqueNumbers = Array.from(new Set(diceNumbers));
        if (uniqueNumbers.length < 5) {
            return false;
        }
        uniqueNumbers.sort();
        for (let i = 0; i < uniqueNumbers.length - 1; i++) {
            if (uniqueNumbers[i + 1] - uniqueNumbers[i] !== 1) {
                return false;
            }
        }
        largeStraightScore = 40;
        return true;
    }

    if (isSmallStraight(diceNumber)) {
        document.getElementById("possibleSmallStraight").textContent = "30";
    } else {
        document.getElementById("possibleSmallStraight").textContent = "-";
    }

    if (isLargeStraight(diceNumber)) {
        document.getElementById("possibleLargeStraight").textContent = "40";
    } else {
        document.getElementById("possibleLargeStraight").textContent = "-";
    }


    document.getElementById("possibleOnesScore").textContent = numOfPips[0];
    document.getElementById("possibleTwosScore").textContent = numOfPips[1] * 2;
    document.getElementById("possibleThreesScore").textContent = numOfPips[2] * 3;
    document.getElementById("possibleFoursScore").textContent = numOfPips[3] * 4;
    document.getElementById("possibleFivesScore").textContent = numOfPips[4] * 5;
    document.getElementById("possibleSixesScore").textContent = numOfPips[5] * 6;
    document.getElementById("possibleChance").innerHTML = sumArray(diceNumber);




    let hasYahtzee = false;
    for (let i = 0; i < numOfPips.length; i++) {
        if (numOfPips[i] >= 5) {
            hasYahtzee = true;
            document.getElementById("possibleYahtzee").textContent = "50";
            yahtzeeScore = 50;
        }
    }

    if (roundCount == 13) {
        rollButton.disabled = true
        document.getElementById('Sum').textContent = totalScore;

    }

    for (let i = 0; i < numOfNum.length; i++) {
        numOfNum[i] = numOfPips[i] * (i + 1);
    }
    lowerScore[5] = sumArray(diceNumber);

    document.getElementById("totalScore").innerHTML = totalScore;
}


app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`); });
