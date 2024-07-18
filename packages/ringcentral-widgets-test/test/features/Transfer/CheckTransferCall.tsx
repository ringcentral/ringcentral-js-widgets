/**
 * RCI-1112: Transfer pop up page
 * https://test_it_domain/test-cases/RCI-1112
 * Preconditions:
 * 1. RC CTI app was installed and enabled
 * 2. User has logged in to 3rd party
 * 3. User has logged in to RC CTI
 * 4. There are 2 phone numbers:
 * phoneNumberA: which matches multiple entities on Salesforce
 * phoneNumberB: which has logged in on other device
 * Entry point(/s):
 * 1. Make an inbound/outbound call and keep in call log page
 * 2. Make an inbound/outbound call, and go to 'All Calls' page
 * 3. Make an inbound/outbound call > back to 'All Calls' page > click the left section on the call item
 */
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
} from '@ringcentral-integration/test-utils';

import type { StepFunction } from '../../lib/step';
import {
  AnswerCall,
  CallButtonBehavior,
  CheckCallStatus,
  MakeCall,
} from '../../steps/Call';
import {
  GoToTransferPage,
  TransferCall,
  CheckTransferPage,
} from '../../steps/Call/SmallCallControl';
import { CheckInCallLogPage } from '../../steps/CallLog/checks';
import { ClickBackButton } from '../../steps/Common/actions/ClickBackButton';

export const CheckTransferCall = ({
  Login,
  MockContactSearch,
}: {
  Login: StepFunction;
  MockContactSearch: StepFunction;
}) => {
  @autorun(test)
  @it
  @p2
  @title('Transfer pop up page')
  class TransferClass extends Step {
    @examples(`
  | phoneType | phoneNumber |
  | 'Inbound'   | '+16509807435' |
  | 'Outbound'   | '+16509807435' |
  `)
    run() {
      return (
        <Scenario desc="Verify transferring call...">
          <When
            desc="For entry point 1, check the bottom of call log page
										For entry point 2, check the call just made
										For entry point 3, check the call control page"
            action={[Login, MockContactSearch]}
          />
          <Then
            desc="There is a 'Transfer' button
										if the call is an incoming call and it's ringing, the 'Transfer' button should be disabled
										if the call is in connected, the Transfer button should be enabled
										[L10N]"
            action={[
              <MakeCall direction={this.context.example.phoneType} />,
              () => {
                const actions = [];
                if (this.context.example.phoneType === 'Inbound') {
                  actions.push(AnswerCall);
                }
                return actions;
              },
              <CallButtonBehavior callButtonBehaviorType="more" />,
            ]}
          />
          <When desc="Press 'Transfer' button" action={GoToTransferPage} />
          <Then
            desc="The following information are shown:
										Back button
										'Transfer To'
										'To' field
										Keypad
										'Transfer' button
										[L10N]"
            action={CheckTransferPage}
          />
          <When desc="Click back button" action={ClickBackButton} />
          <Then
            desc="1. For entry point 1, user will back to call log page
										2. For entry point 2, user will back to 'All Calls' page
										3. For entry point 3, user will back to call control page"
            action={CheckInCallLogPage}
          />
          <When
            desc="Press 'Transfer' button again, enter phoneNumberA in 'To' field"
            action={
              <TransferCall phoneNumber={this.context.example.phoneNumber} />
            }
          />
          <When desc="Enter phoneNumberB in 'To' field and then click 'Transfer' button" />
          <Then
            desc="1. The call ended
										2. The device which is logged with phoneNumberB start to ring
										3. The active call page disappears and navigates to the page following below:
										For entry point 1, back to call log page
										Only an active call:
										if call log section is closed, navigate to 'Dial' pageif not, navigated to 'All Calls' tab
										More than two active calls: navigate to 'All Calls'tab
										if call log section is closed, navigate to 'Dial' page
										if not, navigated to 'All Calls' tab"
            action={[
              CheckInCallLogPage,
              <CheckCallStatus status="Disconnected" />,
            ]}
          />
        </Scenario>
      );
    }
  }
};
