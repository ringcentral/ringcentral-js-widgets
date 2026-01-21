import { firstValueFrom, take } from 'rxjs';

import { progressiveTimer } from '../../src/lib/rxjs/progressiveTimer';

describe('progressiveTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should emit timeout events with increasing intervals', async () => {
    const onEachTimeout = jest.fn();
    const onFinalTimeout = jest.fn();

    const initTimeout = 1000;
    const times = 3;

    const timer$ = progressiveTimer({
      initTimeout,
      times,
      onEachTimeout,
      onFinalTimeout,
    });

    // Start the timer
    const subscription = timer$.subscribe();

    // Fast-forward through all timers
    jest.advanceTimersByTime(1000); // First timeout: 1000ms
    expect(onEachTimeout).toHaveBeenCalledWith(0, 1000);

    jest.advanceTimersByTime(2000); // Second timeout: 2000ms (1000 + 1000)
    expect(onEachTimeout).toHaveBeenCalledWith(1, 2000);

    jest.advanceTimersByTime(3000); // Third timeout: 3000ms (2000 + 1000)
    expect(onEachTimeout).toHaveBeenCalledWith(2, 3000);

    jest.advanceTimersByTime(4000); // Final timeout: 4000ms (3000 + 1000)
    expect(onFinalTimeout).toHaveBeenCalledTimes(1);

    subscription.unsubscribe();
  });

  it('should call onEachTimeout with correct parameters', async () => {
    const onEachTimeout = jest.fn();
    const onFinalTimeout = jest.fn();

    const initTimeout = 2000;
    const times = 2;

    const timer$ = progressiveTimer({
      initTimeout,
      times,
      onEachTimeout,
      onFinalTimeout,
    });

    const subscription = timer$.subscribe();

    // First timeout
    jest.advanceTimersByTime(2000);
    expect(onEachTimeout).toHaveBeenNthCalledWith(1, 0, 2000);

    // Second timeout
    jest.advanceTimersByTime(3000);
    expect(onEachTimeout).toHaveBeenNthCalledWith(2, 1, 3000);

    // Final timeout
    jest.advanceTimersByTime(4000);
    expect(onFinalTimeout).toHaveBeenCalledTimes(1);

    expect(onEachTimeout).toHaveBeenCalledTimes(2);

    subscription.unsubscribe();
  });

  it('should handle default times parameter (5)', async () => {
    const onEachTimeout = jest.fn();
    const onFinalTimeout = jest.fn();

    const initTimeout = 1000;

    const timer$ = progressiveTimer({
      initTimeout,
      times: 5,
      onEachTimeout,
      onFinalTimeout,
    });

    const subscription = timer$.subscribe();

    // Advance through all 5 timeouts
    for (let i = 0; i < 5; i++) {
      const expectedTimeout = 1000 + i * 1000;
      jest.advanceTimersByTime(expectedTimeout);
      expect(onEachTimeout).toHaveBeenNthCalledWith(i + 1, i, expectedTimeout);
    }

    // Final timeout
    jest.advanceTimersByTime(6000);
    expect(onFinalTimeout).toHaveBeenCalledTimes(1);

    expect(onEachTimeout).toHaveBeenCalledTimes(5);

    subscription.unsubscribe();
  });

  it('should handle zero times parameter', async () => {
    const onEachTimeout = jest.fn();
    const onFinalTimeout = jest.fn();

    const initTimeout = 1000;
    const times = 0;

    const timer$ = progressiveTimer({
      initTimeout,
      times,
      onEachTimeout,
      onFinalTimeout,
    });

    const subscription = timer$.subscribe();

    // Only final timeout should be called
    jest.advanceTimersByTime(1000);
    expect(onFinalTimeout).toHaveBeenCalledTimes(1);
    expect(onEachTimeout).not.toHaveBeenCalled();

    subscription.unsubscribe();
  });

  it('should handle large times parameter', async () => {
    const onEachTimeout = jest.fn();
    const onFinalTimeout = jest.fn();

    const initTimeout = 500;
    const times = 10;

    const timer$ = progressiveTimer({
      initTimeout,
      times,
      onEachTimeout,
      onFinalTimeout,
    });

    const subscription = timer$.subscribe();

    // Advance through all 10 timeouts
    for (let i = 0; i < 10; i++) {
      const expectedTimeout = 500 + i * 1000;
      jest.advanceTimersByTime(expectedTimeout);
      expect(onEachTimeout).toHaveBeenNthCalledWith(i + 1, i, expectedTimeout);
    }

    // Final timeout
    jest.advanceTimersByTime(10500);
    expect(onFinalTimeout).toHaveBeenCalledTimes(1);

    expect(onEachTimeout).toHaveBeenCalledTimes(10);

    subscription.unsubscribe();
  });

  it('should complete the observable after final timeout', async () => {
    const onEachTimeout = jest.fn();
    const onFinalTimeout = jest.fn();

    const initTimeout = 1000;
    const times = 2;

    const timer$ = progressiveTimer({
      initTimeout,
      times,
      onEachTimeout,
      onFinalTimeout,
    });

    let completed = false;
    const subscription = timer$.subscribe({
      complete: () => {
        completed = true;
      },
    });

    // Advance through all timeouts
    jest.advanceTimersByTime(1000); // First timeout
    jest.advanceTimersByTime(2000); // Second timeout
    jest.advanceTimersByTime(3000); // Final timeout

    expect(completed).toBe(true);

    subscription.unsubscribe();
  });

  it('should work with firstValueFrom', async () => {
    const onEachTimeout = jest.fn();
    const onFinalTimeout = jest.fn();

    const initTimeout = 1000;
    const times = 2;

    const timer$ = progressiveTimer({
      initTimeout,
      times,
      onEachTimeout,
      onFinalTimeout,
    });

    const promise = firstValueFrom(timer$.pipe(take(1)));

    // Advance through all timeouts
    jest.advanceTimersByTime(1000); // First timeout
    jest.advanceTimersByTime(2000); // Second timeout
    jest.advanceTimersByTime(3000); // Final timeout

    const result = await promise;
    expect(result).toBe(false);
    expect(onEachTimeout).toHaveBeenCalledTimes(2);
    expect(onFinalTimeout).toHaveBeenCalledTimes(1);
  });

  it('should handle rapid timer advancement', async () => {
    const onEachTimeout = jest.fn();
    const onFinalTimeout = jest.fn();

    const initTimeout = 1000;
    const times = 3;

    const timer$ = progressiveTimer({
      initTimeout,
      times,
      onEachTimeout,
      onFinalTimeout,
    });

    const subscription = timer$.subscribe();

    // Advance all timers at once
    jest.advanceTimersByTime(10000);

    expect(onEachTimeout).toHaveBeenCalledTimes(3);
    expect(onEachTimeout).toHaveBeenNthCalledWith(1, 0, 1000);
    expect(onEachTimeout).toHaveBeenNthCalledWith(2, 1, 2000);
    expect(onEachTimeout).toHaveBeenNthCalledWith(3, 2, 3000);
    expect(onFinalTimeout).toHaveBeenCalledTimes(1);

    subscription.unsubscribe();
  });
});
