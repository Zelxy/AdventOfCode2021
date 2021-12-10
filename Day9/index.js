const fs = require('fs');

const input = [];
fs.readFileSync("input.txt").toString().split("\n").forEach((line, i) => {
    input[i] = [];
    line.split("").forEach(number => {
        input[i].push(Number(number));
    })
})

const isLowestPoint = function (numbers, x, y, currentNumber) {
    if (currentNumber == 9) return false;
    if (currentNumber == 0) return true;
    let aboveCell = numbers[x - 1] !== undefined ? numbers[x - 1][y] : 10;
    let belowCell = numbers[x + 1] !== undefined ? numbers[x + 1][y] : 10;
    let leftCell = numbers[x][y - 1] !== undefined ? numbers[x][y - 1] : 10;
    let rightCell = numbers[x][y + 1] !== undefined ? numbers[x][y + 1] : 10;
    return currentNumber < aboveCell && currentNumber < belowCell && currentNumber < leftCell && currentNumber < rightCell
}

const findBasin = function (numbers, x, y) {
    let validatedCoords = new Set();
    const findBasinAux = function (numbers, x, y, sum) {
        if (validatedCoords.has(`${x},${y}`)) {
            return 0;
        }
        validatedCoords.add(`${x},${y}`);
        if (numbers[x] == undefined || numbers[x][y] == undefined || numbers[x][y] == 9) {
            return 0;
        }
        let currentSum = 0;
        currentSum += findBasinAux(numbers, x + 1, y);
        currentSum += findBasinAux(numbers, x - 1, y);
        currentSum += findBasinAux(numbers, x, y + 1);
        currentSum += findBasinAux(numbers, x, y - 1);
        return currentSum + 1;
    }
    let sum = findBasinAux(numbers, x, y, 1);
    return sum;

}

const sumLowestPoints = function (input) {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (isLowestPoint(input, i, j, input[i][j])) {
                sum += input[i][j] + 1;
            }
        }
    }
    return sum;
}

const multiplyBasins = function (input) {
    let basins = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (isLowestPoint(input, i, j, input[i][j])) {
                basins.push(findBasin(input, i, j));
            }
        }
    }
    basins.sort((a,b) => Number(b) - Number(a));
    return basins[0] * basins[1] * basins[2];
}


console.log("1*", sumLowestPoints(input));
console.log("2*", multiplyBasins(input));