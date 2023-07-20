import type { StepFunction } from '../../../../../lib/step';
import {
  p2,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
} from '../../../../../lib/step';
import {
  CheckMessageItemHighlight,
  CheckNavUnreadCount,
  CheckSearchInputDisplay,
  CheckMessageListDisplayInTimeOrder,
  CheckSMSMessageItemDisplay,
  CheckMessageCreateTimeDisplay,
} from '../../../../../steps/Messages';
import { MockMessageList, MockMessageSync } from '../../../../../steps/Mock';
import { NavigateToMessagesTab } from '../../../../../steps/Navigate';
import { mockMessageListData } from '../../../../../__mock__';

@autorun(test.skip)
@p2
@title('To Verify the layout of Messages')
export class MessageLayout extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  run() {
    return (
      <Scenario
        desc="To Verify the layout of Messages"
        action={this.CustomCreateMock}
      >
        <Given
          desc="init message mock"
          action={() => [
            <MockMessageList
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData(null),
              })}
            />,
            <MockMessageSync
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData([
                  {
                    type: 'VoiceMail',
                    creationTime: new Date(
                      'July 22, 2021 17:03:00',
                    ).toISOString(),
                  },
                  {
                    type: 'Fax',
                    creationTime: new Date(
                      'July 22, 2021 17:59:00',
                    ).toISOString(),
                  },
                  {
                    type: 'SMS',
                    creationTime: new Date(
                      `${new Date().toLocaleDateString()} 08:00`,
                    ).toISOString(),
                    subject: 'a test message',
                    readStatus: 'Read',
                    fromNumber: '+18882556247',
                  },
                ]),
              })}
            />,
          ]}
        />
        <Given
          desc="Logged in Third-part APP and CTI"
          action={this.CustomLogin}
        />
        <When
          desc="Go to messages page and check the layout display"
          action={NavigateToMessagesTab}
        />
        <Then
          desc="1. The messages icon gets highlighted
                2. The Layout is as below
                Search textbox with magnifier icon and ghost text 'Search...'
                Text record list for last one week
                3.The record is highlighted if it is unread.
                4.These records should be kept in chronological order, the latest message displays on the top
                5.The Messages title should show the unread number of messages"
          action={[
            CheckSearchInputDisplay,
            <CheckMessageListDisplayInTimeOrder
              expectList={[
                'SMSMessageItem',
                'FaxMessageItem',
                'VoiceMailMessageItem',
              ]}
            />,
            <CheckMessageItemHighlight isHighlight messageType="VoiceMail" />,
            <CheckMessageItemHighlight isHighlight messageType="Fax" />,
            <CheckMessageItemHighlight isHighlight={false} messageType="SMS" />,
            <CheckNavUnreadCount count="2" />,
          ]}
        />
        <And
          desc="1.The every single text record should display as below:
                  Dialog icon
                  Number or name
                  The newest text (first 20 characters)
                  Date or time
                  'Log' icon
                  Call back icon(expanded)
                  Add contact icon/view details icon"
          action={
            <CheckSMSMessageItemDisplay
              contactName="+18882556247"
              messageDetail="a test message"
            />
          }
        />
        <And
          desc="3.The date or time should be shows as below:
                  Time : if created within today
                  Date : if created over 1 day."
          action={
            <CheckMessageCreateTimeDisplay
              expectResult={[
                {
                  testId: 'SMSMessageItem',
                  createTime: '08:00',
                },
                {
                  testId: 'VoiceMailMessageItem',
                  createTime: '7/22/2021',
                },
              ]}
            />
          }
        />
      </Scenario>
    );
  }
}
