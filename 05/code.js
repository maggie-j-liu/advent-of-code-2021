import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");
const n = 1000;
let cnt1 = new Array(n);
let cnt2 = new Array(n);
for (let i = 0; i < n; i++) {
  cnt1[i] = new Array(n).fill(0);
  cnt2[i] = new Array(n).fill(0);
}
for (const line of lines) {
  const [a, _, b] = line.split(" ");
  let [x1, y1] = a.split(",");
  let [x2, y2] = b.split(",");
  x1 = parseInt(x1);
  x2 = parseInt(x2);
  y1 = parseInt(y1);
  y2 = parseInt(y2);
  if (x1 != x2 && y1 != y2 && Math.abs(x1 - x2) != Math.abs(y1 - y2)) continue;
  if (x1 == x2) {
    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
      cnt1[x1][i]++;
      cnt2[x1][i]++;
    }
  } else if (y1 == y2) {
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
      cnt1[i][y1]++;
      cnt2[i][y1]++;
    }
  } else {
    let dx = x2 - x1;
    let dy = y2 - y1;
    for (
      let i = x1, j = y1;
      true;
      i += dx / Math.abs(dx), j += dy / Math.abs(dy)
    ) {
      cnt2[i][j]++;
      if (i == x2) break;
    }
  }
}
let ans1 = 0;
let ans2 = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (cnt1[i][j] >= 2) {
      ans1++;
    }
    if (cnt2[i][j] >= 2) {
      ans2++;
    }
  }
}
// part 1
console.log(ans1);

// part 2
console.log(ans2);
