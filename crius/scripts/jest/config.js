module.exports = {
  setupFilesAfterEnv: [
    // require.resolve('./setupTests.js'),
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts', 'tsx'],
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages'],
  collectCoverageFrom: ['packages/**/*.ts', 'packages/**/*.js'],
  // timers: 'fake',
  setupFiles: [
    // require.resolve('./setupEnvironment.js'),
    // require.resolve('./setupHostConfigs.js'),
  ],
  transform: {
    '.(jsx?|tsx?)$': 'babel-jest',
  },
};
