/**
 * RCI-2646: Verify the main feature works well in the limited mode
 * https://test_it_domain/test-cases/RCI-2646
 * Preconditions:
 * 1. It have already installed the CTI.
 * 2. Let the test env in Survival Mode
 * Note:
 * Before the test, make a notification in the company group
 * Login tohttps://toolset.lab.nordigy.ru/qatools/ReadOnly-> Go to 'QATools' -> Go to 'Read Only' -> Choose the XMNUP env
 * Before the test, make a notification in the company group
 * Entry point(/s):
 *
 */
import { AvailabilityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  autorun,
  common,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckIncomingCallPageExist,
  MakeInboundCall,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CheckContactItemExistInList } from '../../../../../steps/ContactsView';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockExtensionsList,
  mockExtensionsListData,
} from '../../../../../steps/Mock';
import { NavigateToContacts } from '../../../../../steps/Navigate';

@autorun(test)
@it
@common
@p2
@title('Verify the main feature works well in the limited mode')
export class RCI2646 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  shouldTestContact = true;
  CheckScheduleMeeting = () => {
    // no schedule button in widget demo
  };
  CheckCallExist = CheckIncomingCallPageExist;
  run() {
    const {
      CreateMock,
      Login,
      shouldTestContact,
      CheckScheduleMeeting,
      CheckCallExist,
    } = this;
    return (
      <Scenario desc="Verify app feature in limited mode">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockExtensionsList
              handler={(mockData) => ({
                ...mockData,
                ...mockExtensionsListData([
                  {
                    firstName: 'Test Contact',
                    lastName: '',
                    extensionNumber: '101',
                    phoneNumber: '+12054332854',
                    hidden: false,
                    phoneNumberHidden: false,
                  },
                ]),
              })}
            />,
            Login,
            ((_, { app }) => {
              const availabilityMonitor =
                app.container.got(AvailabilityMonitor)!;
              availabilityMonitor.setLimitedMode();
            }) as StepFunction,
          ]}
        />
        <When desc="Reload screen" />
        <Then
          desc="All requests are success
										Note: These request value is 200
										1) /restapi/oauth/token2) /restapi/v1.0/client-info/sip-provison3) /restapi/v1.0/account/~/extension/~/phone-number4) /restapi/v1.0/account/~/extension/~/forwarding-number5) /restapi/v1.0/account/~/dialing-plan6) /restapi/v1.0/account/~/extension/~/message-sync
										7)/restapi/v1.0/account/~/extension/~/address-book-sync
										8) /restapi/v1.0/account/~/extension/~/call-log-sync"
        />
        <When desc="Go to 'Contacts' tab" />
        <Then
          desc="All RC contacts display right"
          action={() => {
            if (shouldTestContact) {
              return [
                NavigateToContacts,
                <CheckContactItemExistInList userName={'Test Contact'} />,
              ];
            }
          }}
        />
        <When
          desc="Make an inbound call to the App"
          action={[MakeInboundCall]}
        />
        <Then
          desc="It receives the inbound call successfully"
          action={[CheckCallExist]}
        />
        <When desc="Click the 'Schedule Video Meeting' button to schedule new a meeting" />
        <Then
          desc="It schedules the meeting successfully in Google Calendar"
          action={[CheckScheduleMeeting]}
        />
      </Scenario>
    );
  }
}
