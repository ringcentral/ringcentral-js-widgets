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
    const isSandbox = this._config.globals.execModes.indexOf('sandbox') > -1;
    if (isSandbox) {
      // TODO sandbox mode
    } else {
      const drivers = {};
      for (const item of this._config.globals.execDrivers) {
        const [name, execSetting] = Array.isArray(item) ? item : [item];
        // TODO import browsers setting
        const defaultSetting = this._config.globals.execDefaults.browsers[name];
        const instance = createDriver(name, {
          ...defaultSetting,
          ...execSetting
        });
        await instance.driver.run();
        await instance.driver.newPage();
        drivers[name] = instance;
      }
      this.global.drivers = drivers;
    }
  }

  async teardown() {
    // TODO HOOK
    if (this._config.globals.execModes.indexOf('sandbox') > -1) {
      // TODO sandbox mode
    } else {
      for (const instance of Object.values(this.global.drivers)) {
        await instance.driver.closePage();
        await instance.driver.close();
      }
    }
    await super.teardown();
  }
}

module.exports = WebDriverEnvironment;
