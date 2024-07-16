/**
 * RCI-3572: Conversation unread count
 * https://test_it_domain/test-cases/RCI-3572
 * Preconditions:
 * The user has logged into the CTI app
 * The user has SMS permission
 * The user has authorized RingCentral for Google
 * Entry point(/s):
 * The user has {Message type} with {Unread conversation count} and {Unread text message count}
 *
  | Message type |Unread conversation count |Unread text message count |Action |Count after action |
  | Text |1 |5 |Read |0 |

 */
// import type { StepFunction } from '../../../../lib/step';
import {
  p2,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepProp,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../__mock__';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CheckUnreadCounts,
  ClickMessageItemAndBack,
} from '../../../../steps/Messages';
import {
  generateMessage,
  MockMessageList,
  MockMessageSync,
  MockMessagePut,
  CreateMock,
} from '../../../../steps/Mock';
import {
  NavigateToMessagesTab,
  NavigateToTypeTabUnderMessage,
} from '../../../../steps/Navigate';

@autorun(test)
@p2
@title('Conversation unread count')
export class ConversationUnread extends Step {
  CustomLogin: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CustomCreateMock: StepProp = CreateMock;

  @examples(`
    | unreadConversationCount | unreadTextMessageCount | countAfterAction |
    | 1                       | 5                      | 0                |
  `)
  run() {
    const { unreadTextMessageCount, countAfterAction } = this.context.example;

    const mockMsgData = mockMessageListData([
      ...generateMessage({
        length: unreadTextMessageCount,
        unreadCount: unreadTextMessageCount,
        id: 1381164004,
      }),
    ]);
    return (
      <Scenario
        desc="Verify make call and send SMS from voicemail action button"
        action={this.CustomCreateMock}
      >
        <Given
          desc="init message mock"
          action={[
            <MockMessageList
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData(null),
              })}
            />,
            <MockMessageSync
              handler={(mockData) => ({
                ...mockData,
                ...mockMsgData,
              })}
            />,
          ]}
        />
        <Given
          desc="Logged in Third-part APP and CTI"
          action={this.CustomLogin}
        />
        <When desc="User go to Message tab" action={NavigateToMessagesTab} />
        <When
          desc="User go to SMS tab"
          action={<NavigateToTypeTabUnderMessage type="Text" />}
        />
        <Given
          desc="Read on one of the unread message"
          action={[
            <MockMessagePut
              useFaker
              handler={() => ({
                ...mockMsgData.records[0],
                readStatus: 'Read',
                lastModifiedTime: Date.now(),
              })}
            />,
            ClickMessageItemAndBack,
          ]}
        />
        <Then
          desc="The total unread count should be ${countAfterAction}"
          action={<CheckUnreadCounts countAfterAction={countAfterAction} />}
        />
      </Scenario>
    );
  }
}
