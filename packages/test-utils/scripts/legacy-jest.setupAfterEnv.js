/* eslint-disable no-undef */

// RETRY only work in CI
if (__CI__ && process.env.RETRY) {
  jest.retryTimes(Number(process.env.RETRY));
}

jest.setTimeout(30 * 1000);
