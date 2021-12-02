const fs = require('fs');
let input = fs.readFileSync("input.txt").toString().split("\n").map(line => {
    let splitLine = line.split(" ");
    return {
        command: splitLine[0],
        value: Number(splitLine[1])
    };
});

const calculateFinalPosition = function (input) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < input.length; i++) {
        switch (input[i].command) {
            case "forward":
                x += input[i].value;
                break;
            case "down":
                y += input[i].value;
                break;
            case "up":
                y -= input[i].value;
                break;
        }
    }
    return x * y;
}

const calculateFinalPositionWithAim = function (input) {
    let x = 0;
    let y = 0;
    let aim = 0;
    for (let i = 0; i < input.length; i++) {
        switch (input[i].command) {
            case "forward":
                x += input[i].value;
                y += aim * input[i].value
                break;
            case "down":
                aim += input[i].value;
                break;
            case "up":
                aim -= input[i].value;
                break;
        }
    }
    return x * y;
}

console.log("1*", calculateFinalPosition(input));

console.log("2*", calculateFinalPositionWithAim(input));