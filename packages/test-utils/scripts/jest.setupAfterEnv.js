/* eslint-disable no-undef */

if (__CI__) {
  if (process.env.RETRY) {
    jest.retryTimes(Number(process.env.RETRY));
  }

  jest.setTimeout(120 * 1000);
} else {
  jest.setTimeout(30 * 1000);
}

beforeEach(() => {
  if (global.log) {
    const testName = expect.getState().currentTestName;
    global.log(`[🧪] ${testName}`);
    global.log('------------------------------------------');
  }
});

afterEach(() => {
  if (global.log) {
    global.log(`----------------teardown------------------`);

    if (global.consoleMessages) {
      consoleMessages.forEach((args) => {
        global.__log(...args);
      });
      consoleMessages.length = 0;
    }
  }
});
