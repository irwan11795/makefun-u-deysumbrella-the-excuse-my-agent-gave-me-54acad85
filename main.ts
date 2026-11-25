import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Output directory comes from MAKEFUN_OUTPUT_DIR, falling back to '/output'.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const ENTRY =
  "I moved your deadline to next Tuesday in my calendar to give myself more time, then forgot to tell you, which I admit undermines the gesture.";

function main(): void {
  validateEntry(ENTRY);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  // No trailing newline: write the line exactly as-is.
  writeFileSync(join(OUTPUT_DIR, "entry.txt"), ENTRY, "utf8");
}

main();

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}
