import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
let [_, __, xbounds, ybounds] = input.split(" ");
xbounds = xbounds.slice(2).replace(",", "").split("..").map(Number);
ybounds = ybounds
  .slice(2)
  .split("..")
  .map(Number)
  .sort((a, b) => a - b);

const inbounds = (x, y) => {
  return (
    x >= xbounds[0] && x <= xbounds[1] && y >= ybounds[0] && y <= ybounds[1]
  );
};
const simulate = (vx, vy) => {
  let highest = 0;
  let x = 0;
  let y = 0;
  let max = 1000;
  let count = 0;
  while (!(x > xbounds[1])) {
    if (inbounds(x, y)) {
      return highest;
    }
    x += vx;
    y += vy;
    highest = Math.max(highest, y);
    if (vx != 0) {
      vx -= vx / Math.abs(vx);
    }
    vy--;
    count++;
    if (count > max) return -1;
  }
  return -1;
};

let best = 0;
let cnt = 0;
for (let vx = 0; vx <= xbounds[1]; vx++) {
  for (let vy = ybounds[0] - 2000; vy < Math.abs(ybounds[0] + 2000); vy++) {
    let h = simulate(vx, vy);
    if (h != -1) {
      best = Math.max(best, h);
      cnt++;
    }
  }
}

// part 1
console.log(best);

// part 2
console.log(cnt);
