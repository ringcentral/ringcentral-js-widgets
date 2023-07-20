/* eslint-disable no-undef */
jest.retryTimes(Number(process.env.RETRY ?? '5'));
jest.setTimeout(120 * 1000);
