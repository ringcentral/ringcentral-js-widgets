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
    const { phone = {}, app, rcMock, autoLogout = true } = global.instance;

    phone.webphone?._webphone?.userAgent.removeAllListeners();
    if (phone.auth?.loggedIn && autoLogout) {
      await phone.auth.logout();
      // TODO: same issue with next teardown, should find way to fix this
      // wait for logout success or jest timeout
      await new Promise((resolve) => {
        const timerId = setInterval(() => {
          if (!phone.auth.loggedIn) {
            clearInterval(timerId);
            resolve(null);
          }
        }, 100);
      });
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
