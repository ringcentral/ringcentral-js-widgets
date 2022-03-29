import { permissionsMessages } from '../../enums/permissionsMessages';
import { sleep } from '../../lib/sleep';
import * as mock from '../mock';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import { containsErrorMessage, ensureLogin } from '../utils/HelpUtil';

export default (auth, client, extensionInfo, account, alert) => {
  describe('ExtensionInfo:', () => {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    afterEach(async () => {
      if (auth.loggedIn) {
        await auth.logout();
      }

      await sleep(1000);
    });

    it('Should load info successfully', async () => {
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
      expect(extensionInfo.info.extensionNumber).equal('101');
    });

    it('Should show insufficientPrivilege when get 403', async () => {
      mock.restore();
      mock.mockForLogin({ mockExtensionInfo: false });
      mock.mockForbidden({ path: '/restapi/v1.0/account/~/extension/~' });
      await auth.login({
        ...account,
      });

      await sleep(3000);
      expect(auth.loggedIn).equal(false);
      expect(
        containsErrorMessage(
          alert.state.messages,
          permissionsMessages.insufficientPrivilege,
        ),
      ).to.not.equal(undefined);
    });
  });
};
