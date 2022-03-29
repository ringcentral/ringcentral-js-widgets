import { sleep } from '../../lib/sleep';
import * as mock from '../mock';
import { ensureLogin } from '../utils/HelpUtil';

/** global describe */

export default ({
  auth,
  alert,
  client,
  presence,
  availabilityMonitor,
  messageStore,
  callLog,
  account,
}) => {
  describe('AvailabilityMonitor:', () => {
    this.timeout(20000);
    mock.mockClient(client);
    let isLoginSuccess;

    beforeEach(async () => {
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

    afterEach(async () => {
      availabilityMonitor._switchToNormalMode();
      mock.logout();
      await auth.logout();
      localStorage.clear();
      await sleep(1000);
    });

    it('should switch to limited availability mode when user action occurs limited availability error', async () => {
      mock.mockLimited({
        method: 'PUT',
        path: '/restapi/v1.0/account/~/extension/~/presence',
      });
      // expect(presence.setBusy).to.throw();
      await presence.setBusy();
      expect(availabilityMonitor.isLimitedAvailabilityMode).equal(true);
    });

    it('should switch to limited availability mode when background long polling occurs limited availability error', async () => {
      mock.restore();
      mock.mockLimited({
        method: 'GET',
        url: 'begin:http://whatever/restapi/v1.0/account/~/extension/~/call-log-sync',
      });
      await callLog._sync('ISync');
      expect(availabilityMonitor.isLimitedAvailabilityMode).equal(true);
    });

    it('should stay in limited availability mode when health check returns 5xx', async () => {
      mock.restore();
      mock.mockLimited({
        method: 'GET',
        url: 'begin:http://whatever/restapi/v1.0/account/~/extension/~/call-log-sync',
      });
      mock.mockLimited({
        method: 'GET',
        path: '/restapi/v1.0/status',
      });
      await callLog._sync('ISync');
      expect(availabilityMonitor.isLimitedAvailabilityMode).equal(true);
      await sleep(1000 * 15);

      expect(availabilityMonitor.isLimitedAvailabilityMode).equal(true);
    });

    it('should switch to normal mode when health check returns 200', async () => {
      // this.timeout(20000);
      mock.restore();
      mock.mockLimited({
        method: 'GET',
        url: 'begin:http://whatever/restapi/v1.0/account/~/extension/~/call-log-sync',
      });
      mock.mockApi({
        method: 'GET',
        path: '/restapi/v1.0/status',
      });
      await callLog._sync('ISync');
      expect(availabilityMonitor.isLimitedAvailabilityMode).equal(true);

      await sleep(1000 * 15);
      expect(availabilityMonitor.isLimitedAvailabilityMode).equal(false);
    });
  });
};
