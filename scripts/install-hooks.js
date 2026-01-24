const { execFileSync } = require("node:child_process");
const { existsSync } = require("node:fs");
const { join } = require("node:path");

const hooksDir = join(process.cwd(), ".githooks");

if (!existsSync(hooksDir)) {
  console.warn("No .githooks directory found; skipping hook install.");
  process.exit(0);
}

try {
  execFileSync("git", ["config", "core.hooksPath", ".githooks"], {
    stdio: "ignore",
  });
} catch (error) {
  console.warn("Unable to configure git hooks:", error.message);
}
