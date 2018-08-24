import runner from './src/runner';

runner({
  inputTesterConfig: {
    verbose: true,
    // testMatch: ['<rootDir>/packages/ringcentral-e2e-test/src/features/**/*.js'],
    testRegex: './packages/ringcentral-e2e-test/src/features/widgets/meeting/ScheduleMeeting.spec.js',
  },
  options: [],
  drivers: [
    'puppeteer',
    // 'seleniumWebdriverFirefox',
    // 'enzyme',
    // 'seleniumWebdriverChrome',
    // 'seleniumWebdriverSafari',
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
