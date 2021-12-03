const fs = require('fs');
let input = fs.readFileSync("message.txt").toString().split("\n")

const calculatePowerConsumption = function (input) {
    let fullSize = input.length;
    let average = fullSize / 2;
    let sumArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    input.forEach((element) => {
        let binaryArray = element.split("").map(Number);
        binaryArray.forEach((binaryElement, i) => {
            sumArray[i] += binaryElement;
        })
    });
    let gammaRate = sumArray.map(num => {
        if (num >= average) return 1;
        return 0;
    })
    let epsilonRate = gammaRate.map(num => Number(!num));
    return parseInt(gammaRate.join(''), 2) * parseInt(epsilonRate.join(''), 2)
}

const auxCalculate = function (input, isOxygen) {
    let rating = input.slice();
    let average = 0;
    let sum = 0;
    let i = 0;
    while (rating.length > 1) {
        average = rating.length / 2;
        sum = 0;
        for (let u = 0; u < rating.length; u++) {
            sum += Number(rating[u][i]);
        }
        let target;
        if (isOxygen) {
            target = sum >= average ? 1 : 0;
        } else {
            target = sum < average ? 1 : 0;
        }
        rating = rating.filter(element => element[i] == target);
        i++;
    }
    return rating;
}

const calculateOxygen = function (input) {
    let oxygenRating = auxCalculate(input.slice(), true);
    let scrubRating = auxCalculate(input.slice(), false);
    return parseInt(oxygenRating[0], 2) * parseInt(scrubRating[0], 2)
}

console.log("1*", calculatePowerConsumption(input));

console.log("2*", calculateOxygen(input));