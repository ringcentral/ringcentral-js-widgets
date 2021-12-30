import * as mock from '../mock';
import authzProfileBody from '../mock/data/authzProfile';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import { ensureLogin } from '../utils/HelpUtil';
import { waitInSeconds } from '../utils/WaitUtil';

export default (auth, client, extensionPhoneNumber, account) => {
  describe('ExtensionPhoneNumber:', () => {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    describe('When has ReadUserPhoneNumbers permission', () => {
      before(async () => {
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
      });

      after(async () => {
        await auth.logout();
        await waitInSeconds(1);
      });

      it('Should load numbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.numbers.length).equal(5);
      });

      it('Should load mainCompanyNumber', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.mainCompanyNumber.usageType).equal(
          'MainCompanyNumber',
        );
      });

      it('Should load companyNumbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.companyNumbers.length).equal(1);
      });

      it('Should load directNumbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.directNumbers.length).equal(3);
      });

      it('Should load callerIdNumbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.callerIdNumbers.length).equal(5);
      });

      it('Should load smsSenderNumbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.smsSenderNumbers.length).equal(5);
      });
    });

    describe("When doesn't have ReadUserPhoneNumbers permission", () => {
      before(async () => {
        mock.restore();
        mock.mockForLogin({ mockAuthzProfile: false });
        mock.authzProfile({
          permissions: authzProfileBody.permissions.filter(
            (p) => p.permission.id !== 'ReadUserPhoneNumbers',
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
      });

      after(async () => {
        await auth.logout();
        await waitInSeconds(1);
      });

      it('Should not load numbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.numbers.length).equal(0);
      });

      it('Should not load mainCompanyNumber', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.mainCompanyNumber).equal(undefined);
      });

      it('Should not load companyNumbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.companyNumbers.length).equal(0);
      });

      it('Should not load directNumbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.directNumbers.length).equal(0);
      });

      it('Should not load callerIdNumbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.callerIdNumbers.length).equal(0);
      });

      it('Should not load smsSenderNumbers', async () => {
        this.retries(2);
        await waitInSeconds(1);
        expect(extensionPhoneNumber.smsSenderNumbers.length).equal(0);
      });
    });
  });
};
