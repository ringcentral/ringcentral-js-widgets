const e2eDrivers = require('ringcentral-e2e-drivers');

const argsHead = /^--config=/;

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

function checkValidBrowsers(process) {
  const config = getConfig(process);
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

const createDriver = (name, inputSetting) => {
  const {
    Driver,
    setting,
    Query
  } = e2eDrivers[name];
  // TDDO inputSetting for browser
  const options = {
    driver: {
      setting,
    },
  };
  return {
    driver: new Driver(options),
    query: node => new Query(node),
  };
};

const setup = async () => {
  checkValidBrowsers(process);
  // TODO HOOK global-setup
};

const teardown = async () => {
  // TODO Handle accident exit and close drivers
  // TODO HOOK global-teardown
};

module.exports = {
  setup,
  teardown,
  createDriver,
};
