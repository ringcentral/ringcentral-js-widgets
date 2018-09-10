const {
  Builder,
  By,
  until
} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const safari = require('selenium-webdriver/safari');
const ie = require('selenium-webdriver/ie');
const edge = require('selenium-webdriver/edge');
const { Driver: BaseDriver, Query: BaseQuery } = require('../base');


const Browsers = {
  chrome: 'chrome',
  edge: 'MicrosoftEdge',
  firefox: 'firefox',
  ie: 'internet explorer',
  safari: 'safari',
};

const seleniumWebdriverSetting = {
  safari: new safari.Options(),
  chrome: new chrome.Options().headless(),
  firefox: new firefox.Options().headless(),
  ie: new ie.Options(),
  edge: new edge.Options(),
};

class Query extends BaseQuery {
  async text(selector) {
    const element = await this._node.wait(until.elementLocated(By.css(this.getSelector(selector))));
    const innerText = element.getAttribute('innerText');
    return innerText;
  }
}


module.exports = (browser) => {
  const webdriver = browser.toLowerCase();
  const setKeyName = `set${browser}Options`;
  const setting = seleniumWebdriverSetting[webdriver];
  class Driver extends BaseDriver {
    constructor(options = {}, program = new Builder()) {
      super(options, program);
    }

    async run() {
      // Nothing
    }

    async newPage() {
      this._browser = this._program
        .forBrowser(Browsers[webdriver])[setKeyName](
          this._options.driver.setting,
        )
        .build();
      this._page = this._browser;
    }

    async goto(config) {
      await this._browser.get(config.location);
    }

    async closePage() {
      await this.close();
    }

    async close() {
      if (this._browser) {
        try {
          await this._browser.close();
        } catch (e) {
          // console.error(e);
        }
        try {
          await this._browser.quit();
        } catch (e) {
          // console.error(e);
        }
      }
    }
  }

  return {
    Driver,
    setting,
    Query,
  };
};
