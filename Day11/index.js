const fs = require('fs');

const input = [];
fs.readFileSync("input.txt").toString().split("\n").forEach((line, i) => {
    input[i] = [];
    line.split("").forEach(number => {
        input[i].push(Number(number));
    })
})

const incrementOctopus = function (input, x, y) {
    if (input[x] == undefined || input[x][y] == undefined) return;
    if (++input[x][y] == 10) { // Make sure only flashing octo actually increments nearby
        incrementOctopus(input, x - 1, y);
        incrementOctopus(input, x - 1, y - 1);
        incrementOctopus(input, x - 1, y + 1);
        incrementOctopus(input, x + 1, y);
        incrementOctopus(input, x + 1, y + 1);
        incrementOctopus(input, x + 1, y - 1);
        incrementOctopus(input, x, y - 1);
        incrementOctopus(input, x, y + 1);
    }
}

const countAndReset = function (input) {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] > 9) {
                input[i][j] = 0
                count++;
            }
        }
    }
    return count;
}

const processOctopussies = function (input, days) {
    let count = 0;
    for (let z = 0; z < days; z++) {
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                incrementOctopus(input, i, j);
            }
        }
        count += countAndReset(input);
    }
    return count;
}

const searchSyncOctopussies = function (input) {
    let step = 0;
    while (true) {
        step++
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                incrementOctopus(input, i, j);
            }
        }
        if(countAndReset(input) == 10 * 10) break;
    }
    return step;
}

console.log("1*", processOctopussies(input.slice(), 100));
console.log("2*", searchSyncOctopussies(input.slice()));