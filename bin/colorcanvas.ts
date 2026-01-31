#!/usr/bin/env -S node --experimental-strip-types

import ansiStyles from "ansi-styles";
import { pies } from "../pi.ts";

process.stdout.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code !== "EPIPE") throw err;
});

const COLORS: Record<string, string> = {
  0: "#702982",
  1: "#4235B1",
  2: "#4566C8",
  3: "#5B90BB",
  4: "#73AA9A",
  5: "#84BA6F",
  6: "#A9BD53",
  7: "#CEB441",
  8: "#E39837",
  9: "#E56330",
};

const COLS = 200;
const digitsPerRow = Math.max(1, Math.floor(COLS / 2));
const reset = ansiStyles.modifier.reset.close;
const white = ansiStyles.color.ansi16m(255, 255, 255);

let line = "";
pies.forEach((val, i) => {
  const hex = COLORS[val];
  if (hex) {
    const [r, g, b] = ansiStyles.hexToRgb(hex);
    const bg = ansiStyles.bgColor.ansi16m(r, g, b);
    line += `${bg}${white}${val}${reset}`;
  } else {
    line += val;
  }
  if ((i + 1) % digitsPerRow === 0) {
    process.stdout.write(`${line}\n`);
    line = "";
  }
});
if (line) process.stdout.write(`${line}\n`);
