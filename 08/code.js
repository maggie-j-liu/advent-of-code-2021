import getInput from "../utils/getInput.js";

const input = await getInput(import.meta.url);
const lines = input.split("\n");

const part1 = () => {
  const ans = lines.reduce(
    (acc, line) =>
      acc +
      line
        .split("|")[1]
        .trim()
        .split(" ")
        .reduce(
          (acc2, word) =>
            [2, 4, 3, 7].includes(word.length) ? acc2 + 1 : acc2,
          0
        ),
    0
  );
  console.log(ans);
};

const part2 = () => {
  let ans = 0;
  const nums = [
    "abcefg",
    "cf",
    "acdeg",
    "acdfg",
    "bcdf",
    "abdfg",
    "abdefg",
    "acf",
    "abcdefg",
    "abcdfg",
  ];

  for (const line of lines) {
    let parts = line.split("|");
    let numbers = parts[0].trim().split(" ");
    numbers = numbers.sort((a, b) => a.length - b.length);

    let map = {};
    const a = numbers[1].split("").find((c) => !numbers[0].includes(c));
    map[a] = "a";

    let cnt = {};
    for (const word of numbers) {
      for (const c of word) {
        cnt[c] = cnt[c] ? cnt[c] + 1 : 1;
      }
    }

    for (const [key, val] of Object.entries(cnt)) {
      if (val === 8 && !map[key]) {
        map[key] = "c";
      } else if (val === 6) {
        map[key] = "b";
      } else if (val === 4) {
        map[key] = "e";
      } else if (val === 9) {
        map[key] = "f";
      }
    }

    const four = numbers.find((number) => number.length === 4);
    const d = four.split("").find((c) => !map[c]);
    map[d] = "d";

    const g = "abcdefg".split("").find((c) => !map[c]);
    map[g] = "g";

    let second = parts[1].trim().split(" ");
    let res = 0;
    for (let i = 0; i < second.length; i++) {
      let word = second[i]
        .split("")
        .map((char) => map[char])
        .sort()
        .join("");
      res += nums.indexOf(word) * Math.pow(10, second.length - i - 1);
    }
    ans += res;
  }
  console.log(ans);
};

part1();
part2();
