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
  StepFunction,
  And,
} from '../../../../lib/step';
import {
  MockMessageList,
  MockMessageSync,
  MockMessagePut,
} from '../../../../steps/Mock';
import { NavigateToMessagesTab } from '../../../../steps/Navigate';
import {
  ExpandTheActionMenu,
  ClickActionButton,
  CheckMessageItemHighlight,
  CheckTabUnreadCount,
  CheckNavUnreadCount,
  CheckFlagButtonTitle,
} from '../../../../steps/Messages';
import { mockMessageListData } from '../../../../__mock__';

@autorun(test.skip)
@p2
@title('Verified the status of the record data after clicking the flag icon')
export class VerifiedRecordDataStatus extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | Tab     | Type        |
    | 'Fax'   | 'Fax'       |
    | 'Voice' | 'VoiceMail' |
  `)
  run() {
    const mockRecordData = mockMessageListData({
      direction: 'Inbound',
      type: this.context.example.Type,
    });
    return (
      <Scenario
        desc="Verified the status of the record data after clicking the flag icon"
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
                ...mockRecordData,
              })}
            />,
          ]}
        />
        <Given
          desc="Logged in Third-part APP and CTI"
          action={this.CustomLogin}
        />
        <When
          desc="Go to Message tab and expand record's action menu"
          action={[NavigateToMessagesTab, ExpandTheActionMenu]}
        />
        <And
          desc="Click the flag icon"
          action={() => [
            <MockMessagePut
              useFaker
              handler={() => ({
                ...mockRecordData.records[0],
                readStatus: 'Read',
                lastModifiedTime: Date.now(),
              })}
            />,
            <ClickActionButton testId="mark" />,
          ]}
        />
        <Then
          desc="1.The record will be no longer highlighted
                2.There is no unread number on the ${Tab} and Message title
                3.The flag icon title should be 'Mark as Unread'"
          action={[
            <CheckMessageItemHighlight
              isHighlight={false}
              messageType={this.context.example.Type}
            />,
            <CheckTabUnreadCount count="0" tab={this.context.example.Tab} />,
            <CheckNavUnreadCount count="0" />,
            <CheckFlagButtonTitle isRead />,
          ]}
        />
        <When
          desc="Click the flag icon again"
          action={() => [
            <MockMessagePut
              useFaker
              handler={() => ({
                ...mockRecordData.records[0],
                readStatus: 'Unread',
                lastModifiedTime: Date.now(),
              })}
            />,
            <ClickActionButton testId="mark" />,
          ]}
        />
        <Then
          desc="1.The record will be highlighted
                2.The unread number on the ${Tab} and Message title will become 1
                3.The flag icon title should be 'Mark as Read'"
          action={[
            <CheckMessageItemHighlight
              isHighlight
              messageType={this.context.example.Type}
            />,
            <CheckTabUnreadCount count="1" tab={this.context.example.Tab} />,
            <CheckNavUnreadCount count="1" />,
            <CheckFlagButtonTitle isRead={false} />,
          ]}
        />
      </Scenario>
    );
  }
}
