/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
if (__CI__) {
  jest.retryTimes(Number(process.env.RETRY ?? '3'));
}
