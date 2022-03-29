/**
 * doMock `@ringcentral-integration/commons/lib/sleep` to jest.fn
 * @param sleepMock that mock method, default is jest.fn, that can be custom by yourself
 * @returns mock function
 */
export const doMockSleep = (sleepMock = jest.fn(() => Promise.resolve())) => {
  jest.doMock('@ringcentral-integration/commons/lib/sleep', () => ({
    __esModule: true,
    sleep: sleepMock,
  }));

  return sleepMock;
};
