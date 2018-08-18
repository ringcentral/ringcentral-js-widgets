import runner from './src/bin/runner';

runner({
  inputTesterConfig: {
    // testMatch: ['<rootDir>/packages/ringcentral-e2e-test/src/features/**/*.js'],
    testRegex: './packages/ringcentral-e2e-test/src/features/widgets/meeting/ScheduleMeeting.spec.js',
  },
  options: [],
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
