import { sleep } from '../../lib/sleep';
import * as mock from '../mock';
import authzProfileBody from '../mock/data/authzProfile';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import { ensureLogin } from '../utils/HelpUtil';

export default (auth, client, presence, account) => {
  describe('Presence:', () => {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    afterEach(async () => {
      await auth.logout();

      await sleep(1000);
    });

    it('Should load presenceStatus when there is ReadPresenceStatus permission', async () => {
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

      await sleep(1000);
      expect(presence.presenceStatus).equal('Available');
    });

    it("Should not load presenceStatus when there isn't ReadPresenceStatus permission", async () => {
      mock.restore();
      mock.mockForLogin({ mockAuthzProfile: false });
      mock.authzProfile({
        permissions: authzProfileBody.permissions.filter(
          (p) => p.permission.id !== 'ReadPresenceStatus',
        ),
      });
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error(
          'Skip test case as failed to login with credential ',
          account,
        );
        this.skip();
      }
      this.retries(2);

      await sleep(1000);
      expect(presence.presenceStatus).equal(null);
    });
  });
};
