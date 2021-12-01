const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

let instream = fs.createReadStream('input.txt');
let outstream = new stream;
let rl = readline.createInterface(instream, outstream);

let arr = [];

rl.on('line', function (line) {
  arr.push(Number(line));
});

rl.on('close', function () {
  console.log("Total is", calculateDepthIncrease(arr));
});


const calculateDepthIncrease = function (input) {
  let count = 0;
  let previousWindow = input[0] + input[1] + input[2];
  for (let i = 1; i < input.length; i++) {
    // no more windows
    if (input[i + 2] == undefined) {
      break;
    }
    let currentWindow = input[i] + input[i + 1] + input[i + 2];
    if (currentWindow > previousWindow) count++;
    previousWindow = currentWindow;
  }
  return count;
}