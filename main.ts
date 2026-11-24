// Ship It Friday
// One line (83 code points): the git commit message an AI coding agent writes
// moments before breaking production on a Friday. The joke is the checklist
// of everything it skipped: tests, rollback plan, better judgment.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const headline = "feat: ship it Friday";
const skipped = [
  "the tests",
  "the rollback plan",
  "my better judgment",
];
const line = `${headline} — skipped ${skipped.slice(0, -1).join(", ")}, and ${skipped.at(-1)}`;

mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "entry.txt"), line + "\n", "utf8");

// Read-back check: the file must hold exactly the line we meant to write.
import { readFileSync } from "node:fs";
const written = readFileSync(join(targetDir, "entry.txt"), "utf8").trimEnd();
if (written !== line) {
  throw new Error(`read-back mismatch: wrote ${JSON.stringify(written)}`);
}
console.log(`entry.txt OK (${[...line].length} code points)`);
