const { execFileSync } = require("node:child_process");

const allowlist = /(example|sample|changeme|replace|placeholder|\byour[-_]|<your_|YOUR_|REPLACE_|CHANGEME|\bkeywords?\s*[:=]|\bsubject\s*[:=])/i;

const patterns = [
  {
    name: "Private key block",
    regex: /-----BEGIN (?:RSA|DSA|EC|OPENSSH|PRIVATE) KEY-----/,
  },
  {
    name: "Token prefix",
    regex: /\b(?:AKIA|ASIA|ghp_|github_pat_|xox[baprs]-|sk_live_|sk_test_|rk_live_|rk_test_|SG\.[A-Za-z0-9_-]{8,}|AIza)[A-Za-z0-9_\-]{8,}/,
  },
  {
    name: "Secret assignment",
    regex: /\b(?:AWS|SUPABASE|OPENAI|ANTHROPIC|RESEND|STRIPE|SENDGRID|MAILGUN|GITHUB|GITLAB|GOOGLE|FIREBASE|SENTRY|DATADOG|TWILIO)?[A-Z0-9_]*(?:API|TOKEN|SECRET|KEY|PASSWORD|PRIVATE|ACCESS)[A-Z0-9_]*\s*[:=]\s*["'`][^"'`]{16,}["'`]/i,
  },
];

const stagedFilesOutput = execFileSync(
  "git",
  ["diff", "--cached", "--name-only", "--diff-filter=ACMR"],
  { encoding: "utf8" },
);

const stagedFiles = stagedFilesOutput
  .split("\n")
  .map((file) => file.trim())
  .filter(Boolean);

const isBinary = (file) => {
  const numstat = execFileSync(
    "git",
    ["diff", "--cached", "--numstat", "--", file],
    { encoding: "utf8" },
  ).trim();

  if (!numstat) {
    return false;
  }

  const firstField = numstat.split(/\s+/)[0];
  return firstField === "-";
};

const readStagedFile = (file) =>
  execFileSync("git", ["show", `:${file}`], { encoding: "utf8" });

let hasIssues = false;

for (const file of stagedFiles) {
  if (isBinary(file)) {
    continue;
  }

  const content = readStagedFile(file);
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (allowlist.test(line)) {
      return;
    }

    for (const pattern of patterns) {
      if (pattern.regex.test(line)) {
        hasIssues = true;
        console.error(
          `${file}:${index + 1} Potential secret detected (${pattern.name}).`,
        );
        break;
      }
    }
  });
}

if (hasIssues) {
  console.error("Commit aborted: remove or rotate exposed secrets.");
  process.exit(1);
}
