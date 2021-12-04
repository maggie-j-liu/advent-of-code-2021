import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n\n");
let [nums, ...boardInput] = lines;
nums = nums.split(",");
const boards = [];
const marks = [];
const won = [];
let won_cnt = 0;
for (const board of boardInput) {
  const boardLines = board.split("\n");
  boards.push([]);
  marks.push([]);
  for (const line of boardLines) {
    const splitted = line
      .trim()
      .split(/ +/)
      .map((x) => parseInt(x));
    boards[boards.length - 1].push(splitted);
    marks[marks.length - 1].push([]);
    for (let i = 0; i < splitted.length; i++) {
      marks[marks.length - 1][marks[marks.length - 1].length - 1].push(false);
    }
  }
  won.push(false);
}

const mark = (idx, num) => {
  for (let i = 0; i < boards[idx].length; i++) {
    for (let j = 0; j < boards[idx].length; j++) {
      if (boards[idx][i][j] == num) {
        marks[idx][i][j] = true;
      }
    }
  }
};

const isWin = (idx) => {
  const n = boards[idx].length;
  for (let i = 0; i < n; i++) {
    let good1 = true;
    let good2 = true;
    for (let j = 0; j < n; j++) {
      good1 = good1 && marks[idx][i][j];
      good2 = good2 && marks[idx][j][i];
    }
    if (good1 || good2) return true;
  }
  return false;
};

const getAnswer = (idx, num) => {
  let sum = 0;
  for (let j = 0; j < boards[idx].length; j++) {
    for (let k = 0; k < boards[idx].length; k++) {
      if (!marks[idx][j][k]) {
        sum += boards[idx][j][k];
      }
    }
  }
  console.log(sum * num);
};

for (const num of nums) {
  let found = false;
  for (let i = 0; i < boards.length; i++) {
    mark(i, num);
    if (isWin(i)) {
      if (!won[i]) {
        won[i] = true;
        won_cnt++;
        if (won_cnt == 1) {
          // part 1
          getAnswer(i, num);
        }
        if (won_cnt == boards.length) {
          // part 2
          getAnswer(i, num);
          found = true;
          break;
        }
      }
    }
  }
  if (found) break;
}
