import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n").map((line) => parseInt(line));
const countIncrease = (arr) => {
  let cnt = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      cnt++;
    }
  }
  return cnt;
};
// part 1
console.log(countIncrease(lines));

const WINDOW = 3;
let sums = [];
for (let i = WINDOW - 1; i < lines.length; i++) {
  let sum = 0;
  for (let j = 0; j < WINDOW; j++) {
    sum += lines[i - j];
  }
  sums.push(sum);
}

// part 2
console.log(countIncrease(sums));
