/**
 * RCI-3573: View details of the voice message
 * https://test_it_domain/test-cases/RCI-3573
 * Preconditions:
 * RC CTI app is installed and enabled
 * User A has login 3rd party
 * User A has login RC CTI App
 * User B is one of the contacts from the contact list
 * User C is an unknown contact and not on the contact list
 * Entry point(/s):
 *
  | User |Show view details |
  | User B |YES |
	| User C |NO |

 * > User A go to Messages page > All/Voice tab
 */

import type { StepProp } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  examples,
  And,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckInContactDetailsPage } from '../../../../../../steps/ContactsView';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CreateMock,
  MockMessageList,
  MockMessageSync,
  MockExtensionsList,
  mockExtensionsListData,
  MockCallLogs,
  MockGetTelephonyState,
} from '../../../../../../steps/Mock';
import { mockMessageListData } from '../../../../../../__mock__';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CheckActionMenu,
  ClickActionButton,
} from '../../../../../../steps/Messages';
import { NavigateToVoiceMail } from '../../../../../../steps/Navigate';

@autorun(test)
@it
@p2
@title('View details of the voice message')
export class RCI3573 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | userName | isContact | showViewDetails | phoneNumber    |
    | 'User B' | true      | true            | '+18662100000' |
    | 'User C' | false     | false           | '+18662100001' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="View details of the voice message"
        action={async ({ userName, phoneNumber, isContact }: any) => {
          const actions = [
            CreateMock,
            <MockCallLogs isDefaultInit repeat={0} />,
            <MockMessageList
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData(null),
              })}
              isDefaultInit
              repeat={0}
            />,
            <MockMessageSync
              isDefaultInit
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData({
                  direction: 'Inbound',
                  type: 'VoiceMail',
                  fromName: userName,
                  fromNumber: phoneNumber,
                }),
              })}
            />,
            MockGetTelephonyState,
          ];
          if (isContact) {
            actions.push(
              <MockExtensionsList
                handler={(mockData) => ({
                  ...mockData,
                  ...mockExtensionsListData({
                    hidden: false,
                    firstName: userName.split(' ')[0],
                    lastName: userName.split(' ')[1],
                    phoneNumber,
                    phoneNumberUsageType: 'ContactNumber',
                    phoneNumberHidden: false,
                  }),
                })}
              />,
            );
          }
          return actions;
        }}
      >
        <When desc="> Go to the Entry point" action={Login} />
        <And
          desc="> Expand the voice messages from {User}
								> Check the button 'View details'"
          action={[
            NavigateToVoiceMail,
            <ClickActionButton testId="VoiceMailMessageItem" />,
          ]}
        />
        <Then
          desc="The result is displayed {Show view details}"
          action={async ({ showViewDetails }: any) => [
            <CheckActionMenu
              expectShowCallButton
              expectShowEntityButton={showViewDetails}
            />,
          ]}
        />
        <When
          desc="Click the 'View details' button in the voice messages fromUser B
                Would lead to the Contact Details page and show<b> User B</b>'s detail."
          action={async ({ showViewDetails, userName }: any) => {
            if (showViewDetails) {
              return (
                <>
                  <ClickActionButton testId="View Details" />
                  <CheckInContactDetailsPage userName={userName} />
                </>
              );
            }
            return () => {};
          }}
        />
      </Scenario>
    );
  }
}
