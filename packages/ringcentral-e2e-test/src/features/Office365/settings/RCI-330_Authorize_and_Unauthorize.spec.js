/* RCI-330 Authorize and Unauthorize

http://einstein.int.ringcentral.com/?project=1309&suite=11037&case=11131

Summary:
  Goal:
    To verify user is able to authorize and unauthorize RingCentral for office 365

  User Story:
    RCINT-1403 [Office365] Incorrect name for authorize Office 365
    RCINT-8547  Authorize access permission from CTI to Office 365 account
    RCINT-9078 Show authorized account near authorize button

  Keywords:
    Functionality,Automated,Office365

  Preconditions:
    1. User should add and enable the RingCentral for Office365 on Chrome.
    2. User should didn't login the Office365.
    3. User should logined RC CTI app

    Account type(/s):  RC CA, RC US, RC UK, TELUS, BT,AT&T

    Extension type(/s):

    Entry point(/s):

    1. Go to Settings page

  Created By	samuel.huang
  Date Created	Tue, 06 Nov 2018 10:58:33
  Updated By	samuel.huang
  Date Updated	Mon, 19 Nov 2018 09:07:31
*/

import { createProcess } from '../../../steps';
import Entry from '../../../steps/entry';
import { LoginCTI } from '../../../steps/commons/login';
import Relogin from '../../../steps/commons/relogin';
import NavigateTo from '../../../steps/commons/navigateTo';
import NavigateToSettings from '../../../steps/commons/navigateToSettings';
import AuthorizeOffice from '../../../steps/office/authorizeOffice';
import UnauthorizeOffice from '../../../steps/office/unauthorizeOffice';

describe('Commom 3rd Party Authorize: =====>', () => {
  test({
    title: 'Authorize and Unauthorize in Settings Page',
    tags: [
      ['office'],
    ],
    levels: ['p1'],
    brands: [
      ['rc', { accounts: ['CM_RC_US'] }],
      ['bt', { accounts: ['CM_BT'] }],
      ['att', { username:'18665133464',password:'Test!123' }],
      ['telus', { accounts: ['CM_TELUS'] }],
    ],
    options: [{
      buttonTextWhenAuthorize: 'Unauthorize',
      buttonTextWhenUnauthorize: 'Authorize'
    }],
  }, async (context) => {
    const { page, options: { option, config: { officeAccout } } } = context;

    async function checkAuthorizePanelWhenUnauthorize() {
      expect(await NavigateToSettings.getUnauthorizedLogo(context)).toBeTruthy();
      expect(await NavigateToSettings.getAuthorizeButtonText(context)).toEqual(option.buttonTextWhenUnauthorize);
      expect(await $(page).execute('document.querySelector("[data-sign=authorizeMailtip]")')).toBe(null);
    }

    async function checkAuthorizePanelWhenAuthorize() {
      expect(await NavigateToSettings.getAuthorizedLogo(context)).toBeTruthy();
      expect(await NavigateToSettings.getAuthorizeButtonText(context)).toEqual(option.buttonTextWhenAuthorize);
      expect(await NavigateToSettings.getAuthorizeMailtipText(context)).toEqual(officeAccout);
    }

    let process = createProcess(
      Entry,
      LoginCTI,
      NavigateTo('settings'),
      AuthorizeOffice,
      Relogin,
      NavigateTo('settings'),
      UnauthorizeOffice
    )(context);

    /*
      __Step1__: Direct to entry (Go to Settings page)

      [Expected Result]:
      The layout of this page should be shown as below
      1. Office 365 icon
      2. Authorize button
    */
    await process.execBefore(AuthorizeOffice);
    await checkAuthorizePanelWhenUnauthorize(context, NavigateToSettings);

    /*
      Given: Succeed to authorize
      __Step5__: Go to setting page

      [Expected Result]:
      User should be able to view below authorized message:
      - Office 365 icon
      - <Authorised Account>
      - Unauthorise button
      - Button should be highlight and clickable
    */
    await process.execTo(AuthorizeOffice);
    await checkAuthorizePanelWhenAuthorize(context, NavigateToSettings);

    /*
        __Step6__: Click logout and relogin
        [Expected Result]:
        User still Authorized
      */
    await process.execBefore(UnauthorizeOffice);
    await checkAuthorizePanelWhenAuthorize(context, NavigateToSettings);

    /*
      __Step7__: Click the Unauthorise button

      [Expected Result]:
      User should be able to view below authorized message:
      - Office 365 icon
      - Authorise button
      - Button should be highlight and clickable
    */
    await process.execTo(UnauthorizeOffice);
    await checkAuthorizePanelWhenUnauthorize(context, NavigateToSettings);

    /*
      __Step8__: Click Authorize button on setting page

      [Expected Result]:
      There is an Authorize button
    */
    await $(page).click('@authorizeButton');
    expect(await NavigateToSettings.getAuthorizeButtonText(context)).toEqual(option.buttonTextWhenUnauthorize);
  });
});
