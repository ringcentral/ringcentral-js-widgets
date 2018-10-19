/**
 * Tests here
 */
import caseO365Contacts from './contacts';
import { caseAuthorizePanel } from './oauth';

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
});

afterEach(async() => {
  await browser.close();
});

describe('O365 contact flow: =====>', () => {
  test({
    title: 'O365 authorization flow(click authorization on setting panel)',
    tags: [
      ['office', { brands: ['rc'] }],
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
      ['office', { brands: ['rc'] }],
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
