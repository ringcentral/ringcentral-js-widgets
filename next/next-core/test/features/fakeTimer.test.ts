import { jestFakeTimersAreEnabled } from '@ringcentral-integration/test-utils';
import { Subject } from 'rxjs';

import { waitSubscribeSuccess } from '../lib/whenStateChange';

describe('fakeTimer check', () => {
  it.each([
    { time: 500, result: 'success' },
    { time: 1000, result: 'success' },
    { time: 2000, result: 'failed' },
    { time: 10000, result: 'failed' },
  ])('waitSubscribeSuccess in fakeTimer', async ({ time, result }) => {
    jest.useFakeTimers();
    const fakeTimersAreEnabled = jestFakeTimersAreEnabled();
    expect(fakeTimersAreEnabled).toBeTruthy();

    const subject = new Subject<number>();

    setTimeout(() => {
      subject.next(100);
    }, time);

    const promise = waitSubscribeSuccess(
      subject,
      (value) => {
        expect(value).toBe(100);
        return 'success';
      },
      { timeout: 1000 },
    );

    const state = await promise.catch((err) => {
      return 'failed';
    });

    expect(state).toBe(result);

    jest.useRealTimers();
  });
});
