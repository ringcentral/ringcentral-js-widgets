import enzyme from './enzyme';
import puppeteer from './puppeteer';
import getSeleniumWebdriver from './seleniumWebdriver';

export default {
  enzyme,
  puppeteer,
  seleniumWebdriverChrome: getSeleniumWebdriver('Chrome'),
  seleniumWebdriverIE: getSeleniumWebdriver('Ie'),
  seleniumWebdriverEdge: getSeleniumWebdriver('Edge'),
  seleniumWebdriverFirefox: getSeleniumWebdriver('Firefox'),
  seleniumWebdriverSafari: getSeleniumWebdriver('Safari'),
};
