/**
 * RCI-3681: Text action buttons with user not hide and number publish
 * https://test_it_domain/test-cases/RCI-3681
 * Preconditions:
 * The user has logged into the CTI app
 * The user has authorized 3rd party
 * Prepare contacts and phone numberwhich has settings below:
 *
  | AI CDC |Include user |Publish number |Contact type |Contact |Number |Conversation with login user |
  | - |- |- |3rd party |userA |2051020000 |conversation1 |
	| On |On |On |Company |userB |2051021111 |conversation2 |
	| Off |- |- |Company |userC |2051022222 |conversation3 |
	| - |- |- |Personal |userD |2051023333 |conversation4 |
	| - |- |- |Unknown number |- |2051024444 |conversation5 |

 * AICDC:search number > description > FindCompany Directory Controls
 * SWAdmin:
	Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
	Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * 3rd party:Google/Office365/Outlook contacts
 * Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
 * Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * Entry point(/s):
 *
  | Conversation with login user |Show view details |
  | conversation1 |true |
	| conversation2 |true |
	| conversation3 |true |
	| conversation4 |true |
	| conversation5 |false |

 */

import {
  p2,
  it,
  autorun,
  examples,
  common,
  And,
  StepProp,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CreateMock,
  MockExtensionsList,
  MockMessageSync,
  mockExtensionsListData,
  MockMessageList,
  MockAddressBookSync,
  MockGetPhoneNumber,
  MockCallLogs,
  MockGetTelephonyState,
  MockPresence,
} from '../../../../../../steps/Mock';
import { mockMessageListData } from '../../../../../../__mock__';
import {
  CallButtonBehavior,
  CheckActiveCallExist,
  CheckCallControlPage,
} from '../../../../../../steps/Call';
import { CheckInContactDetailsPage } from '../../../../../../steps/ContactsView';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  ExpandTheActionMenu,
  CheckActionMenu,
  ClickActionButton,
} from '../../../../../../steps/Messages';
import { WaitForSpinner } from '../../../../../../steps/WaitForSpinner';
import { NavigateTo } from '../../../../../../steps/Router/action';

@autorun(test)
@it
@p2
@common
@title(
  'Text action buttons with user not hide and number publish for personal/company contacts',
)
export class TextActionButtonsForContacts extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | phoneNumber  | parsedNumber     | contactName | contactType |
    | '2051021111' | '(205) 102-1111' | 'Contact B' | 'company'   |
    | '2051023333' | '(205) 102-3333' | 'Contact D' | 'personal'  |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Text action buttons with user not hide and number publish for personal/company contacts"
        action={async ({ contactName, phoneNumber, contactType }: any) => {
          const actions = [
            CreateMock,
            <MockCallLogs repeat={0} />,
            <MockGetPhoneNumber />,
            MockGetTelephonyState,
            <MockMessageList
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData(null),
              })}
            />,
            <MockMessageSync
              repeat={0}
              handler={(mockData) => ({
                ...mockMessageListData({
                  direction: 'Outbound',
                  type: 'SMS',
                  toName: contactName,
                  toNumber: phoneNumber,
                  subject: 'new ComposeText',
                }),
              })}
            />,
          ];
          if (contactType === 'company') {
            actions.push(
              <MockExtensionsList
                handler={(mockData) => {
                  const data = mockExtensionsListData({
                    firstName: contactName.split(' ')[0],
                    lastName: contactName.split(' ')[1],
                    phoneNumber,
                    hidden: false,
                    phoneNumberHidden: false,
                  });
                  return {
                    ...mockData,
                    ...data,
                  };
                }}
              />,
            );
          }
          if (contactType === 'personal') {
            actions.push(
              <MockAddressBookSync
                handler={(personalUsers) => {
                  const firstPersonalUser = personalUsers[0];
                  firstPersonalUser.firstName = contactName;
                  firstPersonalUser.middleName = '';
                  firstPersonalUser.lastName = '';
                  firstPersonalUser.homePhone = phoneNumber;
                  return personalUsers;
                }}
              />,
            );
          }
          return actions;
        }}
      >
        <When desc="Login in CTI" action={Login} />
        <And
          desc="> Messages tab
                > All/Text
                >Click expand SMS action menu of {Conversation with login user}"
          action={[
            <NavigateTo path="/messages" />,
            WaitForSpinner,
            ExpandTheActionMenu,
            async (_, { phone }: any) => {
              if (phone.webphone.connecting) {
                phone.webphone._webphone?.userAgent.trigger?.('registered');
              }
            },
          ]}
        />
        <Then
          desc="The following menus should be shown: Call {Show view details}"
          action={
            <CheckActionMenu expectShowCallButton expectShowEntityButton />
          }
        />
        <When
          desc="Click the Call button"
          action={<ClickActionButton testId="Call" />}
        />
        <Then
          desc="User should be navigated to the Dial page
							  An outbound call should be made to {Number}"
          action={async ({ contactName, parsedNumber, contactType }: any) => [
            CheckActiveCallExist,
            <CheckCallControlPage
              name={contactName}
              parsedNumber={parsedNumber}
              type={contactType}
            />,
          ]}
        />
        <When
          desc="> Hangup the call
                > Messages tab
                > All/Text
                >Click expand SMS action menu of {Conversation with login user}
                > Click the View Details button"
          action={[
            <CallButtonBehavior callButtonBehaviorType="hangup" />,
            <NavigateTo path="/messages" />,
            WaitForSpinner,
            ExpandTheActionMenu,
            <ClickActionButton testId="View Details" />,
          ]}
        />
        <Then
          desc="User should be navigated to {Contact details} page"
          action={async ({ contactName }: any) => (
            <CheckInContactDetailsPage userName={contactName} />
          )}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@it
@p2
@common
@title(
  'Text action buttons with user not hide and number publish for unknown users',
)
export class TextActionButtonsForUnknown extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | phoneNumber  | parsedNumber     | displayName |
    | '2051024444' | '(205) 102-4444' | 'Unknown'   |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Text action buttons with user not hide and number publish for unknown users"
        action={async ({ contactName, phoneNumber }: any) => [
          CreateMock,
          <MockPresence repeat={0} />,
          <MockCallLogs isDefaultInit repeat={0} />,
          <MockGetPhoneNumber />,
          MockGetTelephonyState,
          <MockMessageList
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData(null),
            })}
          />,
          <MockMessageSync
            repeat={0}
            handler={(mockData) => ({
              ...mockMessageListData({
                direction: 'Outbound',
                type: 'SMS',
                toName: contactName,
                toNumber: phoneNumber,
                subject: 'new ComposeText',
              }),
            })}
          />,
        ]}
      >
        <When desc="Login in CTI" action={Login} />
        <And
          desc="> Messages tab
                > All/Text
                >Click expand SMS action menu of {Conversation with login user}"
          action={[
            <NavigateTo path="/messages" />,
            WaitForSpinner,
            ExpandTheActionMenu,
            async (_, { phone }: any) => {
              if (phone.webphone.connecting) {
                phone.webphone._webphone?.userAgent.trigger?.('registered');
              }
            },
          ]}
        />
        <Then
          desc="The following menus should be shown: Call {Show view details}"
          action={
            <CheckActionMenu
              expectShowCallButton
              expectShowEntityButton={false}
            />
          }
        />
        <When
          desc="Click the Call button"
          action={<ClickActionButton testId="Call" />}
        />
        <Then
          desc="User should be navigated to the Dial page
							  An outbound call should be made to {Number}"
          action={async ({ contactName, parsedNumber }: any) => [
            CheckActiveCallExist,
            <CheckCallControlPage
              name={contactName}
              parsedNumber={parsedNumber}
            />,
          ]}
        />
      </Scenario>
    );
  }
}

// common has no 3rd party contacts, skip this
@autorun(test.skip)
@it
@p2
@title(
  'Text action buttons with user not hide and number publish for 3rd party',
)
@common
export class TextActionButtonsThirdParty extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | phoneNumber    | parsedNumber     | contactName |
    | '+12051020000' | '(205) 102-0000' | 'Contact A' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Text action buttons with user not hide and number publish for 3rd party"
        action={async ({ contactName, phoneNumber }: any) => [
          CreateMock,
          <MockCallLogs repeat={0} />,
          <MockMessageList
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData(null),
            })}
          />,
          <MockMessageSync
            repeat={0}
            handler={(mockData) => ({
              ...mockMessageListData({
                direction: 'Outbound',
                type: 'SMS',
                toName: contactName,
                toNumber: phoneNumber,
                subject: 'new ComposeText',
              }),
            })}
          />,
        ]}
      >
        <When desc="Login in CTI" action={Login} />
        <And
          desc="> Messages tab
                > All/Text
                >Click expand SMS action menu of {Conversation with login user}"
          action={[
            <NavigateTo path="/messages" />,
            WaitForSpinner,
            ExpandTheActionMenu,
          ]}
        />
        <Then
          desc="The following menus should be shown: Call {Show view details}"
          action={
            <CheckActionMenu expectShowCallButton expectShowEntityButton />
          }
        />
        <When
          desc="Click the Call button"
          action={<ClickActionButton testId="Call" />}
        />
        <Then
          desc="User should be navigated to the Dial page
							  An outbound call should be made to {Number}"
          action={async ({ contactName, parsedNumber }: any) => [
            CheckActiveCallExist,
            <CheckCallControlPage
              name={contactName}
              parsedNumber={parsedNumber}
            />,
          ]}
        />
        <When
          desc="> Hangup the call
                > Messages tab
                > All/Text
                >Click expand SMS action menu of {Conversation with login user}
                > Click the View Details button"
          action={[
            <CallButtonBehavior callButtonBehaviorType="hangup" />,
            <NavigateTo path="/messages" />,
            WaitForSpinner,
            ExpandTheActionMenu,
            <ClickActionButton testId="View Details" />,
          ]}
        />
        <Then
          desc="User should be navigated to {Contact details} page"
          action={async ({ contactName }: any) => (
            <CheckInContactDetailsPage userName={contactName} />
          )}
        />
      </Scenario>
    );
  }
}
