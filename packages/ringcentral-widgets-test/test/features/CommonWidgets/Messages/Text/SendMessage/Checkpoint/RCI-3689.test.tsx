/**
 * RCI-3689: The send message update to conversation
 * https://test_it_domain/test-cases/RCI-3689
 * Preconditions:
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserA has logged into the CTI
 * UserA has contacts below
 *
  | AI CDC |Include user |Publish number |Contacts |Phone Number |
  | Off |- |- |UserB |18662221111 |
	| On |On |On |UserC |18662222222 |
	| On |Off |- |UserD |18662223333 |
	| On |On |Off |UserE |18662224444 |

 * AICDC:search number > description > FindCompany Directory Controls
 * SWAdmin:
	Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
	Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
 * Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * Entry point(/s):
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserA has logged into the CTI
 * UserA has contacts below
 *
  | AI CDC |Include user |Publish number |Contacts |Phone Number |
  | Off |- |- |UserB |18662221111 |
	| On |On |On |UserC |18662222222 |
	| On |Off |- |UserD |18662223333 |
	| On |On |Off |UserE |18662224444 |

 * AICDC:search number > description > FindCompany Directory Controls
 * SWAdmin:
	Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
	Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
 * Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 *
  | Entry |Path |Result |
  | 1 |{Contacts} has no conversation with UserA > Send a message |Create a new conversation and update the message to it |
	| 2 |{Contacts}has a conversation with UserA > Send a message |Update the new message to the old conversation |

 */
import type { StepProp } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  SendSMS,
  ClickMessageItem,
  CheckConversationHistory,
} from '../../../../../../steps/Messages';
import {
  CreateMock,
  MockExtensionsList,
  MockMessageSync,
  mockExtensionsListData,
  MockMessageList,
} from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';

const conversationId = 6185046919640017000;
const oldComposeText = 'old message';
const newComposeText = 'new message';

@autorun(test)
@common
@it
@p2
@title('The send message update to conversation')
export class UpdateSMSForCDC extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | AI_CDC | includeUser | publishNumber | contactName | phoneNumber   |
    | 'Off'  | true        | true          | 'User B'    | '18662221111' |
    | 'On'   | true        | true          | 'User C'    | '18662222222' |
    | 'On'   | false       | false         | 'User D'    | '18662223333' |
    | 'On'   | true        | false         | 'User E'    | '18662224444' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="The send message update to conversation"
        action={({
          publishNumber,
          contactName,
          phoneNumber,
          includeUser,
        }: any) => [
          CreateMock,
          <MockExtensionsList
            handler={(mockData) => ({
              ...mockData,
              ...mockExtensionsListData({
                hidden: !includeUser,
                firstName: contactName.split(' ')[0],
                lastName: contactName.split(' ')[1],
                phoneNumber,
                phoneNumberUsageType: 'ContactNumber',
                phoneNumberHidden: !publishNumber,
              }),
            })}
          />,
          <MockMessageList repeat={0} />,
          <MockMessageSync
            repeat={0}
            handler={(mockData) => ({
              ...mockMessageListData([
                {
                  direction: 'Outbound',
                  type: 'SMS',
                  toName: contactName,
                  toNumber: phoneNumber,
                  subject: oldComposeText,
                  conversationId,
                },
                {
                  direction: 'Outbound',
                  type: 'SMS',
                  toName: contactName,
                  toNumber: phoneNumber,
                  subject: newComposeText,
                  conversationId,
                },
              ]),
            })}
          />,
        ]}
      >
        <When desc="Login in CTI" action={Login} />
        <When
          desc="Go to the Entry"
          action={async ({ phoneNumber }: any) => [
            <NavigateTo path="/composeText" />,
            <SendSMS phoneNumber={phoneNumber} />,
          ]}
        />
        <Then
          desc="Navigated to the conversation detail page and Update the new message to the old conversation
										{Contacts}can receive the message"
          action={async ({ contactName }: any) => [
            <NavigateTo path="/messages" />,
            ClickMessageItem,
            <CheckConversationHistory
              userName={contactName}
              textList={[oldComposeText, newComposeText]}
            />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@it
@p2
@title('The send message added to conversation')
export class NewSMSForCDC extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | AI_CDC | includeUser | publishNumber | contactName | phoneNumber   |
    | 'Off'  | true        | true          | 'User B'    | '18662221111' |
    | 'On'   | true        | true          | 'User C'    | '18662222222' |
    | 'On'   | false       | false         | 'User D'    | '18662223333' |
    | 'On'   | true        | false         | 'User E'    | '18662224444' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="The send message added to conversation"
        action={({
          publishNumber,
          contactName,
          phoneNumber,
          includeUser,
        }: any) => [
          CreateMock,
          <MockExtensionsList
            handler={(mockData) => ({
              ...mockData,
              ...mockExtensionsListData({
                hidden: !includeUser,
                firstName: contactName.split(' ')[0],
                lastName: contactName.split(' ')[1],
                phoneNumber,
                phoneNumberUsageType: 'ContactNumber',
                phoneNumberHidden: !publishNumber,
              }),
            })}
          />,
          <MockMessageList repeat={0} />,
          <MockMessageSync
            repeat={0}
            handler={(mockData) => ({
              ...mockMessageListData({
                direction: 'Outbound',
                type: 'SMS',
                toName: contactName,
                toNumber: phoneNumber,
                subject: newComposeText,
                conversationId,
              }),
            })}
          />,
        ]}
      >
        <When desc="Login in CTI" action={Login} />
        <When
          desc="Go to the Entry"
          action={async ({ phoneNumber }: any) => [
            <NavigateTo path="/composeText" />,
            <SendSMS phoneNumber={phoneNumber} />,
          ]}
        />
        <Then
          desc="Navigated to the conversation detail page and Create a new conversation and update the message to it
										{Contacts}can receive the message"
          action={async ({ contactName }: any) => [
            <NavigateTo path="/messages" />,
            ClickMessageItem,
            <CheckConversationHistory
              userName={contactName}
              textList={[newComposeText]}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
