/**
 * RCI-4507: Check faxes list in 7 days
 * https://test_it_domain/test-cases/RCI-4507
 * Preconditions:
 * Account_A has 2 faxes(Today is 2022/6/20, last 7 days is 2022/6/13):
	fax1 is before 2022/6/13
 * fax2 is after 2022/6/13
 * Account_B has 102 faxes(Today is 2022/6/20, last 7 days is 2022/6/13):
	fax1--fax101 is before 2022/6/13
 * fax102 is after 2022/6/13
 * fax1 is before 2022/6/13
 * fax2 is after 2022/6/13
 * fax1--fax101 is before 2022/6/13
 * fax102 is after 2022/6/13
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
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckGetMessageSyncParams } from '../../../../../steps/Messages';
import { CreateMock } from '../../../../../steps/Mock';
import { NavigateToMessagesTab } from '../../../../../steps/Navigate';

dayjs.extend(utc);

@autorun(test)
@common
@it
@p2
@title('Check faxes list in 7 days')
export class RCI4507 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  run() {
    return (
      <Scenario desc="Check faxes list in 7 days">
        <When
          desc="Login with Account_A, navigate to Messages tab, then goes to All/fax tab"
          action={[this.CreateMock, this.Login, NavigateToMessagesTab]}
        />
        <Then
          desc="Show fax2"
          action={
            // fetch date should from 7days ago
            <CheckGetMessageSyncParams
              query={`dateFrom=${dayjs()
                .utc()
                .subtract(7, 'd')
                .format('YYYY-MM-DD')}`}
            />
          }
        />
      </Scenario>
    );
  }
}
