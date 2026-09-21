import type { Circus } from '@jest/types';
import { addEventHandler, removeEventHandler } from 'jest-circus';

const webSocketClosedMessage = 'WebSocket has been closed';

const isWebSocketClosedError = (error: unknown) =>
  error === webSocketClosedMessage ||
  (error as { message?: string })?.message === webSocketClosedMessage;

const removeWebSocketClosedErrors = (errors: unknown[]) => {
  return errors.filter((error) => {
    const [originalError] = Array.isArray(error) ? error : [error];

    return !isWebSocketClosedError(originalError);
  });
};

const clearCircusWebSocketClosedErrors = (state: Circus.State) => {
  const { currentlyRunningTest } = state;
  const rejectionMaps = [
    state.unhandledRejectionErrorByPromise,
    currentlyRunningTest?.unhandledRejectionErrorByPromise,
  ].filter(Boolean);

  rejectionMaps.forEach((rejections) => {
    rejections.forEach((error, promise) => {
      if (isWebSocketClosedError(error)) {
        rejections.delete(promise);
      }
    });
  });
  if (currentlyRunningTest) {
    currentlyRunningTest.errors = removeWebSocketClosedErrors(
      currentlyRunningTest.errors,
    );
  }
  state.unhandledErrors.splice(
    0,
    state.unhandledErrors.length,
    ...removeWebSocketClosedErrors(state.unhandledErrors),
  );
};

export function skipWebSocketClosedError() {
  const originalConsoleWarn = console.warn;
  const skipWebSocketClosedEvent = (event: Event) => {
    const {
      error,
      message: eventMessage,
      reason,
    } = event as ErrorEvent & PromiseRejectionEvent;

    if (
      eventMessage === webSocketClosedMessage ||
      isWebSocketClosedError(error) ||
      isWebSocketClosedError(reason)
    ) {
      event.preventDefault();
    }
  };
  const skipWebSocketClosedCircusError: Circus.EventHandler = (
    event,
    state,
  ) => {
    if (event.name !== 'error') {
      return;
    }

    clearCircusWebSocketClosedErrors(state);
  };

  const warnSpy = jest.spyOn(console, 'warn').mockImplementation((...args) => {
    if (
      args.includes('[onWebphoneRegistered]') &&
      args.some(isWebSocketClosedError)
    ) {
      return;
    }

    originalConsoleWarn(...args);
  });

  globalThis.addEventListener('error', skipWebSocketClosedEvent);
  globalThis.addEventListener('unhandledrejection', skipWebSocketClosedEvent);
  addEventHandler(skipWebSocketClosedCircusError);

  afterAll(() => {
    globalThis.removeEventListener('error', skipWebSocketClosedEvent);
    globalThis.removeEventListener(
      'unhandledrejection',
      skipWebSocketClosedEvent,
    );
    removeEventHandler(skipWebSocketClosedCircusError);
    warnSpy.mockRestore();
  });
}
