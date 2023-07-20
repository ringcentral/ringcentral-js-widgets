/**
 * RCI-1101: Search inactive user
 * https://test_it_domain/test-cases/RCI-1101
 * Preconditions:
 * 1. RC CTI app is installed and enabled
 * 2. User has logged in to 3rd party
 * 3. User has logged in to RC CTI app
 * 4. There is an inactive userA in RC company contact
 * 5. There are some conversations with userA in Messages
 * Entry point(/s):
 *
 */

import { extensionStatusTypes } from '@ringcentral-integration/commons/enums/extensionStatusTypes';
import { screen } from '@testing-library/react';
import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  Given,
  examples,
} from '@ringcentral-integration/test-utils';
import {
  MockExtensionsList,
  mockExtensionsListData,
  MockMessageList,
  MockMessageSync,
  MockCallLogs,
  MockPresence,
} from '../../../../../steps/Mock';
import {
  CheckContactDetailsProfile,
  CheckContactItemExistInList,
  SearchContacts,
} from '../../../../../steps/ContactsView';
import {
  NavigateToComposeText,
  NavigateToContactDetails,
} from '../../../../../steps/Navigate';
import { NavigateToContacts } from '../../../../../steps/Navigate/actions/NavigateToContacts';
import { InputRecipients } from '../../../../../steps/Messages/actions';
import { mockMessageListData } from '../../../../../__mock__';
import { NavigateToMessagesTab } from '../../../../../steps/Navigate/actions/NavigateToMessages';
import {
  CheckContactDropdownList,
  Search,
} from '../../../../../steps/SearchField';
import { NavigateToMessageHistory } from '../../../../../steps/Navigate/actions/NavigateToMessageHistory';

@autorun(test.skip)
@it
@p2
@title('Search inactive user')
export class SearchInactiveUser extends Step {
  Login = null;
  CreateMock = null;

  @examples(`
    | name  | phoneNumber    |
    | 'A01' | '+12054332854' |
  `)
  run() {
    return (
      <Scenario
        desc="search inactive user"
        action={({ name, phoneNumber }: any) => [
          this.CreateMock,
          <MockCallLogs repeat={2} />,
          <MockPresence isDefaultInit repeat={6} />,
          <MockExtensionsList
            handler={(mockData) => ({
              ...mockData,
              ...mockExtensionsListData([
                {
                  firstName: name,
                  lastName: '',
                  extensionNumber: '101',
                  status: extensionStatusTypes.notActivated,
                  phoneNumber,
                  hidden: false,
                  phoneNumberHidden: false,
                },
              ]),
            })}
          />,
          <MockMessageSync
            isDefaultInit
            repeat={4}
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData([
                {
                  direction: 'Outbound',
                  type: 'SMS',
                  toName: name,
                  toNumber: phoneNumber,
                },
              ]),
            })}
          />,
          <MockMessageList
            isDefaultInit
            repeat={4}
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData({
                direction: 'Outbound',
                type: 'SMS',
                toName: name,
                toNumber: phoneNumber,
              }),
            })}
          />,
        ]}
      >
        <Given desc="login in the CTI" action={this.Login} />
        <When
          desc="Direct to Contacts, input userA's name to search box"
          action={({ name }: any) => [
            NavigateToContacts,
            <SearchContacts content={name} />,
          ]}
        />
        <Then
          desc="1.UserA is searched and showed at the searched result
										2.UserA's avatar is gray
										3.UserA's name is gray
										4.The status below userA's name is 'Inactive'"
          action={({ name }: any) => (
            <CheckContactItemExistInList userName={name} isActive={false} />
          )}
        />
        <When
          desc="Click the userA from contact list"
          action={({ name }: any) => (
            <NavigateToContactDetails userName={name} />
          )}
        />
        <Then
          desc="1.UserA's avatar is gray
										2.UserA's name is gray
										3.The status below userA's name is 'Inactive'"
          action={({ name }: any) => (
            <CheckContactDetailsProfile userName={name} isActive={false} />
          )}
        />
        <When
          desc="Direct to compose text,input userA's direct number on 'To' field"
          action={({ phoneNumber }: any) => [
            <NavigateToComposeText messageTabName="messagesTab" />,
            <InputRecipients content={phoneNumber} />,
          ]}
        />
        <Then
          desc="UserA displays at the searched result"
          action={CheckContactDropdownList}
        />
        <When
          desc="Direct to Messages > All, input inactive user's digital number to search box"
          action={({ phoneNumber }: any) => [
            NavigateToMessagesTab,
            <Search testId="conversationSearch" content={phoneNumber} />,
          ]}
        />
        <Then
          desc="Conversations of userA are searched and display at the searched result"
          action={({ name }: any) => {
            expect(screen.getAllByText(name)[0]).toBeVisible();
          }}
        />
        <When
          desc="Direct to Messages > Text, input inactive user's  digital number to search box"
          action={<NavigateToMessageHistory tabName="Text" />}
        />
        <Then
          desc="Conversations of userA are searched and display at the searched result"
          action={({ name }: any) => {
            expect(screen.getAllByText(name)[0]).toBeVisible();
          }}
        />
      </Scenario>
    );
  }
}
