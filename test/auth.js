import { expect } from 'chai';
import config from '../config';

import RcPhone from '../src/rc-phone';

describe('Auth Test Suite', async function(done) {
  this.timeout(10000);
  let phone = new RcPhone({
    sdkSettings: {
      ...config.sdk,
    },
    brandSettings: {
      ...config.brand
    }
  });
  let auth = phone.auth;
  
  it('Login & Logout', async function() {
    await auth.login({...config.user});
    expect(await auth.getLoggedInStatus()).to.equal('loggedIn');
    await auth.logout();
    expect(await auth.getLoggedInStatus()).to.equal('notLoggedIn');
    setTimeout(done, 300);
  });
  
  it('Request client credentials', async function() {
    await auth.requestClientCredential();
    expect(await auth.getLoggedInStatus()).to.equal('loggedInWithClientCredential');
    setTimeout(done, 300);
  });
  
  it('Loin after request client credentials', async function() {
    await auth.login({...config.user});
    expect(await auth.getLoggedInStatus()).to.equal('loggedIn');
    setTimeout(done, 300);
  });
});

