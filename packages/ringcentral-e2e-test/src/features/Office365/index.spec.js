/**
 * FIXME: Due to our company's VPN's high packet loss rate when visiting `easofficehome.msocdn.com`,
 * we choose to run the cases sequentially.
 * Need to change the solution to run the cases parallelly when deploy to the CI server in the future.
 */
/* global $, page, browser, driver, context */

import {
  createProcess
} from 'marten';
import sleep from 'ringcentral-integration/lib/sleep';

import caseO365Contacts from './contacts';
import {
  caseAuthorizePanel
} from './oauth';
import AuthorizeOffice from '../../steps/office/authorizeOffice';
import Login from '../../steps/office/login';
import Entry from '../../steps/entry';

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
    options: [{
      authSuccess: 'Authorized Account',
    }, ],
  }, async (...args) => {
    const process = createProcess(
      Entry,
      Login,
      AuthorizeOffice
    )(context);

    await process.exec();
    await sleep(2000);

    await caseO365Contacts(...args);
    await caseAuthorizePanel(...args);
  });
});
