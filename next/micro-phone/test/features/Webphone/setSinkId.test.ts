import {
  isSetSinkIdUserGestureError,
  isSinkIdPermissionError,
  patchSafariSetSinkId,
  setSinkIdSafely,
  shouldSetSinkId,
  type SinkIdMediaElement,
} from '../../../src/app/services/Webphone/setSinkId';

function createMediaElement(
  overrides: Partial<SinkIdMediaElement> = {},
): SinkIdMediaElement {
  return {
    ...document.createElement('audio'),
    ...overrides,
  };
}

describe('setSinkId', () => {
  let originalSetSinkIdDescriptor: PropertyDescriptor | undefined;
  let originalUserAgentDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    originalSetSinkIdDescriptor = Object.getOwnPropertyDescriptor(
      HTMLMediaElement.prototype,
      'setSinkId',
    );
    originalUserAgentDescriptor = Object.getOwnPropertyDescriptor(
      window.navigator,
      'userAgent',
    );
  });

  afterEach(() => {
    if (originalSetSinkIdDescriptor) {
      Object.defineProperty(
        HTMLMediaElement.prototype,
        'setSinkId',
        originalSetSinkIdDescriptor,
      );
    } else {
      delete (HTMLMediaElement.prototype as any).setSinkId;
    }

    if (originalUserAgentDescriptor) {
      Object.defineProperty(
        window.navigator,
        'userAgent',
        originalUserAgentDescriptor,
      );
    } else {
      delete (window.navigator as any).userAgent;
    }
  });

  function mockSetSinkId(setSinkId: jest.Mock) {
    Object.defineProperty(HTMLMediaElement.prototype, 'setSinkId', {
      configurable: true,
      writable: true,
      value: setSinkId,
    });
  }

  function mockUserAgent(userAgent: string) {
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: userAgent,
    });
  }

  describe('shouldSetSinkId', () => {
    it('should skip when setSinkId is not supported', () => {
      const mediaElement = createMediaElement();

      expect(shouldSetSinkId(mediaElement, 'speaker-id')).toBe(false);
    });

    it('should skip browser default output when the element already uses the default sink', () => {
      const mediaElement = createMediaElement({
        sinkId: '',
        setSinkId: jest.fn(),
      });

      expect(shouldSetSinkId(mediaElement, 'default')).toBe(false);
    });

    it('should skip when the target sink is already applied', () => {
      const mediaElement = createMediaElement({
        sinkId: 'speaker-id',
        setSinkId: jest.fn(),
      });

      expect(shouldSetSinkId(mediaElement, 'speaker-id')).toBe(false);
    });

    it('should apply a non-default sink when setSinkId is available', () => {
      const mediaElement = createMediaElement({
        sinkId: '',
        setSinkId: jest.fn(),
      });

      expect(shouldSetSinkId(mediaElement, 'speaker-id')).toBe(true);
    });
  });

  describe('setSinkIdSafely', () => {
    it('should not call setSinkId for the browser default output', () => {
      const setSinkId = jest.fn();
      const mediaElement = createMediaElement({
        sinkId: '',
        setSinkId,
      });

      setSinkIdSafely(mediaElement, 'default');

      expect(setSinkId).not.toHaveBeenCalled();
    });

    it('should catch rejected setSinkId promises', async () => {
      const error = new DOMException(
        'A user gesture is required',
        'NotAllowedError',
      );
      const onError = jest.fn();
      const mediaElement = createMediaElement({
        sinkId: '',
        setSinkId: jest.fn().mockRejectedValue(error),
      });

      setSinkIdSafely(mediaElement, 'speaker-id', onError);
      await Promise.resolve();

      expect(onError).toHaveBeenCalledWith(error);
    });

    it('should catch synchronous setSinkId errors', () => {
      const error = new Error('setSinkId failed');
      const onError = jest.fn();
      const mediaElement = createMediaElement({
        sinkId: '',
        setSinkId: jest.fn(() => {
          throw error;
        }),
      });

      setSinkIdSafely(mediaElement, 'speaker-id', onError);

      expect(onError).toHaveBeenCalledWith(error);
    });
  });

  describe('isSinkIdPermissionError', () => {
    it('should return true for NotAllowedError DOMException', () => {
      expect(
        isSinkIdPermissionError(
          new DOMException('A user gesture is required', 'NotAllowedError'),
        ),
      ).toBe(true);
    });

    it('should return false for other errors', () => {
      expect(isSinkIdPermissionError(new Error('failed'))).toBe(false);
    });
  });

  describe('patchSafariSetSinkId', () => {
    it('should swallow Safari setSinkId user gesture rejections', async () => {
      const error = {
        name: 'NotAllowedError',
        message: 'A user gesture is required',
      };
      const setSinkId = jest.fn().mockRejectedValue(error);
      mockSetSinkId(setSinkId);
      mockUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Safari/605.1.15',
      );

      expect(patchSafariSetSinkId()).toBe(true);

      await expect(
        (document.createElement('audio') as any).setSinkId(''),
      ).resolves.toBeUndefined();
      expect(setSinkId).toHaveBeenCalledWith('');
    });

    it('should leave non-Safari browsers unchanged', () => {
      const setSinkId = jest.fn();
      mockSetSinkId(setSinkId);
      mockUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      );

      expect(patchSafariSetSinkId()).toBe(false);
      expect((HTMLMediaElement.prototype as any).setSinkId).toBe(setSinkId);
    });

    it('should leave non-configurable setSinkId implementations unchanged', () => {
      const originalHTMLMediaElement = globalThis.HTMLMediaElement;
      const setSinkId = jest.fn();
      function MockHTMLMediaElement() {
        //
      }

      Object.defineProperty(MockHTMLMediaElement.prototype, 'setSinkId', {
        value: setSinkId,
      });
      Object.defineProperty(globalThis, 'HTMLMediaElement', {
        configurable: true,
        value: MockHTMLMediaElement as unknown as typeof HTMLMediaElement,
      });
      mockUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Safari/605.1.15',
      );

      try {
        expect(patchSafariSetSinkId()).toBe(false);
        expect((globalThis.HTMLMediaElement.prototype as any).setSinkId).toBe(
          setSinkId,
        );
      } finally {
        Object.defineProperty(globalThis, 'HTMLMediaElement', {
          configurable: true,
          value: originalHTMLMediaElement,
        });
      }
    });

    it('should keep unexpected setSinkId errors visible', async () => {
      const error = new Error('setSinkId failed');
      const setSinkId = jest.fn().mockRejectedValue(error);
      mockSetSinkId(setSinkId);
      mockUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Safari/605.1.15',
      );

      patchSafariSetSinkId();

      await expect(
        (document.createElement('audio') as any).setSinkId('speaker-id'),
      ).rejects.toBe(error);
    });

    it('should recognize Safari user gesture setSinkId errors', () => {
      expect(
        isSetSinkIdUserGestureError({
          name: 'NotAllowedError',
          message: 'A user gesture is required',
        }),
      ).toBe(true);
      expect(isSetSinkIdUserGestureError(new Error('setSinkId failed'))).toBe(
        false,
      );
    });
  });
});
