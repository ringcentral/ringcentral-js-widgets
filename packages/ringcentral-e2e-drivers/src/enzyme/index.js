const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { Driver: BaseDriver, Query: BaseQuery } = require('../base');

const setting = {
  //
};

// global.requestAnimationFrame = (callback) => {
//   setTimeout(callback, 0);
// };

class Query extends BaseQuery {
  async getText(selector, options = {}) {
    const element = await this.$(selector, options);
    return element.text();
  }

  async getAttribute(selector, attribute, options = {}) {
    const element = await this.$(selector, options);
    const attributeValue = element.instance()[attribute];
    return attributeValue;
  }

  async getValue(selector, options) {
    const value = await this.getAttribute(selector, 'value', options);
    return value;
  }

  async html(selector, options) {
    const element = await this.$(selector, options);
    return element.html();
  }

  async click(selector, options) {
    await this.$(selector, options).simulate('click');
  }

  async clear(selector, options) {
    await this.type(selector, '', options);
  }

  async type(selector, value, options) {
    const element = await this.$(selector, options);
    element.instance().value = value;
    element.simulate('change');
  }

  // TODO
  async execute(...args) {
    let script = args.shift();
    if ((typeof script !== 'string' && typeof script !== 'function')) {
      throw new Error('number or type of arguments don\'t agree with execute protocol command');
    }
    if (typeof script === 'function') {
      script = `return (${script}).apply(null, arguments)`;
    }
    const handle = new Function(script)(args);
    return handle;
  }

  async waitForFunction(...args) {
    const result = await this.execute(...args);
    if (result) return;
    await this.waitFor(250);
    await this.waitForFunction(...args);
  }

  async waitForSelector(selector, options) {
    await this.waitFor(100);
    this._node.update();
    const _selector = this.getSelector(selector, options);
    if (this._node.find(_selector).length === 0) {
      const result = await this.waitForSelector(selector, options);
      return result;
    }
    return this._node.find(_selector).first();
  }

  async $(selector, options) {
    const element = await this.$$(selector, options);
    return element.first();
  }

  async $$(selector, options) {
    const _selector = this.getSelector(selector, options);
    const element = this._node.find(_selector);
    return element;
  }
}

class Driver extends BaseDriver {
  constructor(options = {}, program = enzyme) {
    super(options, program);
    this._program.configure({ adapter: new Adapter() });
  }

  async run() {
    //
  }

  async newPage() {
    //
  }

  async goto(config) {
    this._config = config;
    const path = require('path').resolve(process.cwd(), config.source);
    const source = require(path);
    const getApp = typeof source === 'function' ? source : source.default;
    const app = await getApp();
    this._browser = this._program.mount(app);
    this._page = this._browser;
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async closePage() {
    this._browser = null;
    this._page = null;
  }

  async close() {
    this._browser = null;
  }
}

module.exports = {
  Driver,
  setting,
  Query,
};
