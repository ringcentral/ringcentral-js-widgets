const setting = {};

class Query {
  constructor(node, options) {
    this._node = node;
    this._options = options;
  }

  get _label() {
    return this._options && this._options.label;
  }

  get label() {
    return this._label;
  }

  getSelector(selector) {
    return this._label ? `[${this._label}="${selector}"]` : selector;
  }
}

class Driver {
  constructor(options, program) {
    this._options = options;
    this._program = program;
  }

  async run() {
    //
  }

  async newPage() {
    //
  }

  async goto(config) {
    this._config = config;
  }

  async closePage() {
    //
  }

  async close() {
    //
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
