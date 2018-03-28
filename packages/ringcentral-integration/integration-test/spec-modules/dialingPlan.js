import { ensureLogin } from '../utils/HelpUtil';
import { waitInSeconds } from '../utils/WaitUtil';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import * as mock from '../mock';

const authzProfileBody = require('../mock/data/authzProfile');

export default (auth, client, dialingPlan, account) => {
  describe('DialingPlan:', function () {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    afterEach(async function () {
      auth.logout();
      await waitInSeconds(1);
    });

    it('Should load availableExtensions when there is ReadExtensions permission', async () => {
      mock.restore();
      mock.mockForLogin();
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error('Skip test case as failed to login with credential ', account);
        this.skip();
      }
      this.retries(2);
      await waitInSeconds(1);
      expect(dialingPlan.plans.length).equal(3);
    });
  });
};
