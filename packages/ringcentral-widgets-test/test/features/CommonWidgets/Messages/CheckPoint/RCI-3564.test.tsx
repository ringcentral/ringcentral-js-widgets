/**
 * RCI-3564: Message unread count
 * https://test_it_domain/test-cases/RCI-3564
 */
import { fireEvent, screen } from '@testing-library/react';
import { Login as CommonLogin } from '../../../../steps/Login';
import type { StepFunction } from '../../../../lib/step';
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
  And,
} from '../../../../lib/step';
import {
  CreateMock as CommonCreateMock,
  generateMessage,
  MockMessageList,
  MockMessagePut,
  MockMessageSync,
} from '../../../../steps/Mock';
import {
  NavigateToMessagesTab,
  NavigateToTypeTabUnderMessage,
} from '../../../../steps/Navigate';
import { mockMessageListData } from '../../../../__mock__';
import {
  CheckUnreadCounts,
  ClickMessageItemAndBack,
  ExpandTheActionMenu,
} from '../../../../steps/Messages';
import type { Context } from '../../../../interfaces';

@autorun(test.skip)
@p2
@title('SMS unread count ${countAfterAction}')
export class SMSUnreadCount extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | unreadCount | countAfterAction |
    | '101'       | '99+'            |
    | '99'        | '98'             |
  `)
  run() {
    const { unreadCount, countAfterAction } = this.context.example;

    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;

    const mockMsgData = mockMessageListData([
      {
        direction: 'Inbound',
        type: 'SMS',
      },
      ...generateMessage({
        length: unreadCount - 1,
        unreadCount: unreadCount - 1,
      }),
    ]);
    return (
      <Scenario
        desc="SMS unread count ${countAfterAction}"
        action={CustomCreateMock}
      >
        <Given
          desc="init mock"
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
                ...mockMsgData,
              })}
            />,
          ]}
        />
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <When desc="User go to Message tab" action={NavigateToMessagesTab} />
        <And
          desc="User go to SMS tab"
          action={<NavigateToTypeTabUnderMessage type="Text" />}
        />
        <And
          desc="User after reading the message and click Back button"
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

@autorun(test.skip)
@p2
@title('${type} unread count ${countAfterAction}')
export class VoicemailOrFaxUnreadCount extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | type        | unreadCount | action | countAfterAction | messageTypeTabDataSign | mockReadStatus | updateReadStatus |
    | 'VoiceMail' | '3'         | 'play' | '2'              | 'Voice'                | 'Unread'       | 'Read'           |
    | 'VoiceMail' | '100'       | 'mark' | '99'             | 'Voice'                | 'Unread'       | 'Read'           |
    | 'Fax'       | '10'        | 'mark' | '9'              | 'Fax'                  | 'Unread'       | 'Read'           |
    | 'Fax'       | '1'         | 'View' | '0'              | 'Fax'                  | 'Unread'       | 'Read'           |
    | 'VoiceMail' | '99'        | 'mark' | '99+'            | 'Voice'                | 'Read'         | 'Unread'         |
    | 'Fax'       | '99'        | 'mark' | '99+'            | 'Fax'                  | 'Read'         | 'Unread'         |
  `)
  run() {
    const {
      type,
      unreadCount,
      countAfterAction,
      messageTypeTabDataSign,
      action,
      mockReadStatus,
      updateReadStatus,
    } = this.context.example;

    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;

    const mockMsgData = mockMessageListData([
      {
        direction: 'Inbound',
        type,
        readStatus: mockReadStatus,
      },
      ...generateMessage({
        length: mockReadStatus === 'Read' ? unreadCount : unreadCount - 1,
        unreadCount: mockReadStatus === 'Read' ? unreadCount : unreadCount - 1,
        type,
      }),
    ]);
    return (
      <Scenario
        desc="${type} unread count ${countAfterAction} after ${action}"
        action={CustomCreateMock}
      >
        <Given
          desc="init mock"
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
                ...mockMsgData,
              })}
            />,
          ]}
        />
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <When desc="User go to Message tab" action={NavigateToMessagesTab} />
        <And
          desc="User go to ${type} tab"
          action={[
            <NavigateToTypeTabUnderMessage type={messageTypeTabDataSign} />,
            ExpandTheActionMenu,
          ]}
        />
        <When
          desc="User operate ${action}"
          action={[
            <MockMessagePut
              useFaker
              handler={() => ({
                ...mockMsgData.records[0],
                readStatus: updateReadStatus,
                lastModifiedTime: Date.now(),
              })}
            />,
            () => {
              fireEvent.click(screen.getAllByTestId(action)[0]);
            },
          ]}
        />
        <Then
          desc="The total unread count should be ${unreadCount}"
          action={<CheckUnreadCounts countAfterAction={countAfterAction} />}
        />
      </Scenario>
    );
  }
}
@autorun(test.skip)
@p2
@title('{type} unread count after delete')
export class deleteVoicemailOrFaxAfterUnreadCount extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | type        | unreadCount | action   | countAfterAction | messageTypeTabDataSign |
    | 'VoiceMail' | '1'         | 'Delete' | '0'              | 'Voice'                |
    | 'Fax'       | '2'         | 'Delete' | '1'              | 'Fax'                  |
  `)
  run() {
    const {
      type,
      unreadCount,
      countAfterAction,
      messageTypeTabDataSign,
      action,
    } = this.context.example;

    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;

    const mockMsgData = mockMessageListData([
      {
        direction: 'Inbound',
        type,
      },
      ...generateMessage({
        length: unreadCount - 1,
        unreadCount: unreadCount - 1,
        type: 'VoiceMail',
      }),
    ]);
    return (
      <Scenario
        desc="{type} unread count after delete"
        action={CustomCreateMock}
      >
        <Given
          desc="init mock"
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
                ...mockMsgData,
              })}
            />,
          ]}
        />
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <When desc="User go to Message tab" action={NavigateToMessagesTab} />
        <When
          desc="User go to Message tab"
          action={[
            <NavigateToTypeTabUnderMessage type={messageTypeTabDataSign} />,
            ExpandTheActionMenu,
          ]}
        />
        <When
          desc="Mock delete api"
          action={(_: any, { rcMock }: Context) => {
            rcMock.deleteMessage();
          }}
        />
        <When
          desc="User delete a {type} message "
          action={() => {
            fireEvent.click(screen.getAllByTestId(action)[0]);
            fireEvent.click(screen.getAllByTestId('confirm')[1]);
          }}
        />
        <Then
          desc="The total unread count should be ${unreadCount}"
          action={<CheckUnreadCounts countAfterAction={countAfterAction} />}
        />
      </Scenario>
    );
  }
}
