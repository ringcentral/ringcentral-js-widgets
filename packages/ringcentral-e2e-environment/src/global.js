
function getDriver(name, {
  caseParams,
  option,
  tag,
  level
}) {
  const { Driver, setting, } = drivers[name];
  const config = getDriverConfig({
    projects: global.execGlobal.params.projects,
    tag,
  });
  const options = {
    global: global.execGlobal,
    caseParams,
    option,
    tag,
    level,
    driver: {
      config,
      setting,
    },
  };
  return new Driver(options);
}

let browsers;
let config;
const argsHead = /^--config=/;

const setup = async () => {
  // config = process.argv.find(arg => argsHead.test(arg)).replace(argsHead, '');
  // try {
  //   config = JSON.parse(config);
  // } catch (e) {
  //   console.error(e);
  //   process.exit();
  // }
  // const isValidBrowsers = (
  //   config &&
  //   Array.isArray(config.execDrivers) &&
  //   config.execDrivers.length > 0
  // );
  // if (!isValidBrowsers) {
  //   console.error('Valid browsers');
  //   process.exit();
  // }
  // for (const name of config.execDrivers) {
  //   getDriver(name);
  //   const driver = await driver.launch();
  // }
};

const teardown = async () => {
  console.log('global.teardown');
  // await browser.close();
};

module.exports = {
  teardown,
  setup,
};
