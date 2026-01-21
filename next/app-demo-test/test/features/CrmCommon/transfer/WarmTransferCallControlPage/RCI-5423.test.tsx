/* Check "Complete transfer" button on control buttons
https://test_it_domain/test-cases/RCI-5423
*/
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
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

import { CheckAlertMessage } from '../../../../steps/Alert';
import { MakeCall } from '../../../../steps/Call';
import { CheckEventTracking } from '../../../../steps/Tracking';
import {
  CheckAfterCompleteTransfer,
  CheckCompleteTransferButtonStatus,
  ClickCompleteTransferButton,
  InitAWarmTransferCall,
  MockCompleteTransfer,
} from '../../../../steps/Transfer';

@autorun(test.skip)
@it
@common
@p2
@title('Check notification after "Complete transfer" fail')
export class CheckCompleteTransferButtonFail extends Step {
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
          desc="User should be see that 'Complete button' on the call control panel and button is enabled and hover to show tooltip 'Complete transfer'"
          action={[
            async (_: any, { rcMock }: Context) => {
              await rcMock.connectLatestCall();
            },
            <CheckCompleteTransferButtonStatus isDisable={false} />,
          ]}
        />
        <When
          desc="User click 'Complete transfer' button"
          action={[
            (_: any, { rcMock }: Context) => {
              rcMock.completeWarmTransfer(409);
            },
            ClickCompleteTransferButton,
          ]}
        />
        <Then
          desc="User should be see that pop up notification 'Unexpected server error. Please try again later.' and still on the original call's call log page"
          action={[
            <CheckAlertMessage message="Unexpected server error. Please try again later." />,
            <CheckAfterCompleteTransfer isCompleteTransfer={false} />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@common
@it
@p2
@title('Check notification after "Complete transfer" successfully')
export class CheckCompleteTransferButtonSucceed extends Step {
  EntryWithLoggedIn?: StepFunction<any, any>;
  warmTransferTrack?: string;

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
          desc="User should be see that 'Complete button' on the call control panel and button is enabled and hover to show tooltip 'Complete transfer'"
          action={[
            async (_: any, { rcMock }: Context) => {
              await rcMock.connectLatestCall();
            },
            <CheckCompleteTransferButtonStatus isDisable={false} />,
          ]}
        />
        <And
          desc="Should track event 'Transfer: Click Warm Transfer/Transfer page' with correct props"
          action={
            <CheckEventTracking
              check={(logs) => {
                const log = logs.find(
                  ({ event }) => event === this.warmTransferTrack,
                );
                expect(log).not.toBeUndefined();
                expect(log?.trackProps).toEqual(
                  expect.objectContaining({
                    contactType: null,
                    isDialPadInput: true,
                  }),
                );
              }}
            />
          }
        />
        <When
          desc="User click 'Complete transfer' button"
          action={[
            (_: any, { rcMock }: Context) => {
              rcMock.completeWarmTransfer();
            },
            ClickCompleteTransferButton,
          ]}
        />
        <Then
          desc="User should be see that pop up notification 'Call transferred'"
          action={<CheckAlertMessage message="Call transferred" />}
        />
        <And
          desc="Should track event 'Transfer: Click complete transfer/Warm transfer call log page'"
          action={
            <CheckEventTracking
              check={(logs) => {
                const log = logs.find(
                  ({ event }) => event === trackEvents.completeWarmTransfer,
                );
                expect(log).not.toBeUndefined();
              }}
            />
          }
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@common
@it
@p2
@title('Check action after "Complete transfer" successful')
export class CheckCompleteTransferButton extends Step {
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
        <When
          desc="User click 'Complete transfer' button"
          action={MockCompleteTransfer}
        />
        <And
          desc="init a warm transfer call to 110"
          action={<InitAWarmTransferCall phoneNumber="110" />}
        />

        <Then
          desc="User should be see that 'Complete button' on the call control panel and button is enabled and hover to show tooltip 'Complete transfer'"
          action={[
            async (_: any, { rcMock }: Context) => {
              await rcMock.connectLatestCall();
            },
            <CheckCompleteTransferButtonStatus isDisable={false} />,
          ]}
        />

        <When
          desc="User click 'Complete transfer' button"
          action={ClickCompleteTransferButton}
        />
        <Then
          desc="User should be see that pop up notification 'Unexpected server error. Try again later.' and still on the original call's call log page"
          action={<CheckAfterCompleteTransfer />}
        />
      </Scenario>
    );
  }
}
