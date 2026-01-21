import {
  autorun,
  examples,
  Given,
  it,
  p3,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../__mock__';
import { CheckFaxPageCount } from '../../../../../steps/Conversation/CheckConversations';
import { MockMessageList, MockMessageSync } from '../../../../../steps/Mock';
import { NavigateToMessageHistory } from '../../../../../steps/Navigate/actions/NavigateToMessageHistory';
import { NavigateToMessagesTab } from '../../../../../steps/Navigate/actions/NavigateToMessages';

import { CheckFaxPageNumberProps } from './RCI-3751.test';

@autorun(test.skip)
@it
@p3
@common
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
