import errorMessages from '../..//modules/RateLimiter/errorMessages';
import { containsErrorMessage, ensureLogin } from '../utils/HelpUtil';
import { waitUntilEqual } from '../utils/WaitUtil';

export default (auth, alert, account, client, rateLimiter) => {
  describe('RateLimiter', async function () {
    this.timeout(20000);
    let conditionalDescribe = describe;
    const isLoginSuccess = await ensureLogin(auth, account);
    if (!isLoginSuccess) {
      conditionalDescribe = describe.skip;
      console.error('Skip test case as failed to login with credential ', account);
    }
    conditionalDescribe('Should Allow Alert', function() {
      this.timeout(20000);
      beforeEach(async function () {
        const isAlertClear = await waitUntilEqual(() => {
          alert.dismissAll();
          return alert.state.messages.length;
        }, 'Alert', 0, 5);
        if (!isAlertClear) {
          console.error('Alert is not cleared after dismissAll');
          this.skip();
        }
      });
      describe('Should Prompt Alerts when rateLimiter occurs', function() {
        it('Should Prompt Alert of rateLimiter', async function () {
          rateLimiter._requestErrorHandler(new Error('Request rate exceeded'));
          expect(containsErrorMessage(alert.state.messages, errorMessages.rateLimitReached)).to.not.equal(undefined);
        });
      });
    });
  });
};

