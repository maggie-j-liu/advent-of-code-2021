import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");

const arr = lines.map((line) => line.split("").map((char) => parseInt(char)));
let di = [-1, 0, 1, 0];
let dj = [0, 1, 0, -1];

const inBounds = (i, j) =>
  i >= 0 && i < arr.length && j >= 0 && j < arr[0].length;

const basinSize = (i, j) => {
  let q = [];
  q.push([i, j]);
  let vis = new Array(arr.length);
  for (let i = 0; i < vis.length; i++) {
    vis[i] = new Array(arr[0].length).fill(false);
  }
  let sz = 1;
  while (q.length) {
    let [ci, cj] = q.shift();
    for (let d = 0; d < 4; d++) {
      let ni = ci + di[d];
      let nj = cj + dj[d];
      if (
        inBounds(ni, nj) &&
        arr[ni][nj] != 9 && // read carefully :(
        arr[ni][nj] > arr[ci][cj] &&
        !vis[ni][nj]
      ) {
        q.push([ni, nj]);
        vis[ni][nj] = true;
        sz++;
      }
    }
  }
  return sz;
};
let part1 = 0;
let szs = [];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    let min = 10;
    for (let d = 0; d < 4; d++) {
      if (inBounds(i + di[d], j + dj[d])) {
        min = Math.min(min, arr[i + di[d]][j + dj[d]]);
      }
    }
    if (arr[i][j] < min) {
      part1 += arr[i][j] + 1;
      szs.push(basinSize(i, j));
    }
  }
}
szs.sort((a, b) => b - a);

// part 1
console.log(part1);
// part 2
console.log(szs[0] * szs[1] * szs[2]);
