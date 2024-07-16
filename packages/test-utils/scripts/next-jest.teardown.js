/* eslint-disable no-undef */
import { WS } from 'jest-websocket-mock';

import { jestFakeTimersAreEnabled } from '../lib/jestFakeTimersAreEnabled';

import { createTimerHandler } from './utils/teardownTimer';

const timerHandler = createTimerHandler();
beforeEach(() => {
  timerHandler.start();
});

afterEach(async () => {
  // always reset fake timer to real timer to avoid jest not throw error
  if (jestFakeTimersAreEnabled()) {
    jest.useRealTimers();
  }

  if (global.instance) {
    const {
      app,
      rcMock,
      autoLogout = true,
      autoFlush = true,
      autoPurge = true,
    } = global.instance;
    if (app?.modules) {
      app.modules.Webphone?._webphone?.userAgent.removeAllListeners();
      if (app.modules.Auth?.loggedIn && autoLogout) {
        try {
          await app.modules.Auth.logout({ reason: 'teardown' });
          // wait for logout success or jest timeout
          await new Promise((resolve) => {
            const timerId = setInterval(() => {
              if (!app.modules.Auth.loggedIn) {
                clearInterval(timerId);
                resolve(null);
              }
            }, 100);
          });
        } catch (error) {
          // ignore any error
          global.log?.(error);
        }
      }
      // make sure all storage write done
      if (autoFlush) {
        await app.modules.Storage?.flush();
      }

      // Clear all storage module data
      if (autoPurge) {
        await app.modules.Storage?.purge();
        global.localStorage.clear();
      }
      app.destroy();
    }

    rcMock?.reset();
    app?.unmount?.();
  }

  if (window.analytics) {
    window.analytics.invoked = false;
  }

  if (!window.wsCleanDisabled) {
    WS.clean();
  }

  timerHandler.clear();
  global.instance = {};
});
