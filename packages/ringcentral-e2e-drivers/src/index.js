const enzyme = require('./enzyme');
const puppeteer = require('./puppeteer');
const getSeleniumWebdriver = require('./seleniumWebdriver');

module.exports = {
  enzyme,
  puppeteer,
  seleniumWebdriverChrome: getSeleniumWebdriver('Chrome'),
  seleniumWebdriverIE: getSeleniumWebdriver('Ie'),
  seleniumWebdriverEdge: getSeleniumWebdriver('Edge'),
  seleniumWebdriverFirefox: getSeleniumWebdriver('Firefox'),
  seleniumWebdriverSafari: getSeleniumWebdriver('Safari'),
};
