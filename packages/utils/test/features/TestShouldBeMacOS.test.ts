import { getOsInfo } from '../../src/utils/getOsInfo';

describe('Test getOsInfo should be correct for apple devices', () => {
  it('should be detected as MacOS still for Mac', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        platform: 'MacIntel',
        maxTouchPoints: 0,
      },
      configurable: true,
    });

    expect(getOsInfo().OS).toBe('MacOS');
  });
});
