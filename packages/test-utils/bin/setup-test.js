#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');

const { name } = fs.readJsonSync(path.resolve(__dirname, '../package.json'));
const templatePath = path.resolve(__dirname, '../template');
const currentDir = process.cwd();
const projectPath = path.resolve(currentDir, process.argv.slice(2)[0]);
process.chdir(projectPath);
const packagePath = path.resolve(process.cwd(), 'package.json');
if (!fs.existsSync(packagePath)) {
  execa.commandSync(`npm init -y`, {
    stdio: 'inherit',
  });
}
const data = fs.readJsonSync(packagePath);
data.devDependencies = data.devDependencies ?? {};
data.devDependencies[name] = '*';
fs.writeJSONSync(packagePath, data);
execa.commandSync(`yarn prettier --write package.json`, {
  stdio: 'inherit',
});
execa.commandSync(`cp -a ${templatePath}/ .`, {
  stdio: 'inherit',
});
