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
  async text(selector) {
    const text = this._node.find(this.getSelector(selector)).first().text();
    return text;
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
