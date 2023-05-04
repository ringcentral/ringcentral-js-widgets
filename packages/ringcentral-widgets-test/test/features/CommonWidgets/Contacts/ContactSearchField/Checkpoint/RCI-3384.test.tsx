/**
 * RCI-3384: Check the contact search result
 * https://test_id_domain/test-cases/RCI-3384
 * Preconditions:
 * RC CTI app is installed and enabled
 * The user has logged in to the CTI app
 * CTI app has been authorizedGoogle/Office365 account;
 * There are some records for Google/Office365, Company, Personal contacts in the account
 *
  | Source |Name |Phone number |Email |
  | Company |TestCompany |6501234567 |test0@rc.com |
	| Personal contact |TestPersonal |2507654321 |test1@rc.com |
	| Third-party |TestThird |6501234568 |test2@rc.com |

 * Note(/s):
 * Authorized: For Outlook, no need to do authorization, after login Outlook client the contacts will sync up to the CTI app
 * Entry point(/s):
 * > Go to Contacts tab
 */

import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { waitFor } from '@testing-library/react';
import { StepProp } from '../../../../../lib/step';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import {
  CheckContactGroupCaption,
  CheckContactItemExistInList,
  CheckSearchContactInput,
  SearchContacts,
} from '../../../../../steps/ContactsView';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockAddressBookSync,
  MockExtensionsList,
  mockExtensionsListData,
} from '../../../../../steps/Mock';
import {
  NavigateToContacts,
  NavigateToSettings,
} from '../../../../../steps/Navigate';

@autorun(test.skip)
@it
@p2
@title('Check the contact search result')
export class RCI3384 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  MockThirdPartyContacts: StepProp = () => {};

  companyContact = {
    source: 'Company',
    name: 'TestCompany',
    phoneNumber: '6501234567',
    email: 'test0@rc.com',
  };

  personalContact = {
    source: 'Personal contact',
    name: 'TestPersonal',
    phoneNumber: '2507654321',
    email: 'test1@rc.com',
  };

  thirdPartyContact = {
    source: 'Third-party',
    name: 'TestThird',
    phoneNumber: '6501234568',
    email: 'test2@rc.com',
  };
  run() {
    const { Login, CreateMock, MockThirdPartyContacts } = this;
    return (
      <Scenario desc="Check the contact search result">
        <Given
          desc="Mock user contacts"
          action={[
            CreateMock,
            <MockExtensionsList
              handler={(mockData) => ({
                ...mockData,
                ...mockExtensionsListData([
                  {
                    firstName: this.companyContact.name,
                    lastName: '',
                    extensionNumber: '101',
                    phoneNumber: this.companyContact.phoneNumber,
                    hidden: false,
                    phoneNumberHidden: false,
                  },
                ]),
              })}
            />,
            <MockAddressBookSync
              page={1}
              handler={(personalUsers) => {
                const firstPersonalUser = personalUsers[0];

                firstPersonalUser.firstName = this.personalContact.name;
                firstPersonalUser.middleName = '';
                firstPersonalUser.lastName = '';
                firstPersonalUser.homePhone = this.personalContact.phoneNumber;

                return personalUsers;
              }}
            />,
            MockThirdPartyContacts,
          ]}
        />
        <Given desc="Go to Contacts tab" action={[Login, NavigateToContacts]} />
        <When
          desc="Input 'Test' in the search box"
          action={<SearchContacts content="Test" />}
        />
        <Then
          desc="Search starts when the user enters the 1st character 'T'.
										The search result should be:
	TestCompany
										TestPersonal
										TestThird
										TestCompany
										TestPersonal
										TestThird"
          action={[
            <CheckContactGroupCaption caption="T" />,
            <CheckContactItemExistInList userName="TestPersonal" />,
            <CheckContactItemExistInList userName="TestCompany" />,
            <CheckContactItemExistInList userName="TestThird" />,
          ]}
        />
        <When
          desc="> Direct to other pages(eg. Dialer)
										> Back to Contacts tab."
          action={[NavigateToSettings, NavigateToContacts]}
        />
        <Then
          desc="'Test' should display in the search box
										The search result is kept.
	TestCompany
										TestPersonal
										TestThird
										The search result is kept.
										TestCompany
										TestPersonal
										TestThird
										Note:
										MS is not suitable."
          action={[
            <CheckSearchContactInput content="Test" />,
            <CheckContactGroupCaption caption="T" />,
            <CheckContactItemExistInList userName="TestPersonal" />,
            <CheckContactItemExistInList userName="TestCompany" />,
            <CheckContactItemExistInList userName="TestThird" />,
          ]}
        />
        <When
          desc="Delete 'st' from the Search box."
          action={<SearchContacts content="Te" />}
        />
        <Then
          desc="The search result should be:
										TestCompany
										TestPersonal
										TestThird"
          action={[
            <CheckContactGroupCaption caption="T" />,
            <CheckContactItemExistInList userName="TestPersonal" />,
            <CheckContactItemExistInList userName="TestCompany" />,
            <CheckContactItemExistInList userName="TestThird" />,
          ]}
        />
      </Scenario>
    );
  }
}
