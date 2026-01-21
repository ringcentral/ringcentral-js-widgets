/**
RCI-4429: Recording Status - transfer call
https://test_it_domain/test-cases/RCI-5430
Preconditions:
User is logged into Salesforce
User is logged in RC CTI App
Accoun A's configuration:      Account A's call recording is enabled in SW      Account A's auto call recording control is disabled in SW Note:Sub session infosection- topActive session infosection- bottom
Note:
Sub session infosection- top
Active session infosection- bottom
Entry point(/s):
Make a call(Original call)> Initial a warm transfer(Transfer call)> Click record for transfer call
 */
import {
  And,
  autorun,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import {
  MakeCall,
  RecordCall,
  CheckOnlyActiveCallRecording,
  CheckOnlySubCallRecording,
  CheckBothCallRecording,
} from '../../../../steps/Call';
import {
  CheckTransferSwitchButtonStatus,
  ClickMoreButton,
  ClickTransferCallSwitchButton,
  InitAWarmTransferCall,
} from '../../../../steps/Transfer';

@autorun(test.skip)
@common
@it
@p2
@title('Check warm transfer call call base info one active one hold')
export class RCI5430 extends Step {
  EntryWithLoggedIn?: StepFunction<any, any>;

  run() {
    const { EntryWithLoggedIn } = this;
    return (
      <Scenario desc="Check call base info  on warm transfer call">
        <Given
          desc="User login to third party cti"
          action={EntryWithLoggedIn}
        />
        <When
          desc="User make a outbound or inbound call"
          action={() => (
            <MakeCall
              phoneNumber="102"
              direction="Inbound"
              status="connected"
            />
          )}
        />
        <And
          desc="init a warm transfer call and click switch warm transfer button"
          action={[
            <InitAWarmTransferCall phoneNumber="110" />,
            <CheckTransferSwitchButtonStatus isButtonDisabled />,
            (async (_, { rcMock }) => {
              await rcMock.connectLatestCall();
            }) as StepFunction,
          ]}
        />
        <When desc="Click more button" action={ClickMoreButton} />
        <When desc="Click record button" action={RecordCall} />
        <Then
          desc="Transfer call is on recording
                    Transfer call show on Active session info section with indicator show
                    Original call show on Sub session info section with no indicator show
                    Show indicator on header bar"
          action={CheckOnlyActiveCallRecording}
        />
        <When
          desc="Click transfer call switch button"
          action={ClickTransferCallSwitchButton}
        />

        <Then
          desc="Original call show on Active session info section with no indicator show
                    Transfer call show on Sub session info section with indicator show
                    Transfer call is on recording
                    Show indicator on header bar"
          action={CheckOnlySubCallRecording}
        />
        <When desc="Click record button" action={RecordCall} />

        <Then
          desc="Active session info section andSub session info section both show indicator
										Transfer call and original call is both on recording
										Show indicator on header bar"
          action={CheckBothCallRecording}
        />
      </Scenario>
    );
  }
}
