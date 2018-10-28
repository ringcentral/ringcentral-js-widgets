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
    const labelSign = /^@\s*/;
    const isUsingCssSelector = !this._label || labelSign.test(selector);
    if (isUsingCssSelector) {
      return selector
        .replace(labelSign, '')
        .split(' ')
        .map((_selector) => {
          const [labelSelector, index] = _selector.split(':');
          const childSelector = index ?
            `:nth-${/-/.test(index) ? 'last-' : ''}child(${index.replace('-', '')})` : '';
          return `[${this._label}="${labelSelector}"]${childSelector}`;
        })
        .join(' ');
    }
    return selector;
  }

  async waitFor(param, options, ...args) {
    switch (typeof param) {
      case 'number':
        await this.timeout(param);
        break;
      case 'string':
        if (typeof this.waitForSelector === 'function') {
          await this.waitForSelector(param, options, ...args);
        } else {
          console.error('\'waitForSelector\' function  in current \'Query\' has not yet been implemented.');
        }
        break;
      case 'function':
        if (typeof this.waitForFunction === 'function') {
          await this.waitForFunction(param, options, ...args);
        } else {
          console.error('\'waitForFunction\' function  in current \'Query\' has not yet been implemented.');
        }
        break;
      default:
        console.error('Error type param for \'waitFor\' function in Query class.');
    }
  }

  async timeout(time = 0) {
    await new Promise(resolve => setTimeout(resolve, time));
  }

  async screenshot() {
    //
  }
}

class Driver {
  constructor(options, program) {
    this._options = options;
    this._program = program;
    this._afterHooks = new Set();
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

  addAfterHook(fn) {
    this._afterHooks.add(fn);
  }

  get afterHooks() {
    return this._afterHooks;
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
