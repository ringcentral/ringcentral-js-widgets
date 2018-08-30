const e2eDrivers = require('ringcentral-e2e-drivers');

const drivers = {};
const argsHead = /^--config=/;

function getDriver(name, inputSetting) {
  const {
    Driver,
    setting
  } = e2eDrivers[name];
  const options = {
    driver: {
      setting: {
        ...setting,
        ...inputSetting,
      }
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

const setup = async () => {
  console.log('====>>> global.setup');
  const config = getConfig(process);
  checkValidBrowsers(process, config);
  for (const item of config.globals.execDrivers) {
    const [name, execSetting] = Array.isArray(item) ? item : [item];
    const defaultSetting = config.globals.execDefaults.browsers[name];
    const driver = getDriver(name, {
      ...defaultSetting,
      ...execSetting
    });
    // await driver.launch();
    drivers[name] = driver;
  }
  global.drivers = drivers;
};

const teardown = async () => {
  for (const driver of Object.values(drivers)) {
    // await driver.browser.close();
  }
  console.log('====>>> global.teardown');
};

module.exports = {
  teardown,
  setup,
};
