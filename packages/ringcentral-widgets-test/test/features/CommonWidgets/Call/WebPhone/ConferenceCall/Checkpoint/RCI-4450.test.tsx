/**
 * RCI-4450: Another call when there is a conference call ongoing
 * https://test_it_domain/test-cases/RCI-4450
 * Preconditions:
 * The user has logged into 3rd party.
 * The user has logged into RC CTI App
 * WebPhone is enabled
 * 'Browser' is selected in Settings > Calling > Make my calls with
 * Entry point(/s):
 * There is a conference call ongoing
 *
  | Entry Path |Call direction |
  | > Make an {Call direction} |Outbound |
	| > Make an {Call direction}> Click theAnwser&Hold button |Inbound |

 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
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
  waitForRenderReady,
  common,
} from '@ringcentral-integration/test-utils';

import {
  ClickCallItemByLabel,
  AnswerAndHoldCall,
  CheckAllCallsListPage,
  ClickAddButton,
  ClickMergeButton,
  MakeCall,
  CheckConferenceCallControlPage,
  CheckConferenceInfoPage,
  ClickBackButton,
  CheckAnswerAndHoldBehavior,
  CheckOutboundAndHoldBehavior,
  CheckActiveCallExist,
} from '../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  MockConferenceCall,
  MockTelephonySession,
  MockBringInToConference,
  TriggerActiveCallChanged,
  MockCallPresence,
  CreateMock as CommonCreateMock,
  MockNumberParserV2,
  MockGetTelephonyState,
  MockMessageSync,
  MockGetPhoneNumber,
} from '../../../../../../steps/Mock';
import { NavigateToDialer } from '../../../../../../steps/Navigate';

@autorun(test.skip)
@common
@it
@p2
@title('Another call when there is a conference call ongoing')
export class RCI4450 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  @examples(`
    | phoneNumber    | direction  |
    | '+16505819954' | 'Outbound' |
    | '+16505819954' | 'Inbound'  |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Another call when there is a conference call ongoing">
        <When
          desc="Log in CTI"
          action={[
            CreateMock,
            MockNumberParserV2,
            MockGetTelephonyState,
            MockMessageSync,
            MockGetPhoneNumber,
            Login,
            (_: any, { phone }: any) => {
              jest.spyOn(phone.webphone, 'answer');
              jest.spyOn(phone.webphone, '_onAccepted');
              jest.spyOn(phone.webphone, 'hold');
            },
          ]}
        />
        <When
          desc="Click the call button"
          action={[NavigateToDialer, <MakeCall phoneNumber="+18882556247" />]}
        />
        <And
          desc="Add a call"
          action={[ClickAddButton, <MakeCall phoneNumber="+18882556241" />]}
        />
        <Then
          desc="Check the conference call control page"
          action={CheckConferenceCallControlPage}
        />
        <When
          desc="Merge a call"
          action={[
            MockConferenceCall,
            <MockBringInToConference repeat={2} />,
            <MockTelephonySession repeat={0} />,
            ClickMergeButton,
            CheckConferenceInfoPage,
          ]}
        />
        <And
          desc="Make an ${direction} call"
          action={async ({ direction, phoneNumber }: any) => [
            <MakeCall
              status={direction === 'Inbound' ? 'ring' : 'connected'}
              phoneNumber={phoneNumber}
              direction={direction}
              useUserAgentSession
            />,
            MockCallPresence,
            direction === 'Inbound' ? <AnswerAndHoldCall /> : () => ({}),
            TriggerActiveCallChanged,
            waitForRenderReady,
          ]}
        />
        <Then
          desc="The current user's conference call will be held
								The {Call direction}call is connected"
          action={({ direction, phoneNumber }: any) => [
            direction === 'Inbound' ? (
              <CheckAnswerAndHoldBehavior
                firstCallFinder={(sessions) =>
                  sessions.find((item) => item.id.includes('conf'))
                }
                secondCallPNumber={phoneNumber}
              />
            ) : (
              <CheckOutboundAndHoldBehavior
                firstCallFinder={(sessions) =>
                  sessions.find((item) => item.id.includes('conf'))
                }
                secondCallPNumber={phoneNumber}
              />
            ),
          ]}
        />
        <When desc="Click the All Calls back button" action={ClickBackButton} />
        <Then
          desc="There are two sections in the all calls list:
                Current call: an {Call direction}
                On hold section: a conference call"
          action={
            <CheckAllCallsListPage
              length={2}
              currentCallsLength={1}
              onHoldCallsLength={1}
            />
          }
        />
        <When
          desc="Click the item of the conference call"
          action={<ClickCallItemByLabel label="Call on Hold" />}
        />
        <Then
          desc="User should be navigate to Call control page;"
          action={CheckActiveCallExist}
        />
      </Scenario>
    );
  }
}
