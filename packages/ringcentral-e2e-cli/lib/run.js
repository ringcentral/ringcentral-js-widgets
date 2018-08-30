import runner from '../src/runner.js';

const DEFAULT_CONFIG_FILE_PATH = './e2e.config.js';

export default (dir, cmd) => {
  if (dir) {
    let args;
    try {
      args = cmd.tags ? JSON.parse(`{"tags": ${cmd.tags}}`) : {};
    } catch (e) {
      console.error('Error tags parameters format');
      process.exit();
    }
    args.path = dir;
    // eslint-disable-next-line
    const configPath = require('path').resolve(process.cwd(), DEFAULT_CONFIG_FILE_PATH);
    // eslint-disable-next-line
    const config = require(configPath);
    const testRegex = args.path;
    const testParams = {
      // TODO for jest ?
      inputTesterConfig: {
        verbose: true,
        // testMatch: ['<rootDir>/src/features/**/*.js'],
        testRegex,
      },
      options: [],
      drivers: [
        // 'enzyme',
        'puppeteer',
        'seleniumWebdriverFirefox',
        'seleniumWebdriverChrome',
        'seleniumWebdriverSafari'
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
    runner(testParams, { exit });
  }
};
