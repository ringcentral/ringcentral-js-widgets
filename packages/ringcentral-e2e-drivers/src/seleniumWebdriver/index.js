import {
  Builder,
  By,
  until
} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import safari from 'selenium-webdriver/safari';
import ie from 'selenium-webdriver/ie';
import edge from 'selenium-webdriver/edge';

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

export function getSeleniumWebdriver(browser) {
  const webdriver = browser.toLowerCase();
  const setKeyName = `set${browser}Options`;
  const setting = seleniumWebdriverSetting[webdriver];
  class Driver {
    constructor(options = {}, program = new Builder()) {
      this._options = options;
      this._program = program;
    }

    get program() {
      return this._program;
    }

    async launch() {
      this.browser = this._program
        .forBrowser(Browsers[webdriver])[setKeyName](
          this._options.driver.setting,
        )
        .build();
      await this.browser.get(this._options.driver.config.location);
    }

    async close() {
      if (this.browser) {
        // TODO process is still exist?
        try { await this.browser.close(); } catch (e) {}
        try { await this.browser.quit(); } catch (e) {}
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
}
