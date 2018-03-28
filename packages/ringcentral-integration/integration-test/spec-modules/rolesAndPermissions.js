import { ensureLogin, containsErrorMessage } from '../utils/HelpUtil';
import { waitInSeconds } from '../utils/WaitUtil';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import * as mock from '../mock';

import permissionsMessages from '../../modules/RolesAndPermissions/permissionsMessages';

const authzProfileBody = require('../mock/data/authzProfile');

export default (auth, client, rolesAndPermissions, account, alert) => {
  describe('AccountExtension:', function () {
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

    it('Should load permissions successfully', async () => {
      mock.restore();
      mock.mockForLogin();
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error('Skip test case as failed to login with credential ', account);
        this.skip();
      }
      this.retries(2);
      await waitInSeconds(1);
      expect(rolesAndPermissions.permissions.ReadUserInfo).equal(true);
    });

    it('Should not include ReadExtensions permission', async () => {
      mock.restore();
      mock.mockForLogin({ mockAuthzProfile: false });
      mock.authzProfile({
        permissions: authzProfileBody.permissions.filter(p => p.permission.id !== 'ReadExtensions')
      });
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error('Skip test case as failed to login with credential ', account);
        this.skip();
      }
      this.retries(2);
      await waitInSeconds(1);
      expect(rolesAndPermissions.permissions.ReadExtensions).equal(undefined);
    });

    it('Should show insufficientPrivilege when get 403', async () => {
      mock.restore();
      mock.mockForLogin({ mockAuthzProfile: false });
      mock.mockForbidden({ path: '/restapi/v1.0/account/~/extension/~/authz-profile' });
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
