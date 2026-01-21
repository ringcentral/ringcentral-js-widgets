import { sleep } from '@ringcentral-integration/utils';
import { firstValueFrom, timer } from 'rxjs';

import { withAbortController } from '../../src';

describe('withAbortController', () => {
  jest.spyOn(AbortController.prototype, 'abort');

  afterEach(() => {
    jest.mocked(AbortController.prototype.abort).mockClear();
  });

  const fetch$ = withAbortController(async () => {
    return sleep(1000).then(() => 'success');
  });

  it('withAbortController should trigger abort() when unsubscribe', async () => {
    const subscription = fetch$.subscribe();

    subscription.unsubscribe();

    expect(AbortController.prototype.abort).toHaveBeenCalledTimes(1);
  });

  it('withAbortController should return normal value when', async () => {
    jest.useFakeTimers();

    const promise = firstValueFrom(fetch$);

    jest.advanceTimersByTime(1000);

    jest.useRealTimers();

    expect(await promise).toBe('success');

    expect(AbortController.prototype.abort).toHaveBeenCalledTimes(0);
  });
});
