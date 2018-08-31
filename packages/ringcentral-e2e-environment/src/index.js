const NodeEnvironment = require('jest-environment-node');
const e2eDrivers = require('ringcentral-e2e-drivers');

const drivers = {};
const argsHead = /^--config=/;

function getDriver(name, inputSetting) {
  const {
    Driver,
    setting
  } = e2eDrivers[name];
  // TDDO inputSetting for browser
  const options = {
    driver: {
      setting,
      // setting: {
      //   ...setting,
      //   ...inputSetting,
      // }
    },
  };
  return new Driver(options);
}

function checkValidBrowsers(process, config) {
  const isValidBrowsers = (
    config &&
    config.globals &&
    Array.isArray(config.globals.execDrivers) &&
    config.globals.execDrivers.length > 0
  );
  if (!isValidBrowsers) {
    console.error('Valid browsers');
    process.exit();
  }
}

function getConfig(process) {
  let config;
  const argv = process.argv.find(arg => argsHead.test(arg)).replace(argsHead, '');
  try {
    config = JSON.parse(argv);
  } catch (e) {
    console.error(e);
    process.exit();
  }
  return config;
}

const setup = async (config) => {
  // const config = getConfig(process);
  // checkValidBrowsers(process, config);
  for (const item of config.globals.execDrivers) {
    const [name, execSetting] = Array.isArray(item) ? item : [item];
    const defaultSetting = config.globals.execDefaults.browsers[name];
    const driver = getDriver(name, {
      ...defaultSetting,
      ...execSetting
    });
    await driver.run();
    drivers[name] = driver;
  }
  global.drivers = drivers;
  console.log('=====>>> global === setup');
};

const teardown = async () => {
  for (const driver of Object.values(drivers)) {
    await driver.close();
  }
  console.log('=====>>> global === teardown');
};

class WebDriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this._config = config;
  }

  async setup() {
    await super.setup();
    await setup(this._config);
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
    await teardown();
    console.log('=====>>> WebDriverEnvironment === teardown');
    await super.teardown();
  }
}

module.exports = WebDriverEnvironment;
