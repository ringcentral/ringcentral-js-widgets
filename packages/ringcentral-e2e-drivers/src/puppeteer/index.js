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
    this.browser = await this._program.launch(this._options.driver.setting);
    // this.browser = await this._program.launch(this._options.driver.setting);
    // await this.page.goto(this._options.driver.config.location);
  }

  async close() {
    if (this.browser) {
      // await this.browser.close();
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
