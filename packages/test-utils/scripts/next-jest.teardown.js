/* eslint-disable no-undef */
afterEach(async () => {
  if (global.instance) {
    const { app, rcMock, autoLogout = true } = global.instance;
    if (app?.modules) {
      app.modules.Webphone?._webphone?.userAgent.removeAllListeners();
      if (app.modules.Auth?.loggedIn && autoLogout) {
        await app.modules.Auth.logout();
        // wait for logout success or jest timeout
        await new Promise((resolve) => {
          const timerId = setInterval(() => {
            if (!app.modules.Auth.loggedIn) {
              clearInterval(timerId);
              resolve(null);
            }
          }, 100);
        });
      }
      app.destroy();
    }

    rcMock?.reset();
    app?.unmount();
  }

  if (window.analytics) {
    window.analytics.invoked = false;
  }

  global.instance = {};
});
