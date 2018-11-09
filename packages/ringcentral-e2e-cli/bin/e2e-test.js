#!/usr/bin/env babel-node

import commander from 'commander';
import info from '../package';
import run from '../lib/run';
import fetchCase from '../lib/case';

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
  .option('-E, --exclude <exclude>', 'Run E2E test case exclude some files.', value => value.split(','))
  .option('--drivers <drivers>', 'Run E2E test case with some drivers.', value => value.split('.'))
  .option('--testerCLI <testerCLI>', 'Run E2E test case with testerCLI args.', value => value.split('.'))
  .action((run));

commander
  .command('create')
  .arguments('[caseID]')
  .description('Fetch Case from caseServices.')
  .option('-S, --service <service>', 'Create case template with service params.')
  .option('-N, --serviceName <serviceName>', 'Create case template with service.')
  .option('-C, --caseID <caseID>', 'Create case with caseID.')
  .action((fetchCase));

commander
  .command('update')
  .arguments('[caseID] <env>')
  .description('Update Case from caseServices.')
  .option('-U, --service <service>', 'Update case template with service.')
  .option('-C, --caseID <caseID>', 'Update case with caseID.')
  .action((fetchCase));

commander.parse(process.argv);

if (!commander.args.length) {
  commander.help();
}
