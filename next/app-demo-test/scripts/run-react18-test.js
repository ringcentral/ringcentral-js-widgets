#!/usr/bin/env node

const { spawnSync } = require('child_process');

const nodeOptions = process.env.NODE_OPTIONS || '';
const heapOption = '--max-old-space-size=12288';
const env = {
  ...process.env,
  COMMON: 'true',
  NODE_OPTIONS: nodeOptions.includes('--max-old-space-size')
    ? nodeOptions
    : `${nodeOptions} ${heapOption}`.trim(),
};

const result = spawnSync('yarn', ['run-test', ...process.argv.slice(2)], {
  env,
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status || 0);
