/**
 * RCI-4519: Check faxes list in 90 days for Google/0365
 * https://test_it_domain/test-cases/RCI-4519
 * Preconditions:
 * Account_A has 2 faxes(Today is 2022/6/20, last 90 days is 2022/3/20 ):
	fax1 is before 2022/3/20
 * fax2 is after 2022/3/20
 * Account_B has 402 faxes(Today is 2022/6/20, last 90 days is 2022/3/20 ):
	fax1-fax401 is before 2022/3/20
 * fax402 is after 2022/3/20
 * fax1 is before 2022/3/20
 * fax2 is after 2022/3/20
 * fax1-fax401 is before 2022/3/20
 * fax402 is after 2022/3/20
 * Entry point(/s):
 *
 */
import type { StepProp } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckGetMessageSyncParams } from '../../../../../steps/Messages';
import { CreateMock } from '../../../../../steps/Mock';
import { NavigateToFax } from '../../../../../steps/Navigate/actions/NavigateToFax';

const google_message_day_span = 90;
const google_message_record_count = 400;
@autorun(test.skip)
@common
@it
@p2
@title('Check faxes list in 90 days for Google/0365')
export class RCI4519 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  run() {
    return (
      <Scenario desc="Check faxes list in 90 days for Google/0365">
        <When
          desc="Login with Account_A, navigate to Messages tab, then goes to All/fax tab"
          action={[this.CreateMock, this.Login, NavigateToFax]}
        />
        {/* will check get message list api params(recordCount dateFrom) to check follow steps */}
        <Then desc="Show fax1" />
        <When desc="Login with Account_B, navigate to Messages tab, then goes to All/fax tab" />
        <Then
          desc="Show fax1 -- fax400
                Doesn't show fax401 and fax402"
          action={
            <CheckGetMessageSyncParams
              query={`recordCount=${google_message_record_count}&dateFrom=${
                new Date(
                  new Date(
                    Date.now() - google_message_day_span * 24 * 3600 * 1000,
                  ),
                )
                  .toISOString()
                  .split('T')[0]
              }`}
            />
          }
        />
      </Scenario>
    );
  }
}
