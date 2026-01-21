import { NEVER, filter, interval, of } from 'rxjs';

import { waitSubscribeSuccess } from '../lib/whenStateChange';

describe('waitSubscribeSuccess', () => {
  it('waitSubscribeSuccess should throw correct error when never emit', async () => {
    // jest should throw
    await expect(
      waitSubscribeSuccess(
        NEVER,
        (val) => {
          expect(val).toBe('example');
        },
        { timeout: 0 },
      ),
    ).rejects.toThrow(`Expected: `);
  });

  it('waitSubscribeSuccess should not throw error when never emit, but inner be pass', async () => {
    const result = await waitSubscribeSuccess(
      NEVER,
      (val) => {
        expect(true).toBeTruthy();
      },
      { timeout: 0 },
    );

    expect(result).toBeUndefined();
  });
});

describe('timer check', () => {
  test('real', async () => {
    const obs$ = interval(1000).pipe(filter((x) => x > 2));

    await waitSubscribeSuccess(obs$, (e) => {
      expect(e).toBe(3);
    });
  });
  test('fake', async () => {
    const obs$ = interval(1000).pipe(filter((x) => x > 2));

    jest.useFakeTimers();

    await waitSubscribeSuccess(obs$, (e) => {
      expect(e).toBe(3);
    });

    jest.useRealTimers();
  });
});

describe('async check', () => {
  test('async callback', async () => {
    const obs$ = of(3);

    const result = await waitSubscribeSuccess(obs$, async (e) => {
      expect(e).toBe(3);
      return 'test';
    });

    expect(result).toBe('test');
  });
});
