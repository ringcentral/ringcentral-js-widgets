#!/usr/bin/env babel-node

import commander from 'commander';
import info from '../package';
import run from '../lib/run';
import { create } from '../lib/fetchCase';

commander
  .version(info.version)
  .usage('<command> [options]');

commander
  .command('run [dir...]')
  .description('Run E2E test specified case.')
  .option('-P, --params <paramsInfo>', 'Run E2E test case with some params filtering.')
  .option('-S, --sandbox', 'Run E2E test case with \'sandbox\' mode.')
  .option('-H, --headless', 'Run E2E test case with \'headless\' mode.')
  .option('-D, --debugger', 'Run E2E test case with \'debugger\' mode.')
  .option('-V, --verbose', 'Run E2E test case with verbose log.')
  .option('-R, --reporter', 'Run E2E test case with reporter.')
  .option('-E, --exclude <exclude>', 'Run E2E test case exclude some files.', value => value.split(','))
  .option('--drivers <drivers>', 'Run E2E test case with some drivers.', value => value.split(','))
  .option('--testerCLI <testerCLI>', 'Run E2E test case with testerCLI args.', value => value.split(','))
  .action((run));

commander
  .command('create')
  .arguments('[caseID]')
  .description('Create Case from caseServices.')
  .option('-S, --service <service>', 'Create case template with those service params.')
  .option('-O, --origin <origin>', 'Create case template with origin.')
  .action((create));

// commander
//   .command('update')
//   .arguments('[caseID]')
//   .description('Update Case from caseServices.')
//   .option('-S, --service <service>', 'Update case template with service params.')
//   .option('-O, --origin <origin>', 'Update case template with origin.')
//   .action((update));

commander.parse(process.argv);

if (!commander.args.length) {
  commander.help();
}
