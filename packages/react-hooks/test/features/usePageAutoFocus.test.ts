import { mockAllLogs } from '@ringcentral-integration/test-utils';
import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { usePageAutoFocus } from '../../src/usePageAutoFocus';

beforeEach(() => {
  mockAllLogs();
});

describe('usePageAutoFocus', () => {
  let mockRef: { current: HTMLElement };

  beforeEach(() => {
    mockRef = { current: document.createElement('input') };
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should focus on the target element when the document has focus', () => {
    jest.spyOn(document, 'hasFocus').mockReturnValue(true);
    const focusSpy = jest.spyOn(mockRef.current, 'focus');

    const { unmount } = renderHook(() => usePageAutoFocus(mockRef));

    expect(focusSpy).toHaveBeenCalledTimes(1);
    unmount();
  });

  it('should not focus on the target element when the document does not have focus', () => {
    jest.spyOn(document, 'hasFocus').mockReturnValue(false);
    const focusSpy = jest.spyOn(mockRef.current, 'focus');

    const { unmount } = renderHook(() => usePageAutoFocus(mockRef));

    expect(focusSpy).not.toHaveBeenCalled();
    unmount();
  });

  it('should focus on the target element when the window receives focus and no element is focused', () => {
    jest.spyOn(document, 'hasFocus').mockReturnValue(false);
    const focusSpy = jest.spyOn(mockRef.current, 'focus');
    document.body.focus();

    const { unmount } = renderHook(() => usePageAutoFocus(mockRef));

    fireEvent.focus(window);
    expect(focusSpy).not.toHaveBeenCalled();
    jest.runAllTimers();

    expect(focusSpy).toHaveBeenCalledTimes(1);
    unmount();
  });

  it('should not focus on the target element when the window receives focus but another element is already focused', () => {
    jest.spyOn(document, 'hasFocus').mockReturnValue(false);

    const anotherElement = document.createElement('button');
    document.body.appendChild(anotherElement);
    anotherElement.focus();

    const focusSpy = jest.spyOn(mockRef.current, 'focus');

    const { unmount } = renderHook(() => usePageAutoFocus(mockRef));

    fireEvent.focus(window);
    expect(focusSpy).not.toHaveBeenCalled();
    jest.runAllTimers();

    expect(focusSpy).not.toHaveBeenCalled();
    unmount();
  });

  it('should show warning when target is not exist, and not call hasFocus', () => {
    jest.spyOn(document, 'hasFocus').mockClear();
    const { unmount } = renderHook(() => usePageAutoFocus({ current: null }));

    expect(console.warn).toHaveBeenCalledWith(
      '[usePageAutoFocus] target element is not found, please make sure the target element is rendered when you use this hook',
    );

    expect(document.hasFocus).not.toHaveBeenCalled();
    unmount();
  });
});
