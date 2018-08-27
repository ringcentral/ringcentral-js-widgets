module.exports = {
  caseServices: [{
    name: 'Einstein',
    url: 'http://www.einstein.com',
    handler: './einstein.js'
  }],
  tester: 'jest',
  default: {
    driver: 'puppeteer',
    level: [
      'p0',
      'p1'
    ],
    tags: {
      brand: [
        'rc'
      ]
    }
  }
};
