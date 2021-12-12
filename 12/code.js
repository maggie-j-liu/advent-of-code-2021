import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");
const inp = lines.map((line) => line.split("-"));
let adj = {};
for (const [start, end] of inp) {
  if (!adj[start]) adj[start] = [];
  if (!adj[end]) adj[end] = [];
  adj[start].push(end);
  adj[end].push(start);
}
let vis = {};
let all = new Set();
let path = [];
let special;
const dfs = (curr) => {
  if (curr === "end") {
    all.add(path.join(","));
    return;
  }
  if (curr.toLowerCase() === curr) {
    if (curr === special) {
      if (vis[curr] === 2) return;
      vis[curr] = vis[curr] ? 2 : 1;
    } else {
      if (vis[curr]) return;
      vis[curr] = true;
    }
  }
  path.push(curr);
  if (adj[curr]) {
    for (const nxt of adj[curr]) {
      dfs(nxt);
    }
  }
  path.pop(curr);
  if (curr === special) {
    vis[curr]--;
  } else {
    vis[curr] = false;
  }
};
special = "";
dfs("start");
// part 1
console.log(all.size);
all.clear();
for (let place of Object.keys(adj)) {
  if (place === place.toLowerCase() && place !== "start" && place !== "end") {
    special = place;
    path = [];
    dfs("start");
  }
}
console.log(all.size);
