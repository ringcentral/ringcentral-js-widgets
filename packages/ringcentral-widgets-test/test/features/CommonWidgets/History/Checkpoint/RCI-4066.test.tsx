/**
 * RCI-4066: Action icons of anonymous call in History should be disabled
 * https://test_it_domain/test-cases/RCI-4066
 * Preconditions:
 * RC CTI app was installed and enabled
 * The user has logged in to 3rd party
 * The user has logged in to RC CTI
 * Entry point(/s):
 *
 */
import type { StepFunction } from '../../../../lib/step';
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '../../../../lib/step';
import {
  AnswerCall,
  HangupCall,
  MakeInboundCall,
} from '../../../../steps/Call';
import {
  CheckCallIcon,
  CheckTextIcon,
  ExpandTheActionMenu,
} from '../../../../steps/CallHistory';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { MockCallPresence } from '../../../../steps/Mock';
import { NavigateToHistory } from '../../../../steps/Navigate';

@autorun(test.skip)
@it
@p2
@title('Action icons of anonymous call in History should be disabled')
export class ActionIconsOfAnonymousCallInHistoryShouldBeDisabled extends Step {
  Login: StepFunction<any> = CommonLogin;
  checkCallIcon = false;
  checkTextIcon = false;
  run() {
    return (
      <Scenario desc="Action icons of anonymous call in History should be disabled">
        <When
          desc="> Make an inbound call from an anonymous number
										> End the call
										>Go to History tab
										> Expand the call"
          action={[
            this.Login,
            <MakeInboundCall phoneNumber="" />,
            MockCallPresence,
            AnswerCall,
            HangupCall,
            NavigateToHistory,
            ExpandTheActionMenu,
          ]}
        />
        <Then
          desc="The following icons should display and disable:
										Call
										Text"
          action={() => {
            const checkers = [];
            if (this.checkCallIcon) checkers.push(<CheckCallIcon disabled />);
            if (this.checkTextIcon) checkers.push(<CheckTextIcon disabled />);
            return checkers;
          }}
        />
      </Scenario>
    );
  }
}
