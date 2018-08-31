import runner from '../src/runner.js';
import { isNil } from '../src/utils/checkType';

const DEFAULT_CONFIG_FILE_PATH = './e2e.config.js';

function getArgs(dir, cmd) {
  let args;
  try {
    args = cmd.tags ? JSON.parse(`{"tags": ${cmd.tags}}`) : {};
  } catch (e) {
    console.error('Error tags parameters format');
    process.exit();
  }
  args.path = dir;
  return args;
}

export default (dir, cmd) => {
  if (isNil(dir)) {
    console.error('Error tags parameters format');
    process.exit();
    return;
  }
  const args = getArgs(dir, cmd);
  // eslint-disable-next-line
  const configPath = require('path').resolve(process.cwd(), DEFAULT_CONFIG_FILE_PATH);
  // eslint-disable-next-line
  const config = require(configPath);
  const testRegex = args.path;
  const testParams = {
    // TODO for jest ?
    inputTesterConfig: {
      verbose: true,
      testMatch: ['<rootDir>/src/features/**/*.js'],
      // testRegex,
    },
    options: [],
    // modes: ['sandbox'],
    drivers: [
      // 'enzyme',
      'puppeteer',
      // 'seleniumWebdriverFirefox',
      // 'seleniumWebdriverChrome',
      // 'seleniumWebdriverSafari'
      // 'seleniumWebdriverIE',
      // 'seleniumWebdriverEdge',
    ],
    tags: [
      args.tags,
      // [
      //   'widgets',
      //   {
      //     brands: [
      //       'rc'
      //     ],
      //   }
      // ]
    ],
  };
  const exit = () => {
    process.exit();
  };
  runner(testParams, {
    exit
  });
};
