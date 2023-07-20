/**
 * RCI-986: Messages List
 * https://test_it_domain/test-cases/RCI-986
 * Preconditions:
 *
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
} from '@ringcentral-integration/test-utils';
import { CheckMessageItemHighlight } from '../../../../../steps/Messages/checks/CheckMessageItemHighlight';
import { CheckTab } from '../../../../../steps/Messages/checks/CheckTab';
import { CheckUnreadCounts } from '../../../../../steps/Messages/checks/CheckUnreadCounts';
import { CreateMock } from '../../../../../steps/Mock/CreateMock';
import { MockMessageSync } from '../../../../../steps/Mock/MockMessage/MockMessageSync';
import { NavigateToMessagesTab } from '../../../../../steps/Navigate/actions/NavigateToMessages';
import {
  generateMessageRecords,
  generatePhoneNumberList,
  mockMessageListData,
} from '../../../../../__mock__/mockMessageListData';

@autorun(test.skip)
@it
@p2
@title('Messages List')
export class CheckMessageList extends Step {
  CustomLogin?: StepFunction<any, any>;
  CreateCustomMock?: StepFunction<any, any>;
  Entry?: StepFunction<any, any>;

  @examples(`
    | messageUnreadCount | messageUnreadNotice |
    | 2                  | "2"                 |
    | 100                | "99+"               |
  `)
  run() {
    const messageList = generateMessageRecords({
      direction: 'Inbound',
      type: 'Text',
      readStatus: 'Unread',
      phoneNumberList: generatePhoneNumberList({
        count: this.context.example.messageUnreadCount,
      }),
    });
    const mockMsgData = mockMessageListData(messageList);
    return (
      <Scenario desc="Check message list...">
        <When
          desc="Mouse hover Messages icon"
          action={[
            CreateMock,
            this.CreateCustomMock,
            <MockMessageSync
              isDefaultInit
              repeat={1}
              handler={() => mockMsgData}
            />,
            this.Entry,
            this.CustomLogin,
          ]}
        />
        <Then desc="Tooltips 'Messages' should be displayed[L10N]" />
        <When desc="Click Messages icon" action={[NavigateToMessagesTab]} />
        <Then
          desc="User should be navigated to Messages page
										There are sub-tabs as below:
										All
										Voice
										Fax
										Text
										The unread message items should be highlighted"
          action={[
            <CheckTab tabName="All" />,
            <CheckTab tabName="Voice" />,
            <CheckTab tabName="Fax" />,
            <CheckTab tabName="Text" />,
            <CheckMessageItemHighlight isHighlight messageType="Text" />,
          ]}
        />
        <When desc="Check the Messages icon" />
        <Then
          desc="There is an unread count icon displays
										The unread number should be sum of all unread messages
										Unread number displays '99+' whenunread number greater than 99"
          action={[
            <CheckUnreadCounts
              countAfterAction={this.context.example.messageUnreadNotice}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
