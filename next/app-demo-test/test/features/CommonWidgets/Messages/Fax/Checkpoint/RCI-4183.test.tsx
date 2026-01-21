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
  autorun,
  common,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckNoMessagesDisplay } from '../../../../../steps/Messages';
import {
  CreateMock,
  MockMessageList,
  MockMessageSync,
} from '../../../../../steps/Mock';
import { NavigateToFax } from '../../../../../steps/Navigate';

@autorun(test)
@common
@it
@p2
@title('No Messages should show when there is no fax record')
export class NoMessagesForFax extends Step {
  useRcMock?: boolean = true;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;

  run() {
    return (
      <Scenario desc="No Messages should show when there is no fax record">
        <When
          desc="> Login withUserA
										> Navigate to the Messages tab
										> Go to Fax tab"
          action={() => [
            this.CreateMock,
            this.useRcMock && <MockMessageList repeat={0} />,
            this.useRcMock && <MockMessageSync repeat={3} />,
            this.Login,
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
