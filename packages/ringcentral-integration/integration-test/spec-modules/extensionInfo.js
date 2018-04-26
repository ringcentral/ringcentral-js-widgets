import { ensureLogin, containsErrorMessage } from '../utils/HelpUtil';
import { waitInSeconds } from '../utils/WaitUtil';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import * as mock from '../mock';
import permissionsMessages from '../../modules/RolesAndPermissions/permissionsMessages';

export default (auth, client, extensionInfo, account, alert) => {
  describe('ExtensionInfo:', function () {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    afterEach(async function () {
      if (auth.loggedIn) {
        await auth.logout();
      }
      await waitInSeconds(1);
    });

    it('Should load info successfully', async () => {
      mock.restore();
      mock.mockForLogin();
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error('Skip test case as failed to login with credential ', account);
        this.skip();
      }
      this.retries(2);
      await waitInSeconds(1);
      expect(extensionInfo.info.extensionNumber).equal('101');
    });

    it('Should show insufficientPrivilege when get 403', async () => {
      mock.restore();
      mock.mockForLogin({ mockExtensionInfo: false });
      mock.mockForbidden({ path: '/restapi/v1.0/account/~/extension/~' });
      await auth.login({
        ...account,
      });
      await waitInSeconds(3);
      expect(auth.loggedIn).equal(false);
      expect(containsErrorMessage(
        alert.state.messages, permissionsMessages.insufficientPrivilege
      )).to.not.equal(undefined);
    });
  });
};
