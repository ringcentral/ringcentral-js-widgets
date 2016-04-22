import { expect } from 'chai';
import config from '../config';

import RcPhone from '../src/rc-phone';

describe('rc-phone', async () => {
  it('should work', async () => {
    let phone = new RcPhone({
      sdkSettings: {
        ...config.sdk,
      },
      brandSettings: {
        ...config.brand
      }
    });
    await phone.auth.requestClientCredential();

    console.log('check: ', await phone.auth.loggedIn());

  });
});

