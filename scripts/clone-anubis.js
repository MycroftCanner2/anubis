#!/usr/bin/env node
const { execSync } = require('child_process');
const repo = 'https://github.com/TecharoHQ/anubis';
const target = '/anubis';
try {
  execSync(`git clone ${repo} ${target}`, { stdio: 'inherit' });
} catch (err) {
  console.error('Failed to clone repo:', err.message);
  process.exit(1);
}
