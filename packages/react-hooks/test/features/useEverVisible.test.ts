import { renderHook } from '@testing-library/react-hooks';

import { useEverVisible } from '../../src/useEverVisible';

describe('useEverVisible', () => {
  let originalVisibilityState: string;

  beforeEach(() => {
    // Store original visibilityState
    originalVisibilityState = document.visibilityState;
  });

  afterEach(() => {
    // Restore original visibilityState
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return originalVisibilityState;
      },
    });
  });

  test('should return true if document is initially visible', () => {
    // Mock document to be visible initially
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'visible';
      },
    });

    const { result } = renderHook(() => useEverVisible());
    expect(result.current).toBe(true);
  });

  test('should return false if document is initially hidden', () => {
    // Mock document to be hidden initially
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'hidden';
      },
    });

    const { result } = renderHook(() => useEverVisible());
    expect(result.current).toBe(false);
  });

  test('should update to true when document becomes visible', () => {
    // Start with hidden state
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'hidden';
      },
    });

    const { result } = renderHook(() => useEverVisible());
    expect(result.current).toBe(false);

    // Change visibility to visible
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'visible';
      },
    });

    // Trigger visibilitychange event
    document.dispatchEvent(new Event('visibilitychange'));

    expect(result.current).toBe(true);
  });

  test('should not update after becoming visible once', () => {
    // Start with hidden state
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'hidden';
      },
    });

    const { result } = renderHook(() => useEverVisible());
    expect(result.current).toBe(false);

    // Change to visible
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'visible';
      },
    });
    document.dispatchEvent(new Event('visibilitychange'));
    expect(result.current).toBe(true);

    // Change back to hidden
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'hidden';
      },
    });
    document.dispatchEvent(new Event('visibilitychange'));

    // Should still be true as it tracks if it was "ever" visible
    expect(result.current).toBe(true);
  });
});
