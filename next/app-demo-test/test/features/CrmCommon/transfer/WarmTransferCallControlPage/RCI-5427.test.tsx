/* Check transfer to Voicemail
https://test_it_domain/test-cases/RCI-5427
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

import { MakeCall } from '../../../../steps/Call';
import {
  CheckLogBaseInfoSub,
  CheckLogBaseInfoActive,
} from '../../../../steps/CallLog';
import {
  CheckControlButtonOnWarmTransfer,
  CheckMoreButtons,
  ClickMoreButton,
  InitAWarmTransferCall,
} from '../../../../steps/Transfer';

const mockWarmTransferCallPhoneNumber = '+18002121222';
const mockOriginCallPhoneNumber = '+18002121223';
const formatTransferNumber = '(800) 212-1222';

@autorun(test.skip)
@common
@it
@p2
@title('Check warm transfer call call base info')
export class RCI5427 extends Step {
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
      expectCallNameSubSession: 'origin call',
      expectCallNameActiveSession: 'warm transfer call',
      expectPhoneNumberInActiveSession: formatTransferNumber,
    },
    {
      mockContactMatch: undefined,
      expectCallNameSubSession: mockOriginCallPhoneNumber,
      expectCallNameActiveSession: mockWarmTransferCallPhoneNumber,
      expectPhoneNumberInActiveSession: formatTransferNumber,
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
          desc="init a warm transfer call"
          action={
            <InitAWarmTransferCall
              phoneNumber={mockWarmTransferCallPhoneNumber}
            />
          }
        />

        <Then
          desc="check call base Sub info"
          action={({ expectCallNameSubSession }: any) => (
            <CheckLogBaseInfoSub
              name={expectCallNameSubSession}
              hasCallStatusIcon
              hasDuration
            />
          )}
        />

        <Then
          desc="check  call base info Active call"
          action={({
            expectCallNameActiveSession,
            expectPhoneNumberInActiveSession,
          }: any) => (
            <CheckLogBaseInfoActive
              name={expectCallNameActiveSession}
              phoneNumber={expectPhoneNumberInActiveSession}
            />
          )}
        />
      </Scenario>
    );
  }
}
