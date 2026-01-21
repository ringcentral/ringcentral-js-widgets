/**
 * RCI-5432: Check warm transfer call log & control page on multiple tab
 * https://test_it_domain/test-cases/RCI-5432
 * Preconditions:
 * User is logged into Salesforce
 * User is logged in RC CTI AppNote:Sub session infosection- topActive session infosection- bottom
 * Note:
 * Sub session infosection- top
 * Active session infosection- bottom
 * Entry point(/s):
 * > Make a call(Original call)
 * > Go to the transfer page, input character in the 'To' field
 * > Click the 'Ask first' button(Transfer call)
 */
import {
  And,
  autorun,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
  screen,
  common,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage } from '../../../../steps/Alert';
import { MakeCall } from '../../../../steps/Call';
import { CheckInCallLogPageByTitle } from '../../../../steps/CallLog';
import {
  CheckControlButtonOnWarmTransfer,
  CheckControlButtonStatus,
  ClickCompleteTransferButton,
  InitAWarmTransferCall,
} from '../../../../steps/Transfer';

@autorun(test.skip)
@common
@it
@p2
@title('Check warm transfer call log & control page on multiple tab')
export class RCI5432 extends Step {
  EntryWithLoggedIn?: StepFunction<any, any>;

  phoneNumber1 = '+16572343431';
  phoneNumber2 = '+16572343432';
  call1SessionId: string = '';
  call2SessionId: string = '';
  run() {
    const { EntryWithLoggedIn } = this;

    return (
      <Scenario desc="Check warm transfer call log & control page on multiple tab">
        <Given
          desc="User login to third party cti"
          action={EntryWithLoggedIn}
        />

        <When
          desc="Direct to entry point
        > Make a call(Original call)
        > Go to the transfer page, input character in the 'To' field
        > Click the 'Ask first' button(Transfer call)"
          action={[
            <MakeCall
              direction={'Outbound'}
              status={this.example.call1Status}
              phoneNumber={this.phoneNumber1}
            />,
            <InitAWarmTransferCall phoneNumber={this.phoneNumber2} />,
          ]}
        />
        <Then
          desc="Origin call show on Sub session info section
										Transfer call show on Active session info section
										Switch button showin the middle betweenCall Base Info Sub SessionandCall Base InfoActiveSession.
										In the control button panel, there are these buttons:
										Complete transfer
										More"
          action={[
            () => {
              expect(screen.getByTestId('logName')).toHaveTextContent(
                this.phoneNumber2,
              );
              expect(screen.getByTestId('subLogName')).toHaveTextContent(
                this.phoneNumber1,
              );
            },
            <CheckControlButtonStatus
              controlButtons={{
                name: ['warmTransferSwitchCallButton'],
                status: 'disabled',
              }}
            />,
            (async (_: any, { rcMock }) => {
              await rcMock.connectLatestCall();
              await rcMock.completeWarmTransfer();
            }) as StepFunction,
            CheckControlButtonOnWarmTransfer,
          ]}
        />
        <When
          desc="Click complete transfer button"
          action={[ClickCompleteTransferButton]}
        />
        <Then
          desc="Still on the original call's call log page
										The original call and transferred call should be disconnected
										Pop up notification'Call transferred'"
          action={[
            CheckInCallLogPageByTitle,
            <CheckAlertMessage message={'Call transferred'} />,
          ]}
        />
      </Scenario>
    );
  }
}
