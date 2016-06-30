/* global describe it */
import RcPhone from '../src/rc-phone';
import config from '../config';
import userEvents from '../src/enums/user-events';

describe('rc-phone', async () => {
  it('should run', async () => {
    const phone = new RcPhone({
      sdkSettings: {
        ...config.sdk,
      },
      defaultBrand: {
        ...config.brand,
      },
    });
    await new Promise((resolve) => {
      const timer = setTimeout(async () => {
        await phone.auth.logout();
        resolve();
      }, 10000);
      phone.user.on(userEvents.userInfoLoaded, async () => {
        clearTimeout(timer);
        await phone.auth.logout();
        resolve();
      });
    });
    await phone.auth.login({
      ...config.user,
    });
  });
});
