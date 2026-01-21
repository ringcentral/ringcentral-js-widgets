/* Check control buttons action on warm transfer page
https://test_it_domain/test-cases/RCI-5426
*/
import {
  And,
  autorun,
  Context,
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
} from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { MakeCall, OperateCall } from '../../../../steps/Call';
import { CheckLogBaseInfoActive } from '../../../../steps/CallLog';
import { MockPresence, MockCallLogSync } from '../../../../steps/Mock';
import {
  CheckCallListLength,
  CheckCallLogPageAfterHangup,
  CheckControlButtonOnWarmTransfer,
  CheckControlCallStatus,
  CheckTransferSwitchButtonStatus,
  ClickMoreButton,
  ClickTransferCallSwitchButton,
  HangupWarmTransferCall,
  InitAWarmTransferCall,
} from '../../../../steps/Transfer';

@autorun(test.skip)
@common
@it
@p2
@title('Check control buttons action on warm transfer page')
export class CheckControlButtonsOfTransferCall extends Step {
  CreateMock?: StepFunction<any, any>;
  Login?: StepFunction<any, any>;

  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Check control buttons action on warm transfer page">
        <Given
          desc="User login to Salesforce cti"
          action={[
            CreateMock,
            <MockPresence isDefaultInit repeat={0} />,
            <MockCallLogSync isDefaultInit repeat={0} />,
            Login,
          ]}
        />
        <When
          desc="User make a inbound call"
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
        <And desc="User click more button" action={ClickMoreButton} />
        <And
          desc="User click more button and click hold"
          action={<OperateCall dataSign="hold" />}
        />
        <Then
          desc="User should be see that transfer call will be hold"
          action={<CheckControlCallStatus action="hold" />}
        />
        <And
          desc="User click more button and click record"
          action={<OperateCall dataSign="record" />}
        />
        <Then
          desc="User should be see that transfer call will be recording"
          action={<CheckControlCallStatus action="record" />}
        />
        <And
          desc="User click more button and click mute"
          action={<OperateCall dataSign="mute" />}
        />
        <Then
          desc="User should be see that transfer call will be muted"
          action={<CheckControlCallStatus action="mute" />}
        />
        <When
          desc="User hangup call"
          action={[ClickMoreButton, HangupWarmTransferCall]}
        />
        <Then
          desc="User should be see that transfer call is disconnected and original call still on hold and back to the original call log page"
          action={[
            <CheckCallLogPageAfterHangup originCallName="+18882556247" />,
            <CheckCallListLength
              callListLength={1}
              currentName="+18882556247 (Caller)"
            />,
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
@title('Check control buttons action on warm transfer page')
export class CheckControlButtonsOfOriginalCall extends Step {
  CreateMock?: StepFunction<any, any>;
  Login?: StepFunction<any, any>;

  run() {
    const { CreateMock, Login } = this;

    return (
      <Scenario desc="Check control buttons action on warm transfer page">
        <Given
          desc="User login to Salesforce cti"
          action={[
            CreateMock,
            <MockPresence isDefaultInit repeat={0} />,
            <MockCallLogSync isDefaultInit repeat={0} />,
            Login,
          ]}
        />
        <When
          desc="User make inbound call"
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
        <And
          desc="click switch warm transfer button"
          action={[
            <CheckTransferSwitchButtonStatus isButtonDisabled />,
            async (_: any, { rcMock }: Context) => {
              await rcMock.connectLatestCall();
            },
            <CheckTransferSwitchButtonStatus isButtonDisabled={false} />,
            ClickTransferCallSwitchButton,
          ]}
        />
        <Then
          desc="User should be see that have (Complete transfer button| More button) in the control button panel"
          action={CheckControlButtonOnWarmTransfer}
        />
        <When
          desc="User hangup call"
          action={[ClickMoreButton, HangupWarmTransferCall]}
        />
        <Then
          desc="User should be see that original call is disconnected and transfer call still on hold and back to the original call log page"
          action={[
            <CheckLogBaseInfoActive
              name="+18882556247"
              status="Disconnected"
            />,
            <CheckCallListLength
              callListLength={1}
              currentName="110 (Transfer)"
            />,
            () => {
              fireEvent.click(screen.getByTestId('currentCallButton'));
            },
            <CheckLogBaseInfoActive name="110" status="On Hold" />,
          ]}
        />
      </Scenario>
    );
  }
}
