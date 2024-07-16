/**
 * RCI-4183: No Messages should show when there is no fax record
 * https://test_it_domain/test-cases/RCI-4183
 * Preconditions:
 * UserAhas logged into the 3rd party
 * CTI app is installed
 * UserAhas no fax record
 * Entry point(/s):
 *
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { Login } from '../../../../../steps/Login';
import { CheckNoMessagesDisplay } from '../../../../../steps/Messages';
import { MockMessageSync, MockMessageList } from '../../../../../steps/Mock';
import { NavigateToFax } from '../../../../../steps/Navigate';

@autorun(test)
@common
@it
@p2
@title('No Messages should show when there is no fax record')
export class NoMessagesForFax extends Step {
  Login?: StepFunction<any, any>;
  useRcMock?: boolean = true;

  run() {
    return (
      <Scenario desc="No Messages should show when there is no fax record">
        <When
          desc="> Login withUserA
										> Navigate to the Messages tab
										> Go to Fax tab"
          action={() => [
            this.Login ?? Login,
            this.useRcMock && <MockMessageList repeat={0} />,
            this.useRcMock && <MockMessageSync repeat={3} />,
            NavigateToFax,
          ]}
        />
        <Then
          desc="'No Messages' should be shown
										[L10N]"
          action={CheckNoMessagesDisplay}
        />
      </Scenario>
    );
  }
}
