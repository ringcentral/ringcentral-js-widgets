/* global describe it */
import RcPhone from '../src/rc-phone';
import config from '../config';
import { userEvents } from '../src/modules/user/user-events';

describe('rc-phone', async () => {
  it('should run', cb => {
    const phone = new RcPhone({
      sdkSettings: {
        ...config.sdk,
      },
      defaultBrand: {
        ...config.brand,
      },
    });
    const timer = setTimeout(async () => {
      await phone.auth.logout();
      cb();
    }, 10000);
    phone.user.on(userEvents.userInfoLoaded, async () => {
      clearTimeout(timer);
      await phone.auth.logout();
      cb();
    });
    phone.auth.login({
      ...config.user,
    });
  });
});
