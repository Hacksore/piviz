#!/usr/bin/env -S node

/**
 * Fetches pi digits from pi2e.ch and writes to data/pi.txt.
 * Uses the 1 million digit file; strip leading "3." so format matches our expected "14159...".
 *
 * @see https://pi2e.ch/blog/2017/03/10/pi-digits-download/
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "..", "data");
const outPath = join(dataDir, "pi.txt");

const PI2E_1M =
  "https://pi2e.ch/blog/wp-content/uploads/2017/03/pi_dec_1m.txt";

async function main(): Promise<void> {
  console.log("Fetching pi digits from pi2e.ch (1M digits)...");
  const res = await fetch(PI2E_1M);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  let text = (await res.text()).trim();
  if (text.startsWith("3.")) text = text.slice(2);
  const digitsOnly = text.replace(/\D/g, "");
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(outPath, digitsOnly, "utf-8");
  console.log(`Wrote ${digitsOnly.length.toLocaleString()} digits to data/pi.txt`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
