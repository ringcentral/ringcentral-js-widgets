import { resolve } from 'path';
import runner from '../src/runner.js';
import { isNil } from '../src/utils/checkType';

const DEFAULT_CONFIG_FILE_PATH = './e2e.config.js';
const DEFAULT_ROOT = '<rootDir>';
const DEFAULT_TEST_MATCH = '**/?(*.)+(spec|test).js?(x)';
const configPath = resolve(process.cwd(), DEFAULT_CONFIG_FILE_PATH);

function getArgs(dir, cmd) {
  let args;
  try {
    args = cmd.params ? JSON.parse(`{"params": ${cmd.params}}`) : {};
  } catch (e) {
    console.error('Unexpected params parameters format.');
    process.exit();
  }
  args.paths = dir;
  return args;
}

function getTestMatch(args) {
  return (
    args.paths.length > 0 ?
      args.paths.map((path) => {
        const isFile = (/.js$/).test(path);
        if (!isFile) {
          path = `${path}/**/*.js`;
        }
        return `${DEFAULT_ROOT}/${path.replace(/^\.\//, '')}`;
      }) :
      [`${DEFAULT_ROOT}/${DEFAULT_TEST_MATCH}`]
  );
}


const run = async (dir, cmd) => {
  const isRelativePath = (/^.\/|^..\//).test(cmd.params);
  const isResolvePath = (/^\//).test(cmd.params);
  if (isRelativePath || isResolvePath) {
    try {
      if (isRelativePath) {
        try {
          cmd.params = resolve(process.cwd(), cmd.params);
        } catch (error) {
          throw new Error(error);
        }
      }
      cmd.params = JSON.stringify(require(cmd.params));
    } catch (e) {
      console.error(e);
    }
  }

  if (isNil(dir)) {
    console.error('Unexpected parameters format.');
    process.exit();
    return;
  }
  const args = getArgs(dir, cmd);
  let config;
  try {
    // eslint-disable-next-line
    config = require(configPath);
  } catch (error) {
    console.error(`Unexpected import '${DEFAULT_CONFIG_FILE_PATH}' in root path.`);
    console.error(error);
    process.exit();
    return;
  }
  const testMatch = getTestMatch(args);
  const modes = [
    ...cmd.sandbox ? ['sandbox'] : [],
    ...cmd.debugger ? ['debugger'] : [],
    ...cmd.headless ? ['headless'] : [],
  ];
  const drivers = cmd.drivers || [];
  const reporter = cmd.reporter || false;
  const verbose = cmd.verbose || false;
  const params = args.params || {};
  const testPathIgnorePatterns = cmd.exclude || [];
  const testerCLI = cmd.testerCLI || [];
  const testerParams = {
    reporter,
    verbose,
    testMatch,
    testPathIgnorePatterns,
  };
  const testParams = {
    testerParams,
    testerCLI,
    modes,
    drivers,
    params,
    config,
  };
  const exit = () => {
    process.exit();
  };
  runner(testParams, {
    exit
  });
};

export {
  run as default,
  configPath
};
