const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const setting = {
  //
};

// global.requestAnimationFrame = (callback) => {
//   setTimeout(callback, 0);
// };

class Query {
  constructor(node) {
    this._node = node;
  }

  async text(selector) {
    const text = this._node.find(selector).first().text();
    return text;
  }
}

class Driver {
  constructor(options = {}, program = enzyme) {
    this._options = options;
    this._program = program;
    this._program.configure({ adapter: new Adapter() });
  }

  async run() {
    //
  }

  async newPage() {
    //
  }

  async goto(config) {
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
