#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');
const { exitWithChildResult } = require('./exitWithChildResult');
const { writeTscFailToReport } = require('./writeTscFailToReport');

const args = process.argv.slice(2);
const __CI__ = args.includes('--ci');
const onlyFailures = args.includes('--only-failures');
const currentDir = process.cwd();
const rootDir = path.resolve(__dirname, '../../../');
const isPreviewMode =
  process.env.PREVIEW === 'true' ||
  process.env.DEBUG?.split(',').includes('preview');
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
const passWithNoTests =
  __CI__ && args.some((arg) => arg.startsWith('--shard'))
    ? '--passWithNoTests'
    : '';

const stripMaxWorkersArgs = (argv) => {
  const result = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--maxWorkers') {
      index += 1;
      continue;
    }

    if (arg.startsWith('--maxWorkers=')) {
      continue;
    }

    result.push(arg);
  }

  return result;
};

const rawArgv = (
  args.includes('--projects') ? args : args.concat(['--projects', projectPaths])
).concat([outputResult, passWithNoTests]);
const argv = (__CI__ && testMaxWorkers ? stripMaxWorkersArgs(rawArgv) : rawArgv)
  .filter(Boolean)
  .join(' ');

const getJestEnv = (extraEnv = {}) => {
  const debugValues = new Set(
    `${process.env.DEBUG || ''},${extraEnv.DEBUG || ''}`
      .split(',')
      .filter(Boolean),
  );
  if (isPreviewMode) {
    debugValues.add('preview');
  }
  const DEBUG = Array.from(debugValues).join(',');
  return {
    ...process.env,
    ...extraEnv,
    ...(DEBUG ? { DEBUG } : {}),
  };
};

if (isPreviewMode) {
  exitWithChildResult(
    execa.command(`yarn jest-preview`, {
      stdio: 'inherit',
    }),
  );
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
    env: getJestEnv({
      // when be ci, also use debug mode to should debug log
      DEBUG: 'log',
      DEBUG_HIDE_DATE: 'true',
    }),
  });
} else {
  exitWithChildResult(
    execa.command(command, {
      stdio: 'inherit',
      env: getJestEnv({
        EXEC_ROOT_DIR: currentDir,
      }),
    }),
  );
}
