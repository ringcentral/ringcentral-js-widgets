import * as mock from '../mock';
import authzProfileBody from '../mock/data/authzProfile';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import { ensureLogin } from '../utils/HelpUtil';
import { waitInSeconds } from '../utils/WaitUtil';

export default (auth, client, blockedNumber, account) => {
  describe('BlockedNumber:', () => {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    afterEach(async () => {
      await auth.logout();
      await waitInSeconds(1);
    });

    it('Should load numbers when there is ReadBlockedNumbers permission', async () => {
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
      await waitInSeconds(1);
      expect(blockedNumber.numbers.length).equal(1);
    });

    it("Should not load numbers when there isn't ReadBlockedNumbers permission", async () => {
      mock.restore();
      mock.mockForLogin({ mockAuthzProfile: false });
      mock.authzProfile({
        permissions: authzProfileBody.permissions.filter(
          (p) => p.permission.id !== 'ReadBlockedNumbers',
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
      await waitInSeconds(1);
      expect(blockedNumber.numbers.length).equal(0);
    });
  });
};
