import { expect } from 'chai';
import config from '../config';

import RcPhone from '../src/rc-phone';

describe('Auth Test Suite', async () => {
  let phone = new RcPhone({
    sdkSettings: {
      ...config.sdk,
    },
    brandSettings: {
      ...config.brand
    }
  });
  let auth = phone.auth;

  it('Login & Logout', async () => {
    await auth.login({...config.user});
    expect(await auth.getLoggedInStatus()).to.equal('loggedIn');
    await auth.logout();
    expect(await auth.getLoggedInStatus()).to.equal('notLoggedIn');
  });

  it('Request client credentials', async () => {
    await auth.requestClientCredential();
    expect(await auth.getLoggedInStatus()).to.equal('loggedInWithClientCredential');
  });

  it('Loin after request client credentials', async () => {
    await auth.login({...config.user});
    expect(await auth.getLoggedInStatus()).to.equal('loggedIn');
  });
});

