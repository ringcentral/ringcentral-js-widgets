import { polyfillGetUserMedia } from './AudioSettings';

describe('polyfillGetUserMedia', () => {
  let originalMediaDevices: MediaDevices | undefined;
  let originalGetUserMedia: Navigator['getUserMedia'] | undefined;
  let originalWebkitGetUserMedia: unknown;
  let originalMozGetUserMedia: unknown;

  beforeEach(() => {
    // Save original values
    originalMediaDevices = navigator.mediaDevices;
    // @ts-ignore
    originalGetUserMedia = navigator.getUserMedia;
    originalWebkitGetUserMedia = (navigator as any).webkitGetUserMedia;
    originalMozGetUserMedia = (navigator as any).mozGetUserMedia;
  });

  afterEach(() => {
    // Restore original values
    Object.defineProperty(navigator, 'mediaDevices', {
      value: originalMediaDevices,
      writable: true,
      configurable: true,
    });
    // @ts-ignore
    navigator.getUserMedia = originalGetUserMedia;
    (navigator as any).webkitGetUserMedia = originalWebkitGetUserMedia;
    (navigator as any).mozGetUserMedia = originalMozGetUserMedia;
  });

  describe('navigator.mediaDevices polyfill', () => {
    it('should create mediaDevices object when undefined', () => {
      // Set mediaDevices to undefined
      Object.defineProperty(navigator, 'mediaDevices', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      polyfillGetUserMedia();

      expect(navigator.mediaDevices).toBeDefined();
      expect(typeof navigator.mediaDevices).toBe('object');
    });

    it('should not modify mediaDevices when already defined', () => {
      const existingMediaDevices = {
        getUserMedia: jest.fn(),
      } as unknown as MediaDevices;
      Object.defineProperty(navigator, 'mediaDevices', {
        value: existingMediaDevices,
        writable: true,
        configurable: true,
      });

      polyfillGetUserMedia();

      expect(navigator.mediaDevices).toBe(existingMediaDevices);
    });
  });

  describe('legacy getUserMedia fallback', () => {
    beforeEach(() => {
      // Clear all getUserMedia implementations
      // @ts-ignore
      navigator.getUserMedia = undefined;
      (navigator as any).webkitGetUserMedia = undefined;
      (navigator as any).mozGetUserMedia = undefined;
    });

    it('should use existing navigator.getUserMedia if available', () => {
      const mockGetUserMedia = jest.fn();
      // @ts-ignore
      navigator.getUserMedia = mockGetUserMedia;

      polyfillGetUserMedia();

      // @ts-ignore
      expect(navigator.getUserMedia).toBe(mockGetUserMedia);
    });

    it('should fallback to webkitGetUserMedia if getUserMedia is undefined', () => {
      const mockWebkitGetUserMedia = jest.fn();
      (navigator as any).webkitGetUserMedia = mockWebkitGetUserMedia;

      polyfillGetUserMedia();

      // @ts-ignore
      expect(navigator.getUserMedia).toBe(mockWebkitGetUserMedia);
    });

    it('should fallback to mozGetUserMedia if others are undefined', () => {
      const mockMozGetUserMedia = jest.fn();
      (navigator as any).mozGetUserMedia = mockMozGetUserMedia;

      polyfillGetUserMedia();

      // @ts-ignore
      expect(navigator.getUserMedia).toBe(mockMozGetUserMedia);
    });

    it('should use first available in priority order: getUserMedia > webkitGetUserMedia > mozGetUserMedia', () => {
      const mockGetUserMedia = jest.fn();
      const mockWebkitGetUserMedia = jest.fn();
      const mockMozGetUserMedia = jest.fn();

      // @ts-ignore
      navigator.getUserMedia = mockGetUserMedia;
      (navigator as any).webkitGetUserMedia = mockWebkitGetUserMedia;
      (navigator as any).mozGetUserMedia = mockMozGetUserMedia;

      polyfillGetUserMedia();

      // @ts-ignore
      expect(navigator.getUserMedia).toBe(mockGetUserMedia);
    });
  });

  describe('mediaDevices.getUserMedia polyfill', () => {
    beforeEach(() => {
      // Ensure mediaDevices exists but without getUserMedia
      Object.defineProperty(navigator, 'mediaDevices', {
        value: {},
        writable: true,
        configurable: true,
      });
    });

    it('should polyfill mediaDevices.getUserMedia when undefined and legacy getUserMedia exists', () => {
      const mockLegacyGetUserMedia = jest.fn();
      // @ts-ignore
      navigator.getUserMedia = mockLegacyGetUserMedia;

      polyfillGetUserMedia();

      expect(navigator.mediaDevices.getUserMedia).toBeDefined();
      expect(typeof navigator.mediaDevices.getUserMedia).toBe('function');
    });

    it('should not polyfill mediaDevices.getUserMedia when already defined', () => {
      const existingGetUserMedia = jest.fn().mockResolvedValue({});
      Object.defineProperty(navigator, 'mediaDevices', {
        value: { getUserMedia: existingGetUserMedia },
        writable: true,
        configurable: true,
      });

      polyfillGetUserMedia();

      expect(navigator.mediaDevices.getUserMedia).toBe(existingGetUserMedia);
    });

    it('should not polyfill mediaDevices.getUserMedia when no legacy getUserMedia exists', () => {
      // @ts-ignore
      navigator.getUserMedia = undefined;
      (navigator as any).webkitGetUserMedia = undefined;
      (navigator as any).mozGetUserMedia = undefined;

      polyfillGetUserMedia();

      expect(navigator.mediaDevices.getUserMedia).toBeUndefined();
    });
  });

  describe('polyfilled getUserMedia promise behavior', () => {
    let mockLegacyGetUserMedia: jest.Mock;
    const mockConstraints: MediaStreamConstraints = {
      audio: true,
      video: false,
    };
    const mockStream = { id: 'mock-stream' } as unknown as MediaStream;

    beforeEach(() => {
      mockLegacyGetUserMedia = jest.fn();
      // @ts-ignore
      navigator.getUserMedia = mockLegacyGetUserMedia;

      // Ensure mediaDevices exists but without getUserMedia
      Object.defineProperty(navigator, 'mediaDevices', {
        value: {},
        writable: true,
        configurable: true,
      });

      polyfillGetUserMedia();
    });

    it('should call legacy getUserMedia with correct arguments', async () => {
      mockLegacyGetUserMedia.mockImplementation(
        (constraints, successCallback) => {
          successCallback(mockStream);
        },
      );

      await navigator.mediaDevices.getUserMedia(mockConstraints);

      expect(mockLegacyGetUserMedia).toHaveBeenCalledWith(
        mockConstraints,
        expect.any(Function),
        expect.any(Function),
      );
    });

    it('should resolve with stream on success', async () => {
      mockLegacyGetUserMedia.mockImplementation(
        (constraints, successCallback) => {
          successCallback(mockStream);
        },
      );

      const result = await navigator.mediaDevices.getUserMedia(mockConstraints);

      expect(result).toBe(mockStream);
    });

    it('should reject with error on failure', async () => {
      const mockError = new Error('Permission denied');
      mockLegacyGetUserMedia.mockImplementation(
        (constraints, successCallback, errorCallback) => {
          errorCallback(mockError);
        },
      );

      await expect(
        navigator.mediaDevices.getUserMedia(mockConstraints),
      ).rejects.toBe(mockError);
    });

    it('should call legacy getUserMedia with navigator context', async () => {
      mockLegacyGetUserMedia.mockImplementation(
        function (this: Navigator, constraints, successCallback) {
          expect(this).toBe(navigator);
          successCallback(mockStream);
        },
      );

      await navigator.mediaDevices.getUserMedia(mockConstraints);

      expect(mockLegacyGetUserMedia.mock.instances[0]).toBe(navigator);
    });
  });
});
