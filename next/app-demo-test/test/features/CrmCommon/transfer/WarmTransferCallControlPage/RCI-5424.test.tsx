/* Check warm transfer call log base info switch button behavior
https://test_it_domain/test-cases/RCI-5424
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
  Then,
  title,
  When,
  common,
  StepFunction,
  Context,
} from '@ringcentral-integration/test-utils';

import { MakeCall, OperateCall } from '../../../../steps/Call';
import {
  CheckLogBaseInfoSub,
  CheckLogBaseInfoActive,
} from '../../../../steps/CallLog';
import { CheckEventTracking } from '../../../../steps/Tracking';
import {
  CheckTransferSwitchButtonStatus,
  ClickMoreButton,
  ClickTransferCallSwitchButton,
  InitAWarmTransferCall,
} from '../../../../steps/Transfer';

const mockWarmTransferCallPhoneNumber = '+18002121222';
const mockOriginCallPhoneNumber = '+18002121223';
const formatOriginCallNumber = '(800) 212-1223';

@autorun(test.skip)
@common
@it
@p2
@title('Check warm transfer call call base info one active one hold')
export class CheckWarmTransferCallBaseInfo extends Step {
  EntryWithLoggedIn?: StepFunction<any, any>;

  @examples([
    {
      // should implement the mockContactMatch
      mockContactMatch: [
        {
          Name: 'warm transfer call',
          Phone: mockWarmTransferCallPhoneNumber,
          Id: 'testConId',
        },
        {
          Name: 'origin call',
          Phone: mockOriginCallPhoneNumber,
          Id: 'testConId2',
        },
      ],
      expectCallNameSubSessionAfterSwitch: 'warm transfer call',
      expectCallNameActiveSessionAfterSwitch: 'origin call',
      expectPhoneNumberInActiveSessionAfterSwitch: formatOriginCallNumber,
      expectActiveSessionCallStatusAfterSwitch: 'Connected',
    },
    {
      mockContactMatch: undefined,
      expectCallNameSubSessionAfterSwitch: mockWarmTransferCallPhoneNumber,
      expectCallNameActiveSessionAfterSwitch: mockOriginCallPhoneNumber,
      expectPhoneNumberInActiveSessionAfterSwitch: formatOriginCallNumber,
      expectActiveSessionCallStatusAfterSwitch: 'Connected',
    },
  ])
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
              phoneNumber={mockOriginCallPhoneNumber}
              direction="Inbound"
              status="connected"
            />
          )}
        />
        <And
          desc="init a warm transfer call and click switch warm transfer button"
          action={[
            <InitAWarmTransferCall
              phoneNumber={mockWarmTransferCallPhoneNumber}
            />,
            <CheckTransferSwitchButtonStatus isButtonDisabled />,
            async (_: any, { rcMock }: Context) => {
              await rcMock.connectLatestCall();
            },
            <CheckTransferSwitchButtonStatus isButtonDisabled={false} />,
            ClickTransferCallSwitchButton,
          ]}
        />
        <Then
          desc="check call base Sub info"
          action={({ expectCallNameSubSessionAfterSwitch }: any) => (
            <CheckLogBaseInfoSub
              name={expectCallNameSubSessionAfterSwitch}
              hasCallStatusIcon
              hasDuration
            />
          )}
        />
        <Then
          desc="check  call base info Active call"
          action={({
            expectCallNameActiveSessionAfterSwitch,
            expectPhoneNumberInActiveSessionAfterSwitch,
            expectActiveSessionCallStatusAfterSwitch,
          }: any) => (
            <CheckLogBaseInfoActive
              name={expectCallNameActiveSessionAfterSwitch}
              phoneNumber={expectPhoneNumberInActiveSessionAfterSwitch}
              status={expectActiveSessionCallStatusAfterSwitch}
            />
          )}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@common
@it
@p2
@title('Check warm transfer call call base info two hold')
export class CheckWarmTransferCallBaseInfoHoldSwitch extends Step {
  EntryWithLoggedIn?: StepFunction<any, any>;
  switchWarmTransferTrack?: string;

  @examples([
    {
      // should implement the mockContactMatch
      mockContactMatch: [
        {
          Name: 'warm transfer call',
          Phone: mockWarmTransferCallPhoneNumber,
          Id: 'testConId',
        },
        {
          Name: 'origin call',
          Phone: mockOriginCallPhoneNumber,
          Id: 'testConId2',
        },
      ],
      expectCallNameSubSessionAfterSwitch: 'warm transfer call',
      expectCallNameActiveSessionAfterSwitch: 'origin call',
      expectPhoneNumberInActiveSessionAfterSwitch: formatOriginCallNumber,
      expectActiveSessionCallStatusAfterSwitch: 'On Hold',
    },
  ])
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
              phoneNumber={mockOriginCallPhoneNumber}
              direction="Inbound"
              status="connected"
            />
          )}
        />
        <And
          desc="init a warm transfer call and hold the new call"
          action={[
            <InitAWarmTransferCall
              phoneNumber={mockWarmTransferCallPhoneNumber}
            />,
            ClickMoreButton,
            <OperateCall dataSign="hold" />,
          ]}
        />
        <And
          desc="click switch warm transfer button"
          action={() => (
            <CheckTransferSwitchButtonStatus isButtonDisabled={false} />
          )}
        />
        <And
          desc="click switch warm transfer button"
          action={ClickTransferCallSwitchButton}
        />
        <Then
          desc="check call base Sub info"
          action={({ expectCallNameSubSessionAfterSwitch }: any) => (
            <CheckLogBaseInfoSub
              name={expectCallNameSubSessionAfterSwitch}
              hasCallStatusIcon
              hasDuration
            />
          )}
        />
        <And
          desc="Should track event 'Transfer: Click switch/Warm transfer call log page'"
          action={
            <CheckEventTracking
              check={(logs) => {
                const log = logs.find(
                  ({ event }) => event === this.switchWarmTransferTrack,
                );
                expect(log).not.toBeUndefined();
              }}
            />
          }
        />
        <Then
          desc="check  call base info Active call"
          action={({
            expectCallNameActiveSessionAfterSwitch,
            expectPhoneNumberInActiveSessionAfterSwitch,
            expectActiveSessionCallStatusAfterSwitch,
          }: any) => (
            <CheckLogBaseInfoActive
              name={expectCallNameActiveSessionAfterSwitch}
              phoneNumber={expectPhoneNumberInActiveSessionAfterSwitch}
              status={expectActiveSessionCallStatusAfterSwitch}
            />
          )}
        />
      </Scenario>
    );
  }
}
