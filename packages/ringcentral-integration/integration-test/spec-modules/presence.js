import { ensureLogin } from '../utils/HelpUtil';
import { waitInSeconds } from '../utils/WaitUtil';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import * as mock from '../mock';

const authzProfileBody = require('../mock/data/authzProfile');

export default (auth, client, presence, account) => {
  describe('Presence:', function () {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    afterEach(async function () {
      await auth.logout();
      await waitInSeconds(1);
    });

    it('Should load presenceStatus when there is ReadPresenceStatus permission', async () => {
      mock.restore();
      mock.mockForLogin();
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error('Skip test case as failed to login with credential ', account);
        this.skip();
      }
      this.retries(2);
      await waitInSeconds(1);
      expect(presence.presenceStatus).equal('Available');
    });

    it("Should not load presenceStatus when there isn't ReadPresenceStatus permission", async () => {
      mock.restore();
      mock.mockForLogin({ mockAuthzProfile: false });
      mock.authzProfile({
        permissions: authzProfileBody.permissions.filter(p => p.permission.id !== 'ReadPresenceStatus')
      });
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error('Skip test case as failed to login with credential ', account);
        this.skip();
      }
      this.retries(2);
      await waitInSeconds(1);
      expect(presence.presenceStatus).equal(null);
    });
  });
};
