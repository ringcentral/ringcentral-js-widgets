#!/usr/bin/env babel-node

import commander from 'commander';
import info from '../package';
import run from '../lib/run';

commander
  .version(info.version)
  .usage('<command> [options]');

commander
  .command('run <file-path>')
  .description('Run E2E test case.')
  .option('-t, --tags <tagsInfo>', 'Run E2E test case with some tags filtering.')
  .action((run));

commander.parse(process.argv);

if (!commander.args.length) {
  commander.help();
}
