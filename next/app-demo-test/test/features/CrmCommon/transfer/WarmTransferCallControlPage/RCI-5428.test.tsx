/* Check complete transfer/switch button status with ringing call
https://test_it_domain/test-cases/RCI-5428
*/
import {
  And,
  autorun,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  StepFunction,
  Context,
} from '@ringcentral-integration/test-utils';

import { MakeCall } from '../../../../steps/Call';
import {
  CheckCompleteTransferButtonStatus,
  CheckControlButtonStatus,
  InitAWarmTransferCall,
} from '../../../../steps/Transfer';

@autorun(test.skip)
@common
@it
@p2
@title('Check "Complete transfer" button on control buttons with ringing')
export class CheckCompleteTransferButtonOnPSTNCall extends Step {
  EntryWithLoggedIn?: StepFunction<any, any>;

  run() {
    const { EntryWithLoggedIn } = this;
    return (
      <Scenario desc="Check 'Complete transfer' button on control buttons">
        <Given
          desc="User login to third party cti"
          action={EntryWithLoggedIn}
        />

        <When
          desc="User make a outbound or inbound call"
          action={() => (
            <MakeCall
              phoneNumber="18882556247"
              direction="Inbound"
              status="connected"
            />
          )}
        />
        <And
          desc="init a warm transfer call to 110"
          action={<InitAWarmTransferCall phoneNumber="110" />}
        />

        <Then
          desc="User should be see that 'Complete button' on the call control panel and button is disabled"
          action={[
            <CheckControlButtonStatus
              controlButtons={{
                name: ['warmTransferSwitchCallButton'],
                status: 'disabled',
              }}
            />,
            <CheckCompleteTransferButtonStatus isDisable />,
          ]}
        />
        <Then
          desc="User should be see that 'Complete button' on the call control panel and button is enabled and hover to show tooltip 'Complete transfer'"
          action={[
            async (_: any, { rcMock }: Context) => {
              await rcMock.connectLatestCall();
            },
            <CheckControlButtonStatus
              controlButtons={{
                name: ['warmTransferSwitchCallButton'],
                status: 'enabled',
              }}
            />,
            <CheckCompleteTransferButtonStatus isDisable={false} />,
          ]}
        />
      </Scenario>
    );
  }
}
