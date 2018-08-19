import puppeteer from 'puppeteer';

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
      ...this._options.global.driverSetting,
      ...this._options.driver.setting,
    });
    this.page = await this.browser.newPage();
    await this.page.goto(this._options.driver.config.location);
  }

  async close() {
    await this.browser.close();
  }

  async $(selector) {
    const element = await this._context.$(selector);
    return element;
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

export default {
  Driver,
  setting: puppeteerSetting,
};
