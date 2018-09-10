const puppeteer = require('puppeteer');
const { Driver: BaseDriver, Query: BaseQuery } = require('../base');

const setting = {
  ignoreHTTPSErrors: true,
  args: [
    '--use-fake-ui-for-media-stream',
    // '--load-extension=/path/to/extension/'
  ]
};
class Query extends BaseQuery {
  async text(selector) {
    const innerText = await this._node.$eval(this.getSelector(selector), node => node.innerText);
    return innerText;
  }

  // async $(selector) {
  //   const element = await this._node.$(selector);
  //   return element;
  // }

  // async $$(selector) {
  //   const elements = await this._node.$$(selector);
  //   return elements;
  // }

  // async click(selector) {
  //   const handle = await this._node.click(selector);
  //   return handle;
  // }

  // async type(selector, value) {
  //   const handle = await this._node.type(selector, value);
  //   return handle;
  // }
}

class Driver extends BaseDriver {
  constructor(options = {}, program = puppeteer) {
    super(options, program);
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
}

module.exports = {
  Driver,
  setting,
  Query,
};
