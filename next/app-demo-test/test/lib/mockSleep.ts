/**
 * doMock `@ringcentral-integration/utils/sleep` to jest.fn
 * @param sleepMock that mock method, default is jest.fn, that can be custom by yourself
 * @returns mock function
 */
export const doMockSleep = (sleepMock = jest.fn(() => Promise.resolve())) => {
  jest.doMock('@ringcentral-integration/utils/src/utils/sleep', () => ({
    __esModule: true,
    sleep: sleepMock,
  }));

  return sleepMock;
};
