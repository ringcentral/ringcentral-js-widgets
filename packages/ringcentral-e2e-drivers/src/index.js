const base = require('./base');
const enzyme = require('./enzyme');
const puppeteer = require('./puppeteer');
const getSeleniumWebdriver = require('./seleniumWebdriver');

module.exports = {
  UT: base,
  enzymeUT: enzyme,
  enzyme,
  puppeteer,
  seleniumWebdriverChrome: getSeleniumWebdriver('Chrome'),
  seleniumWebdriverIE: getSeleniumWebdriver('Ie'),
  seleniumWebdriverEdge: getSeleniumWebdriver('Edge'),
  seleniumWebdriverFirefox: getSeleniumWebdriver('Firefox'),
  seleniumWebdriverSafari: getSeleniumWebdriver('Safari'),
};
