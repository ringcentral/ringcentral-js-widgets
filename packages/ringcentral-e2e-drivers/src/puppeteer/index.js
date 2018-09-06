const puppeteer = require('puppeteer');

const setting = {
  ignoreHTTPSErrors: true,
  args: [
    '--use-fake-ui-for-media-stream',
    // '--load-extension=/path/to/extension/'
  ]
};
class Query {
  constructor(node) {
    this._node = node;
  }

  async text(selector) {
    const innerText = await this._node.$eval(selector, node => node.innerText);
    return innerText;
  }

  async $(selector) {
    const element = await this._node.$(selector);
    return element;
  }

  async $$(selector) {
    const elements = await this._node.$$(selector);
    return elements;
  }

  async click(selector) {
    const handle = await this._node.click(selector);
    return handle;
  }

  async type(selector, value) {
    const handle = await this._node.type(selector, value);
    return handle;
  }
}

class Driver {
  constructor(options = {}, program = puppeteer) {
    this._options = options;
    this._program = program;
  }

  async run() {
    this._browser = await this._program.launch(this._options.driver.setting);
  }

  async newPage() {
    this._page = await this._browser.newPage();
  }

  async goto(config) {
    await this._page.goto(config.location);
  }

  async closePage() {
    await this._page.close();
    this._page = null;
  }

  async close() {
    if (this._browser) {
      try {
        await this._browser.close();
      } catch (e) {
        console.error(e);
      }
    }
  }

  get program() {
    return this._program;
  }

  get page() {
    return this._page;
  }

  get browser() {
    return this._browser;
  }
}

module.exports = {
  Driver,
  setting,
  Query,
};
