#!/usr/bin/env -S node --experimental-strip-types

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

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [n >> 16, (n >> 8) & 0xff, n & 0xff];
}

function ansiBg(r: number, g: number, b: number): string {
  return `\x1b[48;2;${r};${g};${b}m`;
}
const white = "\x1b[97m";
const reset = "\x1b[0m";

const COLS = process.stdout.columns || 80;
const digitsPerRow = Math.max(1, Math.floor(COLS / 2));

let line = "";
pies.forEach((val, index) => {
  const [r, g, b] = hexToRgb(COLORS[val]!);
  line += ansiBg(r, g, b) + white + val + reset;
  if ((index + 1) % digitsPerRow === 0) {
    process.stdout.write(line + "\n");
    line = "";
  }
});
if (line) process.stdout.write(line + "\n");
