/**
 * @param func the function need to run in jest fake timer
 */
export const runInFakeTimer = async (func: () => any) => {
  jest.useFakeTimers();
  await func();
  jest.useRealTimers();
};
