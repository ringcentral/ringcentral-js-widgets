const puppeteer = require('puppeteer');
const {
  Driver: BaseDriver,
  Query: BaseQuery
} = require('../base');

const setting = {
  ignoreHTTPSErrors: true,
  args: [
    '--use-fake-ui-for-media-stream',
    // '--load-extension=/path/to/extension/'
  ]
};
class Query extends BaseQuery {
  async getText(selector, options = {}) {
    const _selector = this.getSelector(selector, options);
    await this.waitForSelector(selector, options);
    const innerText = await this._node.$eval(_selector, node => node.innerText);
    return innerText;
  }

  async click(selector, options) {
    const _selector = this.getSelector(selector, options);
    await this._node.click(_selector);
  }

  async type(selector, value, options) {
    const _selector = this.getSelector(selector, options);
    await this._node.type(_selector, value);
  }

  async waitForSelector(selector, options) {
    const _selector = this.getSelector(selector, options);
    const element = await this._node.waitForSelector(_selector, options);
    return element;
  }

  async waitForFrame(id) {
    await this.waitFor(100);
    const frame = this._node.frames().find(frame => frame.name() === id);
    if (frame) {
      return frame;
    }
    const result = await this.waitForFrame(id);
    return result;
  }

  async waitForFunction(...args) {
    await this._node.waitForFunction(...args);
  }

  async screenshot({
    path
  } = {}) {
    await this._node.screenshot({
      path
    });
  }

  async goto(url) {
    await this._node.goto(url);
  }

  async getFrame(frameIds) {
    let frame;
    for (const frameId of frameIds) {
      frame = await this._node.switchTo().frames(frameId);
    }
    return frame;
  }

  async execute(...args) {
    return this._node.evaluate(...args);
  }

  async clear(selector, options) {
    await this.waitForSelector(selector, options);
    const _selector = this.getSelector(selector, options);
    await this._node.focus(_selector);
    await this._node.$eval(_selector, input => input.select(), _selector);
    await this._node.keyboard.down('Delete');
    await this._node.keyboard.up('Delete');
  }


  // async $(selector) {
  //   const element = await this._node.$(selector);
  //   return element;
  // }

  // async $$(selector) {
  //   const elements = await this._node.$$(selector);
  //   return elements;
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
