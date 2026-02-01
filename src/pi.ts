import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const digitsPath = join(__dirname, "..", "data", "pi.txt");
const digits = readFileSync(digitsPath, "utf-8").trim();

export const pies: string[] = digits.split("");
