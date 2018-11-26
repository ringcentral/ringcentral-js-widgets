/* RCI-845 Verify Contacts Screen

http://einstein.int.ringcentral.com/?project=1309&suite=11048&suite=11087&case=11432

Summary:
  Goal:

  - Verify Contacts screen

  PreconditionsUser Story:

  - RCINT-4175: Contact List

  - RCINT-134: Google Corporate Directory display and search

  - RCINT-8551: CTI Contact list and detail page for O365

  - RCINT-8660  Migration Check Point - Contact

  Component:

  Feature:

  Project:

  Tier(/s):

  Preconditions:
    Account type(/s):

      RC US/CA/UK/EU, ATT, BT, TELUS

      Account has company contacts and personal contacts, and CTI app has been authorized to Google/O365.

    Extension type(/s):

    Entry point(/s):

      Login CTI app

  Test Case Version Information:
    Created By	cerrie.shen
    Date Created	Mon, 22 Oct 2018 17:17:05
    Updated By	dina.huang
    Date Updated	Thu, 01 Nov 2018 09:11:24
*/
import sleep from 'ringcentral-integration/lib/sleep';

import { createProcess } from '../../../steps';
import Entry from '../../../steps/entry';
import OutlookPage from '../../../steps/office/outlookPage';
import { LoginCTI } from '../../../steps/commons/login';
import NavigateTo from '../../../steps/commons/navigateTo';
import AuthorizeOffice from '../../../steps/office/authorizeOffice';
import DismissAllAlert from '../../../steps/commons/Alert/dismissAll';
import NavigateToContacts from '../../../steps/commons/NavigateTo/navigateToContacts';
import ContactsView from '../../../steps/commons/Contacts/contactsView';

/**
 * check search func
 * @param {string | array} contactsName
 */
async function detectContactSearchFunc(context, param) {
  await ContactsView.searchContactViaSearchInput(context, param);
  const contactItems = await ContactsView.getContactItems(context);
  expect(contactItems.length).toBeGreaterThanOrEqual(1);
}

async function getRcContactsNames(context) {
  // choose filter
  await ContactsView.chooseContactFilter(context, 1);
  const listData = await ContactsView.getAllContactListItemName(context);
  await ContactsView.chooseContactFilter(context, 2);
  listData.concat(await ContactsView.getAllContactListItemName(context));
  // Reset the filter to all
  await ContactsView.chooseContactFilter(context, 0);
  return listData;
}

describe('Commom 3rd Party Contacts: =====>', () => {
  test({
    title: 'Verify Contacts Screen',
    tags: [
      ['office'],
    ],
    levels: ['p1'],
    brands: [
      ['rc', { accounts: ['CM_RC_US'] }],
      ['bt', { accounts: ['CM_BT'] }],
      ['att', { username: '18665133464', password: 'Test!123' }],
      ['telus', { accounts: ['CM_TELUS'] }],
    ],
    options: [{
      contactsTabText: 'Contacts',
      filterText: 'Office 365',
    }],
  }, async (context) => {
    const { app, page, options: { option } } = context;

    let process = createProcess(
      Entry,
      LoginCTI,
      NavigateTo('settings'),
      AuthorizeOffice,
      DismissAllAlert,
      NavigateToContacts
    )(context);

    /*
      __Step1__: Mouse hover "Contacts" menu

      [Expected Result]:
      Tooltip "Contacts" shows.
    */
    await process.execTo(AuthorizeOffice);
    expect(await $(page).waitForSelector(`div[title="${option.contactsTabText}"]`)).toBeTruthy();
    /*
      __Step1__: Click "Contacts" icon

      [Expected Result]:
      1. User directs to "Contacts" page.
      2. The page displays as below:
        - Search box with ghost text "Search...";
        - Filter icon (includes "All", "Google/Office365", "Company" and "Personal" options, "All" is selected by default );
        - Contact list (show all contacts by default include "Google/Office365", "Company" and "Personal" contacts)
    */
    await process.execTo(NavigateToContacts);
    const contactFilters = ['All', 'Company', 'Personal', 'Office 365'];
    expect(await ContactsView.getContactsSearchInputProperty(context, 'placeholder'))
      .toEqual('Search...');
    expect(await ContactsView.getContactSourceFilterList(context))
      .toEqual(contactFilters);
      expect(await ContactsView.getCilterIconContainerProperty(context, 'title'))
      .toEqual(contactFilters[0]);
    // detect Company and Personal Contacts
    const rcContactsNames = await getRcContactsNames(context);
    for(let index in rcContactsNames) {
      await detectContactSearchFunc(context, rcContactsNames[index]);
    }
    // detect O365 Contacts
    const officeContactsNames = OutlookPage.getStaticContactsNames();
    officeContactsNames.forEach(name => detectContactSearchFunc(context, name));
  });
});
