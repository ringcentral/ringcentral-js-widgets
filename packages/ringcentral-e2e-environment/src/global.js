
let browser;
let config;
const argsHead = /^--config=/;

const setup = async () => {
  config = process.argv.find(arg => argsHead.test(arg)).replace(argsHead, '');
  try {
    config = JSON.parse(config);
  } catch (e) {
    console.error(e);
    process.exit();
  }
  console.log('global.teardown');
  // const driver = await driver.launch();
};

const teardown = async () => {
  console.log('global.teardown');
  // await browser.close();
};

module.exports = {
  teardown,
  setup,
};
