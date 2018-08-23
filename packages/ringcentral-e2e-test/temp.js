import runner from './src/runner';

runner({
  inputTesterConfig: {
    // testMatch: ['<rootDir>/packages/ringcentral-e2e-test/src/features/**/*.js'],
    testRegex: './packages/ringcentral-e2e-test/src/features/widgets/meeting/ScheduleMeeting.spec.js',
  },
  options: [],
  webdrivers: [
    'enzyme',
    'puppeteer',
    'seleniumWebdriverFirefox',
    'seleniumWebdriverSafari',
    // 'seleniumWebdriverChrome',
    // 'seleniumWebdriverIE',
    // 'seleniumWebdriverEdge',
  ],
  tags: [
    [
      'widgets',
      {
        brands: [
          'rc'
        ],
      }
    ]
  ],
});
