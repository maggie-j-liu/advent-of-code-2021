import getInput from "../utils/getInput.js";
const input = await getInput(import.meta.url);
const lines = input.split("\n");

const explode = (line, idx) => {
  line = line.split("");

  let endIdx = idx;
  for (let i = idx + 1; i < line.length; i++) {
    if (line[i] === "]") {
      endIdx = i;
      break;
    }
  }

  const secondNumStart = line.indexOf(",", idx);
  const secondNumEnd = line.indexOf("]", idx);
  let toReplace = [];
  for (let i = idx - 1; i >= 0; i--) {
    if (!isNaN(Number(line[i]))) {
      let num = "";
      let j = i;
      while (j >= 0 && !isNaN(Number(line[j]))) {
        num = line[j] + num;
        j--;
      }
      toReplace.push([
        j + 1,
        i - j,
        (
          parseInt(num) + parseInt(line.slice(idx + 1, secondNumStart).join(""))
        ).toString(),
      ]);
      break;
    }
  }

  toReplace.push([idx, endIdx + 1 - idx, "0"]);

  for (let i = secondNumEnd + 1; i < line.length; i++) {
    if (!isNaN(Number(line[i]))) {
      let num = "";
      let j = i;
      while (j < line.length && !isNaN(Number(line[j]))) {
        num += line[j];
        j++;
      }
      toReplace.push([
        i,
        j - i,
        (
          parseInt(num) +
          parseInt(line.slice(secondNumStart + 1, secondNumEnd).join(""))
        ).toString(),
      ]);
      break;
    }
  }
  for (let i = toReplace.length - 1; i >= 0; i--) {
    line.splice(...toReplace[i]);
  }

  line = line.join("");
  return line;
};

const split = (line, idx) => {
  let num = "";
  let finalIdx = idx;
  for (let i = idx; i < line.length; i++) {
    if (!isNaN(Number(line[i]))) {
      num += line[i];
      finalIdx = i;
    } else {
      break;
    }
  }
  num = parseInt(num);
  let left = Math.floor(num / 2).toString();
  let right = Math.ceil(num / 2).toString();

  line =
    line.substring(0, idx) +
    "[" +
    left +
    "," +
    right +
    "]" +
    line.substring(finalIdx + 1);
  return line;
};
const parseList = (line) => {
  if (line.length === 1) {
    return parseInt(line);
  }
  let list = [];
  let start = 0;
  let end = 0;
  let idx = 1;
  let level = 1;
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 1; i < line.length - 1; i++) {
      const char = line[i];
      if (char == "[") {
        level++;
      } else if (char == "]") {
        level--;
      }
      if (level > 4) {
        changed = true;
        line = explode(line, i);
        level = 1;
        break;
      }
    }
    if (changed) continue;
    for (let i = 0; i < line.length; i++) {
      let num = "";
      for (let j = i; j < line.length; j++) {
        if (!isNaN(Number(line[j]))) {
          num += line[j];
        } else {
          break;
        }
      }
      if (num.length > 0 && parseInt(num) >= 10) {
        changed = true;
        line = split(line, i);
        break;
      }
    }
  }
  return line;
};

const recurse = (line) => {
  if (line.length === 1) {
    return parseInt(line);
  }
  let list = [];
  let start = 0;
  let end = 0;
  let idx = 1;
  let level = 1;
  for (let i = 1; i < line.length - 1; i++) {
    const char = line[i];
    if (char == "[") {
      start++;
      level++;
    } else if (char == "]") {
      end++;
      level--;
    } else if (char === "," && start === end) {
      list.push(recurse(line.substring(idx, i)));
      idx = i + 1;
      start = 0;
      end = 0;
    }
  }

  list.push(recurse(line.substring(idx, line.length - 1)));

  return 3 * list[0] + 2 * list[1];
};

const part1 = () => {
  let res = lines[0];
  for (let i = 1; i < lines.length; i++) {
    let newLine = `[${res},${lines[i]}]`;
    res = parseList(newLine);
  }
  console.log(recurse(res));
};

const part2 = () => {
  let ans = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (i == j) continue;
      let newLine = `[${lines[i]},${lines[j]}]`;
      let res = parseList(newLine);
      ans = Math.max(ans, recurse(res));
    }
  }
  console.log(ans);
};

part1();
part2();
