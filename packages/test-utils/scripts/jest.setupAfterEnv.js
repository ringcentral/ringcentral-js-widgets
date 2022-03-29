/* eslint-disable no-undef */

if (__CI__) {
  jest.retryTimes(Number(process.env.RETRY ?? '3'));
}
