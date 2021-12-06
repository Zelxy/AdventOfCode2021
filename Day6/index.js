const fs = require('fs');


const input = fs.readFileSync("input.txt").toString().split(",").map(Number);

const processDay = function (currentDay) {
    let currentDayCopy = {};
    Object.assign(currentDayCopy, currentDay);
    for (let i = 1; i <= 8; i++) {
        currentDayCopy[i - 1] = currentDay[i];
    }
    currentDayCopy[8] = currentDay[0];
    currentDayCopy[6] = currentDayCopy[6] + currentDay[0];
    return currentDayCopy;
}

const executeDays = function (input, days) {
    let processInput = input.slice();
    let dayMap = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        6: 0,
        5: 0,
        7: 0,
        8: 0
    };

    for (let j = processInput.length - 1; j >= 0; j--) {
        dayMap[processInput[j]]++;
    }
    console.log(dayMap)
    for (let i = 0; i < days; i++) {
        dayMap = processDay(dayMap);
    }
    console.log(dayMap)
    return Object.values(dayMap).reduce((sum, cur) => sum + cur, 0);
}

console.log("1*", executeDays(input, 18));

console.log("2*", executeDays(input, 256));