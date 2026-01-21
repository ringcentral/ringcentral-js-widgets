/* Check control buttons UI on warm transfer
https://test_it_domain/test-cases/RCI-4298
*/
import { StepFunction } from '@ringcentral-integration/crius';
import {
  And,
  autorun,
  common,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { MakeCall } from '../../../../steps/Call';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { Entry } from '../../../../steps/Entry';
import {
  CheckControlButtonOnWarmTransfer,
  CheckMoreButtons,
  ClickMoreButton,
  InitAWarmTransferCall,
} from '../../../../steps/Transfer';

@autorun(test.skip)
@it
@p2
@common
@title('Check control buttons UI on warm transfer')
export class RCI5422 extends Step {
  EntryWithLoggedIn: StepFunction<any, any>[] | StepFunction<any, any> = [
    Entry,
    CommonLogin,
  ];
  run() {
    const { EntryWithLoggedIn } = this;
    return (
      <Scenario desc="Check control buttons UI on warm transfer">
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
          desc="User should be see that have (Complete transfer button| More button) in the control button panel"
          action={CheckControlButtonOnWarmTransfer}
        />
        <And desc="User click more button" action={ClickMoreButton} />
        <Then
          desc="User should be see that have (Mute button | Keypad button | Hold button | Record button | Hang up button) in more button panel"
          action={() => (
            <CheckMoreButtons
              MoreButtons={['Mute', 'Keypad', 'Hold', 'Record', 'Hang up']}
            />
          )}
        />
      </Scenario>
    );
  }
}
