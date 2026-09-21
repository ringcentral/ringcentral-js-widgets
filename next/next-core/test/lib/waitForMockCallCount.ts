import { sleep } from '@ringcentral-integration/utils';

export async function waitForMockCallCount(
  mock: jest.Mock,
  expectedCallCount: number,
  timeout = 1000,
) {
  const startedAt = Date.now();

  while (
    mock.mock.calls.length < expectedCallCount &&
    Date.now() - startedAt < timeout
  ) {
    await sleep(20);
  }

  expect(mock).toHaveBeenCalledTimes(expectedCallCount);
}
