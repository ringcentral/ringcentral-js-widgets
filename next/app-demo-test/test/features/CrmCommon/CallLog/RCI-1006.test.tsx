/**
 * RCI-1006: Log call screen - status
 * https://test_it_domain/test-cases/RCI-1006
 * Preconditions:
 * 1. User is logged into Salesforce.
 * 2. User is logined RC CTI App
 * 3. User selects Ringout(My <Brandname> Phone/Other Phone/Custom Phone) in Settings > Calling
 * 4. Auto log calls is turned off in Settings page
 * Entry point(/s):
 * Make an inbound/outbound call > Log Call
 * History > Selecte a record > Log Call
 */
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  userEvent,
  When,
  screen,
} from '@ringcentral-integration/test-utils';

import { CheckCallStatus } from '../../../steps/Call';
import { ClickBackButton } from '../../../steps/Common';
import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateInstance } from '../../../steps/CreateInstance';
import {
  CreateMock,
  generateCallLogData,
  MockCallLogSync,
} from '../../../steps/Mock';
import { NavigateToHistory } from '../../../steps/Navigate';
import { NavigateTo } from '../../../steps/Router';

// in app demo, there is no call log page
// not need to run this in app-demo-test
@common
@autorun(test.skip)
@p2
@title('Log call screen - active call status')
export class RCI1006ActiveCall extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  @examples(`
    | statusFromTelephony | statusInCTI    |
    | 'Hold'              | 'On Hold'      |
    | 'Parked'            | 'Parked'       |
    | 'NoCall'            | 'Disconnected' |
    | 'Answered'          | 'Connected'    |
    | 'Proceeding'        | 'Ringing'      |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Please enter Scenario...">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[CreateMock, Login]}
        />
        <When desc="Check the status in CTI app when call is Ringing, Answered, On Hold, Parked" />
        <Then
          desc="The status and text color display like:
                | Status from Telephony |Values in CTI |
                | NoCall |Disconnected |
              	| CallConnected |Connected |
	              | Ringing |Ringing |
	              | OnHold |On Hold |
	              | ParkedCall |Parked |
              "
          action={[
            (async (_, { rcMock }) => {
              await rcMock.makeCall({
                status: this.example.statusFromTelephony,
                phoneNumber: '+18882556247',
                direction: 'Inbound',
              });
            }) as StepFunction,
            <CheckCallStatus status={this.example.statusInCTI} />,
          ]}
        />
      </Scenario>
    );
  }
}

// | Reply | |
// | Received | |
// | Fax Receipt Error | |
// | Fax on Demand | |
// | Partial Receive | |
// | International Disabled | |
// | Busy |Busy |
// | Fax Send Error | |
// | Sent | |
// | Call Failed | |
// | Internal Error | |
// | IP Phone Offline | |
// | Restricted Number | |
// | Wrong Number | |
// | Stopped | |
// | Suspended Account | |
// | Abandoned | |
// | Declined |Declined |
// | Fax Receipt | |
// | Fax Send Error | |

@common
@autorun(test.skip)
@p2
@title('Log call screen - history status')
export class RCI1006History extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  @examples(`
    | statusFromCallLogAPI | statusInCti      |
    | 'Missed'             | 'Missed'         |
    | 'Call Accepted'      | 'Call Accepted'  |
    | 'Voicemail'          | 'Voicemail'      |
    | 'Rejected'           | 'Declined'       |
    | 'Blocked'            | 'Blocked'        |
    | 'Call connected'     | 'Call connected' |
    | 'No answer'          | 'No answer'      |
    | 'Hang up'            | 'Hung up'        |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Log call screen - check history status">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockCallLogSync
              mockResponse={generateCallLogData({
                result: this.example.statusFromCallLogAPI,
                sessionId: '123',
                telephonySessionId: '123',
              })}
              repeat={1}
              isDefaultInit={false}
            />,
            Login,
          ]}
        />
        <When desc="End the call(Rejecect/Hang up, Missed... etc), check the status value" />
        <Then
          desc="The status and text color display like:
  | Unknown | |
  | Missed |Missed |
	| Call Accepted |Answered |
	| Voicemail |Voicemail |
	| Rejected |Declined |
	| Reply | |
	| Received | |
	| Fax Receipt Error | |
	| Fax on Demand | |
	| Partial Receive | |
	| Blocked |Blocked |
	| Call connected |Connected |
	| No answer |No Answer |
	| International Disabled | |
	| Busy |Busy |
	| Fax Send Error | |
	| Sent | |
	| Call Failed | |
	| Internal Error | |
	| IP Phone Offline | |
	| Restricted Number | |
	| Wrong Number | |
	| Stopped | |
	| Suspended Account | |
	| Hang up |Hung up |
	| Abandoned | |
	| Declined |Declined |
	| Fax Receipt | |
	| Fax Send Error | |

										Note: all the blank values are shown as the value returns from API"
          action={[
            NavigateToHistory,
            () => {
              userEvent.click(screen.getByTestId('log'));
            },
            <CheckCallStatus status={this.example.statusInCti} />,
          ]}
        />
      </Scenario>
    );
  }
}

@common
@autorun(test.skip)
@p2
@title('Log call screen - Icon and title')
export class RCI1006IconAndTitle extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  @examples(`
    | isActive | direction  | status                | tooltip    | icon         |
    | true     | 'Inbound'  | 'Active inbound'      | 'Inbound'  | 'activeCall' |
    | true     | 'Outbound' | 'Active outbound'     | 'Outbound' | 'activeCall' |
    | false    | 'Inbound'  | 'Missed'              | 'Missed'   | 'missed'     |
    | false    | 'Inbound'  | 'Disconnect inbound'  | 'Inbound'  | 'inbound'    |
    | false    | 'Outbound' | 'Disconnect outbound' | 'Outbound' | 'outbound'   |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Log call screen - check history status">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockCallLogSync
              mockResponse={generateCallLogData({
                direction: this.example.direction,
                result:
                  this.example.status === 'Missed'
                    ? 'Missed'
                    : 'Call connected',
              })}
              repeat={1}
            />,
            Login,
            (async (_, { rcMock }) => {
              if (this.example.isActive) {
                await rcMock.makeCall({
                  phoneNumber: '+18882556247',
                  direction: this.example.direction,
                  status: PartyStatusCode.answered,
                });
                if (this.example.direction === 'Inbound') {
                  return <ClickBackButton />;
                }
                return [<NavigateTo path="/calls" />];
              }
              return <NavigateToHistory />;
            }) as StepFunction,
          ]}
        />

        <When desc="Check Call status icon" />
        <Then
          desc="It should be displayed with real time status
										Active inbound
										Active outbound
										Missed
										Disconnect inbound
										Disconnect outbound"
          action={() => {
            if (this.example.isActive) {
              expect(
                screen.getByTestId('callDirection').querySelector('svg'),
              ).toHaveClass(this.example.icon);
            } else {
              expect(screen.getByTitle(this.example.tooltip)).toHaveClass(
                this.example.icon,
              );
            }
          }}
        />
        <When desc="Mouse hover Call status icon" />
        <Then
          desc="Tooltips displays:
										Active inbound: Inbound
										Active outbound: Outbound
										Missed: Missed
										Disconnect inbound: Inbound
										Disconnect outbound: Outbound"
          action={() => {
            expect(screen.getByTitle(this.example.tooltip)).toBeInTheDocument();
          }}
        />
      </Scenario>
    );
  }
}
