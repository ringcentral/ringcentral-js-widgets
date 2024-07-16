/**
 * RCI-2997: Schedule Meeting with 'RingCentral Video Connector Beta' flag is On but API fail to return
 * https://test_it_domain/test-cases/RCI-2997
 * Preconditions:
 * RC CTI app is installed and enabled
 * Turnonthe 'RingCentral Video Room Connector'flag on theAdmin web
 * The user has logged in to RC CTI with the RCV provider
 * Entry point(/s):
 * Office Add-in > New Event > Schedule with RingCentral > Turn{Password status}> Input{Password}> Schedule a new meeting
 * CTI app >More menu >schedule video meeting page > Turn{Password status}> Input{Password}> Schedule a new meeting
 *
  | Password status |Password |
  | On |'pwd123' |
	| Off |- |

 * Note(/s):
 * 793123 is the dial-in password
 */
import type { StepProp } from '@ringcentral-integration/test-utils';
import {
  And,
  Given,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  examples,
  it,
  p3,
  title,
} from '@ringcentral-integration/test-utils';

import type { Context } from '../../../../../../../../interfaces';
import { CheckAlertMessage } from '../../../../../../../../steps/Alert';
import { CommonLogin } from '../../../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../../../steps/CreateInstance';
import {
  CheckRCVPageDisplay,
  ClickScheduleButton,
  EnterPassword,
  MockPostBridges,
  TurnOffToggle,
  TurnOnToggle,
} from '../../../../../../../../steps/Meeting';
import {
  CreateMock,
  MockCallLogSync,
  MockErrorRcvInvitation,
  MockGetTelephonyState,
  MockMessageSync,
  MockPermission,
} from '../../../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../../../steps/Router';

interface ExampleItem {
  isMeetingSecret: boolean;
  meetingPassword: string;
}

@autorun(test)
@common
@it
@p3
@title(
  "Schedule Meeting with 'RingCentral Video Connector Beta' flag is On but API fail to return",
)
export class RCVConnector extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  CheckRCVPage: StepProp = CheckRCVPageDisplay;
  CheckEmptyInjection: StepProp = () => {};
  @examples(`
    | isMeetingSecret | meetingPassword |
    | true            | 'pwd123'        |
    | false           | '-'             |
  `)
  run() {
    const { Login, CreateMock, CheckRCVPage, CheckEmptyInjection } = this;
    return (
      <Scenario
        desc="Schedule Meeting with 'RingCentral Video Connector Beta' flag is On but API fail to return"
        action={CreateMock}
      >
        <Given
          desc="The API failed to return the value of invitation Info"
          action={[
            MockPostBridges,
            MockErrorRcvInvitation,
            MockCallLogSync,
            MockMessageSync,
            MockGetTelephonyState,
            <MockPermission
              handler={(features) => {
                features.filter(({ id }: any) => id !== 'RoomConnectorBeta');
                features.push({
                  id: 'RoomConnectorBeta',
                  available: true,
                });
                return features;
              }}
            />,
          ]}
        />
        <When
          desc="Go to Entry points"
          action={() => [Login, <NavigateTo path="/meeting" />]}
        />
        <Then desc="RCV meeting page displays" action={CheckRCVPage} />
        <And
          desc="&gt; Turn PasswordStatus {isMeetingSecret}&gt; Input {meetingPassword}&gt; Schedule a new meeting"
          action={({ isMeetingSecret, meetingPassword }: ExampleItem) => {
            if (isMeetingSecret) {
              return [
                <TurnOnToggle dataSign="requirePassword" />,
                <EnterPassword password={meetingPassword} />,
                ClickScheduleButton,
              ];
            }
            return [
              <TurnOffToggle dataSign="requirePassword" />,
              ClickScheduleButton,
            ];
          }}
        />
        <Then
          desc="The meeting should be scheduled successfully.
                The meeting title should be in the Title field
                The meeting link should be in the Location field
                The invitation should be empty"
          action={CheckEmptyInjection}
        />
        <And
          desc="Show error message: 'Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later.'
                [L10N]"
          action={(_: ExampleItem, context: Context) => {
            const rcVideo = context.phone.rcVideo;
            expect(rcVideo).toBeDefined();
            return rcVideo._enableInvitationApiFailedToast
              ? [
                  <CheckAlertMessage
                    dataSign="meeting-alert"
                    message="Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later."
                  />,
                ]
              : [];
          }}
        />
      </Scenario>
    );
  }
}
