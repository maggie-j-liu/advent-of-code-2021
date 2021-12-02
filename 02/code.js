import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");
let pos = 0;
let depth = 0;
let aim = 0;
for (let line of lines) {
  line = line.split(" ");
  const dir = line[0];
  const inc = parseInt(line[1]);
  if (dir == "forward") {
    pos += inc;
    depth += inc * aim;
  } else if (dir == "down") {
    aim += inc;
  } else {
    aim -= inc;
  }
}

// part 1
console.log(pos * aim);

// part 2
console.log(pos * depth);
