import { sleep } from '../../lib/sleep';
import { subscriptionStatus } from '../../modules/Subscription/subscriptionStatus';
import * as mock from '../mock';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import { ensureLogin } from '../utils/HelpUtil';

export default (auth, client, subscription, account) => {
  describe('Subscription:', () => {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);
    beforeEach(async () => {
      localStorage.clear();
    });
    afterEach(async () => {
      if (auth.loggedIn) {
        await auth.logout();
      }

      await sleep(1000);
    });
    it('Should create subscription successfully', async () => {
      mock.restore();
      mock.mockForLogin();
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error(
          'Skip test case as failed to login with credential ',
          account,
        );
        this.skip();
      }
      this.retries(2);
      await sleep(3000);
      expect(subscription.subscriptionStatus).equal(
        subscriptionStatus.subscribed,
      );
      expect(subscription._subscription).not.equal(null);
    });
    it('Should reset cache subscription to null when subscribe error', async () => {
      mock.restore();
      mock.mockForbidden({
        method: 'POST',
        url: 'begin:http://whatever/restapi/v1.0/subscription',
      });
      mock.mockForLogin({ mockSubscription: false });
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error(
          'Skip test case as failed to login with credential ',
          account,
        );
        this.skip();
      }

      await sleep(3000);
      expect(subscription.subscriptionStatus).equal(
        subscriptionStatus.notSubscribed,
      );
      expect(subscription.cachedSubscription).equal(null);
    });
  });
};
