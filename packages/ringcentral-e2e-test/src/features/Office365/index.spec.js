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
import {LoginCTI} from 'ringcentral-e2e-test/src/steps/Commons/login';
import skipGuide from 'ringcentral-e2e-test/src/steps/Commons/skipGuide';
import Entry from '../../steps/entry';

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
});

describe('O365 contact flow: =====>', () => {
  test({
    title: 'O365 authorization flow(click authorization on setting panel)',
    tags: [
      ['office'],
    ],
    brands: ['rc', 'bt', 'att', 'telus'],
    levels: ['p0'],
    options: [{
      authSuccess: 'Authorized Account',
      appNames: {
        rc: 'RingCentral for Office365',
        att: 'Office@Hand for Office365',
        bt: 'BT Cloud Phone for Office365',
        telus: 'TELUS Business Connect for Office365',
      }
    }],
  }, async (...args) => {
    const process = createProcess(
      Entry,
      LoginCTI,
      skipGuide,
      AuthorizeOffice
    )(context);

    await process.exec();
    await sleep(2000);

    await caseO365Contacts(...args);
    await caseAuthorizePanel(...args);
  });
});
