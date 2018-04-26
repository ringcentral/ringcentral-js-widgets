import { ensureLogin } from '../utils/HelpUtil';
import { waitInSeconds } from '../utils/WaitUtil';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import * as mock from '../mock';

const authzProfileBody = require('../mock/data/authzProfile');

export default (auth, client, forwardingNumber, account) => {
  describe('ForwardingNumber:', function () {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    // const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    describe('When has ReadUserForwardingFlipNumbers permission', function () {
      before(async function () {
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
        expect(forwardingNumber.numbers.length).equal(2);
      });

      it('Should get flip numbers correctly', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(forwardingNumber.flipNumbers.length).equal(2);
      });

      it('Should get forwarding numbers correctly', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(forwardingNumber.forwardingNumbers.length).equal(1);
      });
    });

    describe("When doesn't have ReadUserForwardingFlipNumbers permission", function () {
      before(async function () {
        mock.restore();
        mock.mockForLogin({ mockAuthzProfile: false });
        mock.authzProfile({
          permissions: authzProfileBody.permissions.filter(p => p.permission.id !== 'ReadUserForwardingFlipNumbers')
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
        expect(forwardingNumber.numbers.length).equal(0);
      });

      it('Should not load flip numbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(forwardingNumber.flipNumbers.length).equal(0);
      });

      it('Should not load forwarding numbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(forwardingNumber.forwardingNumbers.length).equal(0);
      });
    });

    it('Should show insufficientPrivilege when get 403', async () => {
      mock.restore();
      mock.mockForLogin({ mockForwardingNumber: false });
      mock.mockForbidden({ url: 'begin:http://whatever/restapi/v1.0/account/~/extension/~/forwarding-number' });
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error('Skip test case as failed to login with credential ', account);
        this.skip();
      }
      await waitInSeconds(1);
      expect(forwardingNumber.numbers.length).equal(0);
      await auth.logout();
      await waitInSeconds(1);
    });
  });
};
