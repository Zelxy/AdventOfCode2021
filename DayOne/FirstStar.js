const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

let instream = fs.createReadStream('input.txt');
let outstream = new stream;
let rl = readline.createInterface(instream, outstream);

let arr = [];

rl.on('line', function(line) {
  arr.push(Number(line));
});

rl.on('close', function() {
  console.log("Total is", calculateDepthIncrease(arr));
});


const calculateDepthIncrease = function (input) {
    let count = 0;
    for(let i = 1; i < input.length; i++){
        if(input[i] > input[i-1]) count++;
    }
    return count;
}