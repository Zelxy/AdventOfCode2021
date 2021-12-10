const fs = require('fs');

const input = [];
fs.readFileSync("input.txt").toString().split("\n").forEach((line, i) => {
    input.push(line);
})

let closingCharacters = new Set([')', ']', '}', '>']);
let matchingDict = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
};

const calculateCorrupted = function (input) {
    let pointsDict = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };
    let sum = 0;
    input.forEach(line => {
        let characterStack = [];
        for (let i = 0; i < line.length; i++) {
            let character = line[i];
            if (closingCharacters.has(character)) {
                let lastChar = characterStack.pop();
                if (lastChar !== matchingDict[character]) {
                    console.log(`BZZZZT CORRUPTED found ${character}`);
                    sum += pointsDict[character];
                    break;
                }
            } else {
                characterStack.push(character);
            }
        }
    })
    return sum;
}

const calculateMissing = function (input) {
    let closingDict = {
        '(': ')',
        '[': ']',
        '{': '}',
        '<': '>'
    };
    let pointsDict = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    };
    let scores = [];
    input.forEach((line, i) => {
        let characterStack = [];
        for (let i = 0; i < line.length; i++) {
            let character = line[i];
            if (closingCharacters.has(character)) {
                let lastChar = characterStack.pop();
                if (lastChar !== matchingDict[character]) {
                    characterStack = [];
                    break;
                }
            } else {
                characterStack.push(character);
            }
        }
        let score = 0;
        for (let i = characterStack.length - 1; i >= 0; i--) {
            let completingCharacter = closingDict[characterStack[i]];
            score *= 5;
            score += pointsDict[completingCharacter];
        }
        if (score > 0) scores.push(score);
    })
    scores.sort((a,b) => Number(a) - Number(b))
    return scores[(scores.length - 1)/2];
}
console.log("1*", calculateCorrupted(input));
console.log("2*", calculateMissing(input));