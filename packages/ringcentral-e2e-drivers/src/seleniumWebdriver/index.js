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

module.exports = (browser) => {
  const webdriver = browser.toLowerCase();
  const setKeyName = `set${browser}Options`;
  const setting = seleniumWebdriverSetting[webdriver];
  class Driver {
    constructor(options = {}, program = new Builder()) {
      this._options = options;
      this._program = program;
    }
    /* Global runner API */
    async run() {
      // Nothing
    }

    async newPage() {
      this.browser = this._program
        .forBrowser(Browsers[webdriver])[setKeyName](
          this._options.driver.setting,
        )
        .build();
      this.page = this.browser;
    }

    async goto(config) {
      await this.browser.get(config.location);
      return this.browser;
    }

    async closePage() {
      await this.close();
    }
    /* Global runner API */
    get program() {
      return this._program;
    }

    async launch(config) {
      this.browser = this._program
        .forBrowser(Browsers[webdriver])[setKeyName](this._options.driver.setting)
        .build();
      await this.browser.get(config.location);
      return this.browser;
    }

    async close() {
      if (this.browser) {
        try {
          await this.browser.close();
        } catch (e) {
          //
        }
        try {
          await this.browser.quit();
        } catch (e) {
          //
        }
      }
    }

    async text(selector) {
      const element = await this.browser.wait(until.elementLocated(By.css(selector)));
      const innerText = element.getAttribute('innerText');
      return innerText;
    }

    // async $(selector) {
    //   const element = await this._context.$(selector);
    //   return element;
    // }

    // async $$(selector) {
    //   const elements = await this._context.$$(selector);
    //   return elements;
    // }

    // async click(selector) {
    //   const handle = await this._context.click(selector);
    //   return handle;
    // }

    // async type(selector, value) {
    //   const handle = await this._context.type(selector, value);
    //   return handle;
    // }
  }
  return {
    Driver,
    setting,
  };
};
