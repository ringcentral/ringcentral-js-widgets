const NodeEnvironment = require('jest-environment-node');
const { createDriver } = require('./global');

class WebDriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this._config = config;
  }

  async setup() {
    // TODO HOOK
    await super.setup();
    if (this._config.globals.execModes.indexOf('sandbox') > -1) {
      // TODO sandbox mode
    } else {
      const drivers = {};
      for (const item of this._config.globals.execDrivers) {
        const [name, execSetting] = Array.isArray(item) ? item : [item];
        const defaultSetting = this._config.globals.execDefaults.browsers[name];
        const driver = createDriver(name, {
          ...defaultSetting,
          ...execSetting
        });
        await driver.run();
        await driver.newPage();
        drivers[name] = driver;
      }
      this.global.drivers = drivers;
    }
  }

  async teardown() {
    // TODO HOOK
    if (this._config.globals.execModes.indexOf('sandbox') > -1) {
      // TODO sandbox mode
    } else {
      for (const driver of Object.values(this.global.drivers)) {
        await driver.closePage();
        await driver.close();
      }
    }
    await super.teardown();
  }
}

module.exports = WebDriverEnvironment;
