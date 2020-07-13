module.exports = {
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$':
      '@ringcentral-integration/babel-settings/lib/crius.js',
  },
};
