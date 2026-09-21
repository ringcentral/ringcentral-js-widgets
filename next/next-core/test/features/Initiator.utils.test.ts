import {
  getWorkerUrlFilename,
  isSameWorkerUrl,
} from '../../src/modules/Initiator.utils';

describe('Initiator worker URL utils', () => {
  describe('getWorkerUrlFilename', () => {
    it('gets the filename from absolute and relative worker URLs', () => {
      expect(
        getWorkerUrlFilename('https://example.com/app/assets/worker.123.js'),
      ).toBe('worker.123.js');
      expect(getWorkerUrlFilename('/app/assets/worker.123.js?v=1')).toBe(
        'worker.123.js',
      );
    });
  });

  describe('isSameWorkerUrl', () => {
    it('compares the full worker URL by default', () => {
      expect(
        isSameWorkerUrl({
          currentWorkerUrl: 'https://example.com/app/worker.123.js',
          receivedWorkerUrl: 'https://cdn.example.com/app/worker.123.js',
        }),
      ).toBe(false);
    });

    it('compares only the worker filename when enabled', () => {
      expect(
        isSameWorkerUrl({
          currentWorkerUrl: 'https://example.com/app/worker.123.js',
          receivedWorkerUrl: 'https://cdn.example.com/assets/worker.123.js',
          onlyComparisonWorkerFilename: true,
        }),
      ).toBe(true);
    });
  });
});
