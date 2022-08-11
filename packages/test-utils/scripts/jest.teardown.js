/* eslint-disable no-undef */
import WS from 'jest-websocket-mock';

// TODO: refactor for splitting logic
afterEach(async () => {
  if (global.instance) {
    const { phone = {}, app, rcMock, autoLogout = true } = global.instance;
    phone.webphone?._webphone?.userAgent.removeAllListeners();
    if (phone.auth?.loggedIn && autoLogout) {
      await phone.auth.logout();
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
    app?.unmount();
  }
  if (window.analytics) {
    window.analytics.invoked = false;
  }
  // TODO: remove it after removing `ringcentral-integration/integration-test`
  try {
    global.webSocketServer?.close();
    WS?.clean();
  } catch (e) {
    console.error(e);
  }
  global.instance = {};
});
