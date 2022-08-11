/**
 * RCI-3751: Check Fax page number
 * https://test_id_domain/test-cases/RCI-3751
 * Preconditions:
 * User must be logged into 3rd party
 * User has logged intoRC CTI App
 * There are the following fax records on the 'Fax' page list
	Fax1: received fax with empty content (1 page)
 * Fax2: sent fax with one attachment (2 pages)
 * Fax1: received fax with empty content (1 page)
 * Fax2: sent fax with one attachment (2 pages)
 * Entry point(/s):
 * Message->All/Fax
 */

import {
  p3,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  Given,
} from '@ringcentral-integration/test-utils';
import { StepFunction } from '../../../../../lib/step';
import { MockMessageList, MockMessageSync } from '../../../../../steps/Mock';
import { CheckFaxPageCount } from '../../../../../steps/Conversation/CheckConversations';
import { NavigateToMessageHistory } from '../../../../../steps/Navigate/actions/NavigateToMessageHistory';
import { NavigateToMessagesTab } from '../../../../../steps/Navigate/actions/NavigateToMessages';
import { mockMessageListData } from '../../../../../__mock__';

interface CheckFaxPageNumberProps {
  Login: StepFunction<any, any>;
  CreateMock: StepFunction<any, any>;
}

@autorun(test.skip)
@it
@p3
@title('Check Fax page number')
export class CheckFaxPageNumber extends Step<CheckFaxPageNumberProps> {
  Login = null;
  CreateMock = null;

  @examples(`
    | name    | number        | faxPageCount |
    | 'UserA' | '18662105111' | 1            |
    | 'UserA' | '18662105111' | 2            |
  `)
  run() {
    return (
      <Scenario
        desc="Check Fax page number"
        action={({ name, number, faxPageCount }: any) => [
          this.CreateMock,
          <MockMessageList
            isDefaultInit
            repeat={2}
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData({
                direction: 'Outbound',
                type: 'Fax',
                toName: name,
                toNumber: number,
                faxPageCount,
              }),
            })}
          />,
          <MockMessageSync
            isDefaultInit
            repeat={2}
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData({
                direction: 'Outbound',
                type: 'Fax',
                toName: name,
                toNumber: number,
                faxPageCount,
              }),
            })}
          />,
        ]}
      >
        <Given
          desc="UserA has contact 'Test contact', mock his extension info"
          action={this.Login}
        />
        <When desc="navigate to message tabs" action={NavigateToMessagesTab} />
        <Then desc="check the fax page number" action={CheckFaxPageCount} />
        <When
          desc="go to fax page"
          action={<NavigateToMessageHistory tabName="Fax" />}
        />
        <Then desc="check the fax page number" action={CheckFaxPageCount} />
      </Scenario>
    );
  }
}
