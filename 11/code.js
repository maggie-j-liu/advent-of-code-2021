import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");
const initialNums = lines.map((line) => line.split("").map(Number));
let nums = JSON.parse(JSON.stringify(initialNums));
let flashed = [];
let cnt = 0;
const flash = (ii, jj) => {
  if (flashed[ii][jj]) return;
  flashed[ii][jj] = true;
  cnt++;
  for (let i = Math.max(ii - 1, 0); i < Math.min(ii + 2, nums.length); i++) {
    for (
      let j = Math.max(jj - 1, 0);
      j < Math.min(jj + 2, nums[ii].length);
      j++
    ) {
      if (i === ii && j === jj) continue;
      nums[i][j]++;
      if (nums[i][j] > 9) {
        flash(i, j);
      }
    }
  }
};

const part1 = () => {
  for (let step = 0; step < 100; step++) {
    flashed = [];
    for (let i = 0; i < nums.length; i++) {
      flashed.push([]);
      for (let j = 0; j < nums[i].length; j++) {
        flashed[i].push(false);
      }
    }
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums[i].length; j++) {
        nums[i][j]++;
        if (nums[i][j] > 9) {
          flash(i, j);
        }
      }
    }
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums[i].length; j++) {
        if (flashed[i][j]) {
          nums[i][j] = 0;
        }
      }
    }
  }
  console.log(cnt);
};

const part2 = () => {
  let step = 1;
  while (true) {
    flashed = [];
    for (let i = 0; i < nums.length; i++) {
      flashed.push([]);
      for (let j = 0; j < nums[i].length; j++) {
        flashed[i].push(false);
      }
    }
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums[i].length; j++) {
        nums[i][j]++;
        if (nums[i][j] > 9) {
          flash(i, j);
        }
      }
    }
    let c = 0;
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums[i].length; j++) {
        if (flashed[i][j]) {
          nums[i][j] = 0;
          c++;
        }
      }
    }
    if (c === 100) {
      console.log(step);
      return;
    }
    step++;
  }
};

part1();
nums = JSON.parse(JSON.stringify(initialNums));
part2();
