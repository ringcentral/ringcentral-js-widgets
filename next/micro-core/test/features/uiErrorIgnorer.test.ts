import { createMockAction } from '@ringcentral-integration/test-utils';

import { uiErrorIgnorer } from '../../src/app/views/AppRootView/uiErrorIgnorer';

describe('uiErrorIgnorer', () => {
  it('should filter and stop propagation for matching error messages', () => {
    const windowListenerSpy = createMockAction();
    jest
      .spyOn(global.window, 'addEventListener')
      .mockImplementation(windowListenerSpy.addListener);
    // ResizeObserver loop completed with undelivered notifications
    uiErrorIgnorer();

    const stopImmediatePropagationSpy = jest.fn();
    windowListenerSpy.action$.next([
      'error',
      {
        message: 'ResizeObserver loop completed with undelivered notifications',
        stopImmediatePropagation: stopImmediatePropagationSpy,
      },
    ]);

    expect(stopImmediatePropagationSpy).toHaveBeenCalled();
    stopImmediatePropagationSpy.mockClear();

    windowListenerSpy.action$.next([
      'error',
      {
        message: 'example',
        stopImmediatePropagation: stopImmediatePropagationSpy,
      },
    ]);

    expect(stopImmediatePropagationSpy).not.toHaveBeenCalled();

    windowListenerSpy.action$.next([
      'error',
      {
        message: 123123,
        stopImmediatePropagation: stopImmediatePropagationSpy,
      },
    ]);

    expect(stopImmediatePropagationSpy).not.toHaveBeenCalled();
  });
});
