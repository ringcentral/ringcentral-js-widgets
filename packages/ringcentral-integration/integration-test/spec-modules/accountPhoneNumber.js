import { ensureLogin } from '../utils/HelpUtil';
import { waitInSeconds } from '../utils/WaitUtil';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import * as mock from '../mock';

const authzProfileBody = require('../mock/data/authzProfile');

export default (auth, client, accountPhoneNumber, account) => {
  describe('AccountPhoneNumber:', function () {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    describe('when there is ReadCompanyPhoneNumbers permission:', function () {
      before(async function() {
        mock.restore();
        mock.mockForLogin();
        isLoginSuccess = await ensureLogin(auth, account);
        if (!isLoginSuccess) {
          console.error('Skip test case as failed to login with credential ', account);
          this.skip();
        }
      });

      after(async function () {
        await auth.logout();
        await waitInSeconds(1);
      });

      it('Should load numbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(accountPhoneNumber.numbers.length).equal(2);
      });

      it('Should get extensionToPhoneNumberMap', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(Object.keys(accountPhoneNumber.extensionToPhoneNumberMap).length).equal(2);
      });
    });

    describe("when there isn't ReadCompanyPhoneNumbers permission:", function () {
      before(async function() {
        mock.restore();
        mock.mockForLogin({ mockAuthzProfile: false });
        mock.authzProfile({
          permissions: authzProfileBody.permissions.filter(p => p.permission.id !== 'ReadCompanyPhoneNumbers')
        });
        isLoginSuccess = await ensureLogin(auth, account);
        if (!isLoginSuccess) {
          console.error('Skip test case as failed to login with credential ', account);
          this.skip();
        }
      });

      after(async function () {
        await auth.logout();
        await waitInSeconds(1);
      });

      it('Should not load numbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(accountPhoneNumber.numbers.length).equal(0);
      });

      it('Should not get extensionToPhoneNumberMap', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(Object.keys(accountPhoneNumber.extensionToPhoneNumberMap).length).equal(0);
      });
    });
  });
};
