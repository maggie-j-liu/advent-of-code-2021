import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const fish = input.split(",").map((x) => parseInt(x));

const solve = (days) => {
  let fish_cnt = new Array(9).fill(0);
  for (let i = 0; i < fish.length; i++) {
    fish_cnt[fish[i]]++;
  }
  for (let i = 0; i < days; i++) {
    const new_cnt = new Array(9).fill(0);
    for (let j = 0; j < fish_cnt.length; j++) {
      if (j === 0) {
        new_cnt[6] += fish_cnt[j];
        new_cnt[8] += fish_cnt[j];
      } else {
        new_cnt[j - 1] += fish_cnt[j];
      }
    }
    fish_cnt = new_cnt;
  }
  let ans = 0;
  for (let i = 0; i <= 8; i++) {
    ans += fish_cnt[i];
  }
  return ans;
};

// part 1
console.log(solve(80));

// part 2
console.log(solve(256));
