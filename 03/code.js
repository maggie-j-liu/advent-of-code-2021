import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");
const sz = lines[0].length;

let gamma = "";
let epsilon = "";
for (let i = 0; i < sz; i++) {
  let ones = 0;
  let zeros = 0;
  for (const val of lines) {
    val[i] === "1" ? ones++ : zeros++;
  }
  if (ones > zeros) {
    gamma += "1";
    epsilon += "0";
  } else {
    gamma += "0";
    epsilon += "1";
  }
}

// part 1
console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));

let oxygen = lines;
let scrubber = lines;
for (let i = 0; i < sz; i++) {
  if (oxygen.length == 1) break;
  let ones = [];
  let zeros = [];
  for (const val of oxygen) {
    (val[i] === "1" ? ones : zeros).push(val);
  }
  oxygen = ones.length >= zeros.length ? ones : zeros;
}
for (let i = 0; i < sz; i++) {
  if (scrubber.length == 1) break;
  let ones = [];
  let zeros = [];
  for (const val of scrubber) {
    (val[i] === "1" ? ones : zeros).push(val);
  }
  scrubber = zeros.length <= ones.length ? zeros : ones;
}

// part 2
console.log(parseInt(oxygen[0], 2) * parseInt(scrubber[0], 2));
