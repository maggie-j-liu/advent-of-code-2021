import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
let positions = input.split(",").map(Number);

const triangle = (n) => (n * (n + 1)) / 2;
let ans1 = 1e9;
let ans2 = 1e9;
for (let pos = 0; pos < Math.max(...positions); pos++) {
  let cost1 = 0;
  let cost2 = 0;
  for (const x of positions) {
    cost1 += Math.abs(pos - x);
    cost2 += triangle(Math.abs(pos - x));
  }
  ans1 = Math.min(ans1, cost1);
  ans2 = Math.min(ans2, cost2);
}

// part 1
console.log(ans1);

// part 2
console.log(ans2);
