/**
 * FIXME: Due to our company's VPN's high packet loss rate when visiting `easofficehome.msocdn.com`,
 * we choose to run the cases sequentially.
 * Need to change the solution to run the cases parallelly when deploy to the CI server in the future.
 */
import caseO365Contacts from './contacts';
import { caseAuthorizePanel } from './oauth';

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
});

// afterEach(async() => {
// });

describe('O365 contact flow: =====>', () => {
  test({
    title: 'O365 authorization flow(click authorization on setting panel)',
    tags: [
      ['office'],
    ],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      {
        authSuccess: 'Authorized Account',
      },
    ],
  }, caseAuthorizePanel);
  test({
    title: 'O365 contact flow(click contact panel)',
    tags: [
      ['office'],
    ],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      {
        authSuccess: 'Authorized Account',
      },
    ],
  }, caseO365Contacts);
});
