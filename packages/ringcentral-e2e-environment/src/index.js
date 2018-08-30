const NodeEnvironment = require('jest-environment-node');

class WebDriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this._config = config;
  }

  async setup() {
    await super.setup();
    console.log('=====>>> WebDriverEnvironment === setup');
    this.global.drivers = global.drivers;
    for (const driver of Object.values(global.drivers)) {
      await driver.newPage();
    }
  }

  async teardown() {
    for (const driver of Object.values(this.global.drivers)) {
      await driver.closePage();
    }
    console.log('=====>>> WebDriverEnvironment === teardown');
    await super.teardown();
  }
}

module.exports = WebDriverEnvironment;
