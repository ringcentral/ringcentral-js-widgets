/* eslint-disable no-undef */

if (__CI__) {
  jest.retryTimes(Number(process.env.RETRY ?? '3'));
  jest.setTimeout(120 * 1000);
} else {
  jest.setTimeout(30 * 1000);
}
