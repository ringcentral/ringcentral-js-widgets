/**
 * RCI-585: Search on the Messages list
 * https://test_id_domain/test-cases/RCI-585
 */
import { Login as CommonLogin } from '../../../../../steps/Login';
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
  StepFunction,
} from '../../../../../lib/step';
import {
  CreateMock as CommonCreateMock,
  MockMessageList,
  MockMessageSync,
} from '../../../../../steps/Mock';
import {
  NavigateToMessagesTab,
  NavigateToTypeTabUnderMessage,
} from '../../../../../steps/Navigate';
import {
  generateMessageRecords,
  mockMessageListData,
} from '../../../../../__mock__';
import {
  CheckActionsAfterSearch,
  TypingWordingInSearch,
} from '../../../../../steps/Messages';

@autorun(test.skip)
@p2
@title('Search phone number on the Messages list')
export class SearchMessagesListNumber extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | tabType | searchText     | isMatched | type  | matched                                          |
    | 'Fax'   | '866'          | true      | 'Fax' | ['+18662105111', '+18662105112', '+18662105113'] |
    | 'All'   | 'test00000000' | false     | 'Fax' | []                                               |
  `)
  run() {
    const { type, searchText, isMatched, tabType, matched } =
      this.context.example;

    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;

    const messageList = generateMessageRecords({
      direction: 'Inbound',
      type,
      readStatus: 'Unread',
      phoneNumberList: [
        '+18662105111',
        '+18662105112',
        '+18662105113',
        '18762105114',
      ],
    });
    return (
      <Scenario
        desc="Search phone number on the Messages list"
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
              handler={() => mockMessageListData(messageList)}
            />,
          ]}
        />
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <When desc="User go to Message tab" action={NavigateToMessagesTab} />
        <When
          desc="User go to ${type} tab"
          action={<NavigateToTypeTabUnderMessage type={tabType} />}
        />
        <And
          desc="User input ${searchText}"
          action={
            <TypingWordingInSearch
              chars={searchText}
              dataSign="conversationSearch"
            />
          }
        />
        <Then
          desc="User should to be that search matched results"
          action={
            <CheckActionsAfterSearch
              searchText={searchText}
              isMatched={isMatched}
              matched={matched}
            />
          }
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@p2
@title('Search name on the Messages list')
export class SearchMessagesListName extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | tabType | searchText | isMatched | type        | matched                   |
    | 'Voice' | 'cer'      | true      | 'VoiceMail' | ['cerrie1','Test cerrie'] |
  `)
  run() {
    const { type, searchText, isMatched, tabType, matched } =
      this.context.example;

    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;

    const messageList = generateMessageRecords({
      direction: 'Inbound',
      type,
      readStatus: 'Unread',
      phoneNumberList: ['+18662105111', '+18662105112', '+18662105113'],
    });

    return (
      <Scenario
        desc="Search name on the Messages list"
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
              handler={() => mockMessageListData(messageList)}
            />,
          ]}
        />
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <When desc="User go to Message tab" action={NavigateToMessagesTab} />
        <When
          desc="User go to ${type} tab"
          action={<NavigateToTypeTabUnderMessage type={tabType} />}
        />
        <And
          desc="User input 'ce' in search"
          action={
            <TypingWordingInSearch chars="ce" dataSign="conversationSearch" />
          }
        />
        <Then
          desc="User should to be see that not start searching"
          action={
            <CheckActionsAfterSearch
              searchText="ce"
              isMatched={isMatched}
              matched={['cerrie1', 'Test cerrie', 'Hello']}
            />
          }
        />
        <And
          desc="User input ${searchText}"
          action={
            <TypingWordingInSearch
              chars={searchText}
              dataSign="conversationSearch"
            />
          }
        />
        <Then
          desc="User should to be that search matched results"
          action={
            <CheckActionsAfterSearch
              searchText={searchText}
              isMatched={isMatched}
              matched={matched}
            />
          }
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@p2
@title('Search content on the Messages list')
export class SearchMessagesListContent extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | tabType | searchText | isMatched | type   | matched                                         |
    | 'Text'  | 'test'     | true      | 'Text' | ["+18662105111","+18662105112", "+18662105113"] |
  `)
  run() {
    const { type, searchText, isMatched, tabType, matched } =
      this.context.example;

    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;

    return (
      <Scenario
        desc="Search content on the Messages list"
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
              handler={() =>
                mockMessageListData([
                  {
                    direction: 'Inbound',
                    type,
                    fromNumber: '+18662105111',
                    subject: 'Test',
                  },
                  {
                    direction: 'Inbound',
                    type,
                    fromNumber: '+18662105112',
                    subject: 'Test123',
                  },
                  {
                    direction: 'Inbound',
                    type,
                    fromNumber: '+18662105113',
                    subject: 'Hello Test',
                  },
                  {
                    direction: 'Inbound',
                    type,
                    fromNumber: '+18662105114',
                    subject: 'hello',
                  },
                ])
              }
            />,
          ]}
        />
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <When desc="User go to Message tab" action={NavigateToMessagesTab} />
        <When
          desc="User go to ${type} tab"
          action={<NavigateToTypeTabUnderMessage type={tabType} />}
        />
        <And
          desc="User input ${searchText}"
          action={
            <TypingWordingInSearch
              chars={searchText}
              dataSign="conversationSearch"
            />
          }
        />
        <Then
          desc="User should to be that search matched results"
          action={
            <CheckActionsAfterSearch
              searchText={searchText}
              isMatched={isMatched}
              matched={matched}
            />
          }
        />
      </Scenario>
    );
  }
}
