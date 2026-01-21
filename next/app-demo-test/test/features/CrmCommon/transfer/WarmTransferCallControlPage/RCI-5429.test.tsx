/* Back to origin call log page when hangup call during warm transfer process
https://test_it_domain/test-cases/RCI-5429
*/
import { StepFunction } from '@ringcentral-integration/crius';
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
} from '@ringcentral-integration/test-utils';

import { MakeCall, OperateCall } from '../../../../steps/Call';
import {
  CheckLogBaseInfoSubSectionNotExist,
  CheckLogBaseInfoActive,
} from '../../../../steps/CallLog';
import {
  ClickMoreButton,
  HangupWarmTransferCall,
  ClickTransferCallSwitchButton,
  InitAWarmTransferCall,
} from '../../../../steps/Transfer';

const mockWarmTransferCallPhoneNumber = '+18002121222';
const mockOriginCallPhoneNumber = '+18002121223';
const formatOriginCallNumber = '(800) 212-1223';

@autorun(test.skip)
@it
@p2
@common
@title('Check warm transfer call call base info after hang up transfer call')
export class CheckWarmTransferCallBaseAfterHangupTransferCall extends Step {
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
      expectCallNameActiveSessionAfterSwitch: 'origin call',
      expectPhoneNumberInActiveSessionAfterSwitch: formatOriginCallNumber,
      expectActiveSessionCallStatusAfterSwitch: 'On Hold',
    },
  ])
  run() {
    const { EntryWithLoggedIn } = this;

    return (
      <Scenario desc="Check call base info  on warm transfer call">
        <Given desc="User login to Salesforce cti" action={EntryWithLoggedIn} />

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
          ]}
        />
        <And desc="click hung up call button" action={HangupWarmTransferCall} />
        <Then
          desc="check call base Sub info"
          action={() => <CheckLogBaseInfoSubSectionNotExist />}
        />

        <Then
          desc="check call base info Active call"
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
@title('Check warm transfer call call base info after hang up origin call')
export class CheckWarmTransferCallBaseAfterHangupOriginCall extends Step {
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
      expectCallNameActiveSessionAfterSwitch: 'origin call',
      expectPhoneNumberInActiveSessionAfterSwitch: formatOriginCallNumber,
      expectActiveSessionCallStatusAfterSwitch: 'Disconnected',
    },
  ])
  run() {
    const { EntryWithLoggedIn } = this;

    return (
      <Scenario desc="Check call base info  on warm transfer call">
        <Given desc="User login to Salesforce cti" action={EntryWithLoggedIn} />

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
          action={ClickTransferCallSwitchButton}
        />
        <And desc="click hung up call button" action={HangupWarmTransferCall} />
        <Then
          desc="check call base Sub info"
          action={() => <CheckLogBaseInfoSubSectionNotExist />}
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
