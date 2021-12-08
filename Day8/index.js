const fs = require('fs');

const input = [];
fs.readFileSync("input.txt").toString().split("\n").forEach(line => {
    let tempNumber = {
        input: [],
        output: []
    };
    line.split(" ").forEach((number, j) => {
        if (j <= 9) {
            tempNumber.input.push(number);
        } else if (number != '|') {
            tempNumber.output.push(number);
        }
    })
    input.push(tempNumber);
})

const processUniqueNumbersOutput = function (input) {
    let count = 0;
    input.forEach(line => {
        line.output.forEach(number => {
            if (number.length == 7 || number.length == 4 || number.length == 3 || number.length == 2) count++
        })
    })
    return count;
}

const processNumberTranslation = function (input) {
    let sum = 0;
    input.forEach(line => {
        sum += translateOutput(line, translateInput(line));
    })
    return sum;
}

const numberDict = {
    'abcefg': 0,
    'cf': 1,
    'acdeg': 2,
    'acdfg': 3,
    'bcdf': 4,
    'abdfg': 5,
    'abdefg': 6,
    'acf': 7,
    'abcdefg': 8,
    'abcdfg': 9
}

const translateInput = function (input) {
    let charDict = {
        'a': '',
        'b': '',
        'c': '',
        'd': '',
        'e': '',
        'f': '',
        'g': '',
    }
    let processingInput = input.input.slice();
    let lengthSorted = processingInput.sort((a, b) => a.length - b.length);
    lengthSorted = lengthSorted.map(string => string.split('').sort().join(""));
    // Find different element between L2 and L3, this is a
    for (let i = 0; i < lengthSorted[1].length; i++) {
        if (lengthSorted[0].indexOf(lengthSorted[1][i]) == -1) {
            charDict['a'] = lengthSorted[1][i];
        }
    }

    let lengthFive = [lengthSorted[3], lengthSorted[4], lengthSorted[5]];
    // find the number 3 
    for (let i = 0; i < lengthFive.length; i++) {
        if (stringContainAll(lengthFive[i], lengthSorted[1])) {
            let numberThree = lengthFive[i];
            for (let j = 0; j < numberThree.length; j++) {
                if (lengthSorted[1].indexOf(numberThree[j]) == -1) {
                    if (stringContainAny(lengthSorted[2], numberThree[j])) {
                        charDict['d'] = numberThree[j];
                    } else {
                        charDict['g'] = numberThree[j];
                    }
                }
            }
        }
    }

    // find missing element of L4
    for (let i = 0; i < lengthSorted[2].length; i++) {
        if (lengthSorted[0][0].indexOf(lengthSorted[2][i]) == -1 && lengthSorted[0][1].indexOf(lengthSorted[2][i]) == -1 && getKeyByValue(charDict, lengthSorted[2][i]) == undefined) {
            charDict['b'] = lengthSorted[2][i];
        }
    }

    // find 5
    for (let i = 0; i < lengthFive.length; i++) {
        if (lengthFive[i].indexOf(charDict['a']) !== -1 && lengthFive[i].indexOf(charDict['b']) !== -1 && lengthFive[i].indexOf(charDict['d']) !== -1 && lengthFive[i].indexOf(charDict['g']) !== -1) {
            for (let j = 0; j < lengthFive[i].length; j++) {
                if (getKeyByValue(charDict, lengthFive[i][j]) == undefined) {
                    charDict['f'] = lengthFive[i][j];
                }
            }
        }
    }

    // missing L2
    for (let i = 0; i < lengthSorted[2].length; i++) {
        for (let j = 0; j < lengthSorted[2].length; j++) {
            if (getKeyByValue(charDict, lengthSorted[2][j]) == undefined) {
                charDict['c'] = lengthSorted[2][i];
            }
        }

    }

    for (let i = 0; i < lengthSorted[9].length; i++) {
        if (getKeyByValue(charDict, lengthSorted[9][i]) == undefined) {
            charDict['e'] = lengthSorted[9][i];
        }

    }
    return charDict;
}

const translateOutput = function (input, map) {
    let processingOutput = input.output.slice();
    processingOutput = processingOutput.map(string => string.split('').sort().join(""));
    let translatedOutputs = [];
    processingOutput.forEach(output => {
        let translatedOutput = '';
        for (let i = 0; i < output.length; i++) {
            translatedOutput += getKeyByValue(map, output[i]);
        }
        translatedOutputs.push(translatedOutput);
    })
    translatedOutputs = translatedOutputs.map(string => string.split('').sort().join(""));
    let numberToParse = "";
    translatedOutputs.forEach(translation => {
        numberToParse += numberDict[translation];
    })
    return Number(numberToParse);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function stringContainAny(string, cmp) {
    for (let i = 0; i < cmp.length; i++) {
        if (string.indexOf(cmp[i]) !== -1) {
            return true;
        }
    }
    return false;
}

function stringContainAll(string, cmp) {
    for (let i = 0; i < cmp.length; i++) {
        if (string.indexOf(cmp[i]) == -1) {
            return false;
        }
    }
    return true;
}


console.log("1*", processUniqueNumbersOutput(input));
console.log("2*", processNumberTranslation(input));