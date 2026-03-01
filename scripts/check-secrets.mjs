import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const secretPatterns = [
  /AKIA[0-9A-Z]{16}/g,
  /ASIA[0-9A-Z]{16}/g,
  /aws_secret_access_key\s*=\s*["']?[A-Za-z0-9/+=]{20,}["']?/gi,
  /-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----/g,
  /xox[baprs]-[A-Za-z0-9-]{10,}/g
];

const ignoredPrefixes = ['node_modules/', '.next/', 'dist/', '.git/'];
const ignoredNames = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock']);

function getStagedFiles() {
  const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' }).trim();
  if (!output) return [];
  return output.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function isIgnored(filePath) {
  if (ignoredNames.has(path.basename(filePath))) return true;
  return ignoredPrefixes.some((prefix) => filePath.startsWith(prefix));
}

function scanFile(filePath) {
  const absolutePath = path.join(rootDir, filePath);
  if (!fs.existsSync(absolutePath)) return [];

  const content = fs.readFileSync(absolutePath, 'utf8');
  const findings = [];
  for (const pattern of secretPatterns) {
    const matches = content.match(pattern);
    if (matches?.length) {
      findings.push(...matches.slice(0, 3));
    }
  }
  return findings;
}

const stagedFiles = getStagedFiles().filter((filePath) => !isIgnored(filePath));
const problems = [];

for (const filePath of stagedFiles) {
  const findings = scanFile(filePath);
  if (findings.length > 0) {
    problems.push({ filePath, findings });
  }
}

if (problems.length > 0) {
  console.error('Secret scan failed. Potential credentials detected in staged files:');
  for (const problem of problems) {
    console.error(`- ${problem.filePath}`);
  }
  process.exit(1);
}

console.log('Secret scan passed.');
