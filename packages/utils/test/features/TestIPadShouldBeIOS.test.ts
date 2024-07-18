import { getOsInfo } from '../../src/utils';

describe('Test getOsInfo should be correct for apple devices', () => {
  it('should be detected as iOS', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        platform: 'MacIntel',
        maxTouchPoints: 1, // iPad has touch points
      },
      configurable: true,
    });

    expect(getOsInfo().OS).toBe('iOS');
  });
});
