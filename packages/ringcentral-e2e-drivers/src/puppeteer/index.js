const puppeteer = require('puppeteer');

const puppeteerSetting = {
  ignoreHTTPSErrors: true,
  args: [
    '--use-fake-ui-for-media-stream',
    // '--load-extension=/path/to/extension/'
  ]
};

class Driver {
  constructor(options = {}, program = puppeteer) {
    this._options = options;
    this._program = program;
  }

  get program() {
    return this._program;
  }

  async launch() {
    this.browser = await this._program.launch({
      // ...this._options.global.driverSetting,
      ...this._options.driver.setting,
    });
    this.page = await this.browser.newPage();
    await this.page.goto(this._options.driver.config.location);
  }
  /* Global runner API */
  async run() {
    this.browser = await this._program.launch(this._options.driver.setting);
  }

  async newPage() {
    this.page = await this.browser.newPage();
  }

  async goto(location) {
    await this.page.goto(location);
  }

  async closePage() {
    await this.page.close();
    this.page = null;
    return this.page;
  }
  /* Global runner API */
  async close() {
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (e) {
        //
      }
    }
  }

  async $(selector) {
    const element = await this._context.$(selector);
    return element;
  }

  async text(selector) {
    const innerText = await this.page.$eval(selector, node => node.innerText);
    return innerText;
  }

  async $$(selector) {
    const elements = await this._context.$$(selector);
    return elements;
  }

  async click(selector) {
    const handle = await this._context.click(selector);
    return handle;
  }

  async type(selector, value) {
    const handle = await this._context.type(selector, value);
    return handle;
  }
}

module.exports = {
  Driver,
  setting: puppeteerSetting,
};
