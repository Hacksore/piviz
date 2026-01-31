#!/usr/bin/env -S node --experimental-strip-types

import ansiStyles from "ansi-styles";
import convert from "color-convert";
import { pies } from "../pi.ts";

process.stdout.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code !== "EPIPE") throw err;
});

const HUE_STEP = 360 / 10;
const SATURATION = 65;
const VALUE = 96;

const COLORS: Record<string, string> = Object.fromEntries(
  Array.from({ length: 10 }, (_, i) => {
    const hue = (i * HUE_STEP) % 360;
    const hex = convert.hsv.hex(hue, SATURATION, VALUE);
    return [String(i), `#${hex}`];
  })
);

const COLS = process.stdout.columns ?? 80;
const reset = ansiStyles.modifier.reset.close;
// Two chars per block so each "pixel" is 2×1 cells → closer to square on most terminals
const BLOCK_WIDTH = 2;
const digitsPerRow = Math.max(1, Math.floor(COLS / BLOCK_WIDTH));

let line = "";
pies.forEach((val, i) => {
  const hex = COLORS[val];
  if (hex) {
    const [r, g, b] = ansiStyles.hexToRgb(hex);
    const bg = ansiStyles.bgColor.ansi16m(r, g, b);
    const fg = ansiStyles.color.ansi16m(r, g, b);
    line += `${bg}${fg}${"█".repeat(BLOCK_WIDTH)}${reset}`;
  } else {
    line += " ".repeat(BLOCK_WIDTH);
  }
  if ((i + 1) % digitsPerRow === 0) {
    process.stdout.write(`${line}\n`);
    line = "";
  }
});
if (line) process.stdout.write(`${line}\n`);
