#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');

const __CI__ = process.argv.includes('--ci');
const currentDir = process.cwd();
const debugMode = process.env.DEBUG;
const rootDir = path.resolve(__dirname, '../../../');
const { testPaths = ['.'] } = fs.readJsonSync('package.json');
const projectPaths = testPaths
  .map((testPath) => path.relative(rootDir, path.resolve(currentDir, testPath)))
  .join(' ');

// * the coverage will be generated only inside the current run script dir.
// * so must switch to root for get correct coverage data.
process.chdir(rootDir);

const outputResult = __CI__
  ? `--json --outputFile=${currentDir}/jest-result.json`
  : '';

const argv = process.argv
  .slice(2)
  .concat(['--projects', projectPaths, outputResult])
  .join(' ');

if (debugMode === 'preview') {
  execa
    .command(`yarn jest-preview`, {
      stdio: 'inherit',
    })
    .finally(() => {
      process.exit();
    });
}
const workerArgv = __CI__ ? ' --maxWorkers=70%' : '';
const command = `yarn jest ${workerArgv} ${argv}`;

// in ci use sync run for get error
if (__CI__) {
  execa.commandSync(command, {
    stdio: 'inherit',
  });
} else {
  execa
    .command(command, {
      stdio: 'inherit',
    })
    .finally(() => {
      process.exit();
    });
}
