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
    const _selector = this.getSelector(selector, options);
    const text = this._node.find(_selector).first().text();
    return text;
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

  async waitForSelector(selector, options) {
    await this._timeout(100);
    this._node.update();
    const _selector = this.getSelector(selector, options);
    if (this._node.find(_selector).length === 0) {
      const result = await this.waitForSelector(selector, options);
      return result;
    }
    return this._node.find(_selector).first();
  }

  async _timeout(time = 0) {
    await new Promise(resolve => setTimeout(resolve, time));
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
