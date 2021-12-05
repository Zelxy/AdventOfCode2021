const fs = require('fs');

let numbers = [];
let bingoCards = [];
let k = -1; // bingo index
let j = 0; // bingo lines
fs.readFileSync("input.txt").toString().split("\n").forEach((line, i) => {
    if (i === 0) {
        numbers = line.split(',').map(Number);
    } else if (line == "") {
        k++;
        j = 0;
        bingoCards[k] = [];
    } else {
        bingoCards[k][j] = line.split(" ").filter(el => el !== "").map(Number);
        j++;
    }
})

const checkWinner = function (card, x, y) {
    return (card[x][0] == -1 && card[x][1] == -1 && card[x][2] == -1 && card[x][3] == -1 && card[x][4] == -1) ||
        (card[0][y] == -1 && card[1][y] == -1 && card[2][y] == -1 && card[3][y] == -1 && card[4][y] == -1);
}

const sumUnmarked = function (card) {
    let row;
    let sum = 0;
    for (let i = 0; i < card.length; i++) {
        row = card[i];
        for (let j = 0; j < row.length; j++) {
            sum += row[j] == -1 ? 0 : row[j]
        }
    }
    return sum;
}

const updateCards = function (cards, number) {
    let card;
    let row;
    let elementIndex;
    for (let i = 0; i < cards.length; i++) {
        card = cards[i];
        for (let j = 0; j < card.length; j++) {
            row = card[j];
            elementIndex = row.indexOf(number);
            if (elementIndex >= 0) {
                row[elementIndex] = -1;
                if(number == 13 || number == 16){
                    console.log("Winning number", card)
                }

                if (checkWinner(card, j, elementIndex)) {
                    return { number, card, cardIndex: i };
                }
                continue;
            }

        }
    }
    return -1;
}

const getWinner = function (cards, numbers) {
    let winner = -1
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        let { number, card } = updateCards(cards, numbers[i]);
        winner = number;
        if (winner >= 0) {
            sum = sumUnmarked(card)
            break;
        }
    }
    console.log(winner, sum);
    return winner * sum;
}

const getLastWinner = function (cards, numbers) {
    let winner = -1
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        let { number, card, cardIndex } = updateCards(cards, numbers[i]);
        winner = number;
        if (winner >= 0 && cards.length > 1) {
            i--
            cards.splice(cardIndex, 1);
        } else if (winner >= 0 && cards.length == 1) {
            sum = sumUnmarked(card)
            break;
        }
    }
    console.log(winner, sum);
    return winner * sum;
}


console.log("1*", getWinner(bingoCards, numbers));

console.log("2*", getLastWinner(bingoCards, numbers));