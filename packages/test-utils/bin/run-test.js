#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');

const currentDir = process.cwd();
const rootDir = path.resolve(__dirname, '../../../');
const { testPaths = ['.'] } = fs.readJsonSync('package.json');
const projectPaths = testPaths
  .map((testPath) => path.relative(rootDir, path.resolve(currentDir, testPath)))
  .join(' ');

process.chdir(rootDir);

const argv = process.argv
  .slice(2)
  .concat(['--projects', projectPaths])
  .join(' ');

execa.commandSync(`yarn jest ${argv}`, {
  stdio: 'inherit',
});
