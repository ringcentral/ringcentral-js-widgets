const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const setting = {
};

class Driver {
  constructor(options = {}, program = enzyme) {
    this._options = options;
    this._program = program;
    this._program.configure({ adapter: new Adapter() });
  }
  /* Global runner API */
  async run() {
    //
  }

  async newPage() {
    //
  }

  async goto(location) {
    // const app = require(location);
    // this.browser = this._program.mount();
    // this.page = this.browser;
    // return this.page;
    return this;
  }

  async closePage() {
    this.browser = null;
    this.page = null;
    return this.page;
  }
  /* Global runner API */

  get program() {
    return this._program;
  }

  async launch() {
    //
  }

  async close() {
    this.browser = null;
  }

  async text(selector) {
    const text = this.page.find(selector).first().text();
    return text;
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

module.exports = {
  Driver,
  setting,
};
