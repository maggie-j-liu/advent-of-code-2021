import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");
const open = "[({<";
const close = "])}>";
const pts1 = [57, 3, 1197, 25137];
const pts2 = [2, 1, 3, 4];
let ans1 = 0;
let ans2 = [];
for (const line of lines) {
  let stack = [];
  let bad = false;
  for (const c of line) {
    if (open.includes(c)) {
      stack.push(c);
    } else if (
      stack.length &&
      stack[stack.length - 1] == open[close.indexOf(c)]
    ) {
      stack.pop();
    } else {
      ans1 += pts1[close.indexOf(c)];
      bad = true;
      break;
    }
  }
  if (bad) continue;
  let score = 0;
  for (const c of stack.reverse()) {
    score *= 5;
    score += pts2[open.indexOf(c)];
  }
  ans2.push(score);
}
ans2.sort((a, b) => a - b);

// part 1
console.log(ans1);
// part 2
console.log(ans2[Math.floor(ans2.length / 2)]);
