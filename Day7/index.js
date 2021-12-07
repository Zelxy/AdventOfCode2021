const fs = require('fs');


const input = fs.readFileSync("input.txt").toString().split(",").map(Number);

const calculateBestStep = function (crabs) {
    let minSteps = Number.MAX_SAFE_INTEGER;
    let bestPosition = -1;
    let max = Math.max(...input);
    for (let i = 0; i < max; i++) {
        let currentSteps = 0;
        crabs.forEach(crab => {
            currentSteps += Math.abs(crab - i);
        })
        if(currentSteps < minSteps ){
            minSteps = currentSteps;
            bestPosition = i;
        }
    }
    console.log("best position is", bestPosition);
    return minSteps;
}

const getSum = function (number) {
    let sum = 0;
    for(let i = 1; i <= number; i++){
        sum += i;
    }
    return sum;
}

const calculateBestStepIncreasing = function (crabs) {
    let minSteps = Number.MAX_SAFE_INTEGER;
    let bestPosition = -1;
    let max = Math.max(...input);
    for (let i = 0; i < max; i++) {
        let currentSteps = 0;
        crabs.forEach(crab => {
            currentSteps += getSum(Math.abs(crab - i));
        })
        if(currentSteps < minSteps ){
            minSteps = currentSteps;
            bestPosition = i;
        }
    }
    console.log("best position is", bestPosition);
    return minSteps;
}


console.log("1*", calculateBestStep(input));
console.log("2*", calculateBestStepIncreasing(input));