#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');
const { writeTscFailToReport } = require('./writeTscFailToReport');

const args = process.argv.slice(2);
const __CI__ = args.includes('--ci');
const onlyFailures = args.includes('--only-failures');
const currentDir = process.cwd();
const rootDir = path.resolve(__dirname, '../../../');
const {
  testPaths = ['.'],
  testMaxWorkers,
  scripts,
  name,
} = fs.readJsonSync('package.json');
const projectPaths = testPaths
  .map((testPath) => path.relative(rootDir, path.resolve(currentDir, testPath)))
  .join(' ');

// * the coverage will be generated only inside the current run script dir.
// * so must switch to root for get correct coverage data.
process.chdir(rootDir);

const outputResult = __CI__
  ? `--json --outputFile=${currentDir}/jest-result.json`
  : '';

const argv = (
  args.includes('--projects') ? args : args.concat(['--projects', projectPaths])
)
  .concat([outputResult])
  .join(' ');

if (process.env.DEBUG?.split(',').includes('preview')) {
  execa
    .command(`yarn jest-preview`, {
      stdio: 'inherit',
    })
    .finally(() => {
      process.exit();
    });
}
const workerArgv = __CI__
  ? testMaxWorkers
    ? ` --maxWorkers=${testMaxWorkers}`
    : ' --maxWorkers=4'
  : '';
const command = `yarn jest ${workerArgv} ${argv}`;

// in ci use sync run for get error
if (__CI__) {
  // in CI will also check tsc if there have tsc-check script
  // also when --only-failures, not run tsc-check anymore
  if (!onlyFailures && scripts?.['tsc-check']) {
    try {
      // eslint-disable-next-line no-console
      console.log('🧪 tsc-check starting...');
      execa.commandSync('yarn tsc-check', {
        cwd: currentDir,
      });
    } catch (error) {
      // write error to html-report jest-report.html for we can view error at CI

      writeTscFailToReport({
        name,
        currentDir,
        error,
      });

      throw error;
    }
  }

  // in ci, build idb for ensure brand-config is built
  // eslint-disable-next-line no-console
  console.log('🧪 build brand-config for test starting...');

  execa.commandSync(
    'yarn nx run @ringcentral-integration/internal-mock:buildIDB',
  );

  execa.commandSync(command, {
    stdio: 'inherit',
    env: {
      ...process.env,
      // when be ci, also use debug mode to should debug log
      DEBUG: 'log',
      DEBUG_HIDE_DATE: 'true',
    },
  });
} else {
  execa
    .command(command, {
      stdio: 'inherit',
      env: {
        ...process.env,
        EXEC_ROOT_DIR: currentDir,
      },
    })
    .finally(() => {
      process.exit();
    });
}
