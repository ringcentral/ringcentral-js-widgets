/**
 * RCI-585: Search on the Messages list
 * https://test_it_domain/test-cases/RCI-585
 */
import {
  generateMessageRecords,
  mockMessageListData,
} from '../../../../../__mock__';
import type { StepFunction } from '../../../../../lib/step';
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
  common,
} from '../../../../../lib/step';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CheckActionsAfterSearch,
  TypingWordingInSearch,
} from '../../../../../steps/Messages';
import {
  CreateMock as CommonCreateMock,
  MockExtensionsList,
  MockMessageList,
  MockMessageSync,
  mockExtensionsListData,
} from '../../../../../steps/Mock';
import {
  NavigateToMessagesTab,
  NavigateToTypeTabUnderMessage,
} from '../../../../../steps/Navigate';

@autorun(test)
@common
@p2
@title('Search phone number on the Messages list')
export class SearchMessagesListNumber extends Step {
  CustomLogin?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CustomCreateMock?: StepFunction<any, any> = CommonCreateMock;

  @examples(`
    | tabType | searchText     | isMatched | type  | matched                                          |
    | 'Fax'   | '866'          | true      | 'Fax' | ['(866) 210-5111', '(866) 210-5112', '(866) 210-5113'] |
    | 'All'   | 'test00000000' | false     | 'Fax' | []                                               |
  `)
  run() {
    const { type, searchText, isMatched, tabType, matched } =
      this.context.example;

    const { CustomLogin, CustomCreateMock } = this;

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

@autorun(test)
@common
@p2
@title('Search name on the Messages list')
export class SearchMessagesListName extends Step {
  CustomLogin?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CustomCreateMock?: StepFunction<any, any> = CommonCreateMock;
  @examples(`
    | tabType | searchText | isMatched | type        | matched                   |
    | 'Voice' | 'cer'      | true      | 'VoiceMail' | ['cerrie1','Test cerrie'] |
  `)
  run() {
    const { type, searchText, isMatched, tabType, matched } =
      this.context.example;

    const { CustomLogin, CustomCreateMock } = this;

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
            <MockExtensionsList
              handler={(mockData) => ({
                ...mockData,
                ...mockExtensionsListData([
                  {
                    phoneNumber: '+18662105111',
                    phoneNumberUsageType: 'ContactNumber',
                    firstName: 'cerrie1',
                    lastName: '',
                  },
                  {
                    phoneNumber: '+18662105112',
                    phoneNumberUsageType: 'ContactNumber',
                    firstName: 'Test',
                    lastName: 'cerrie',
                  },
                  {
                    phoneNumber: '+18662105113',
                    phoneNumberUsageType: 'ContactNumber',
                    firstName: 'Hello',
                    lastName: '',
                  },
                ]),
              })}
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

@autorun(test)
@common
@p2
@title('Search content on the Messages list')
export class SearchMessagesListContent extends Step {
  CustomLogin?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CustomCreateMock?: StepFunction<any, any> = CommonCreateMock;
  @examples(`
    | tabType | searchText | isMatched | type   | matched                                         |
    | 'Text'  | 'test'     | true      | 'Text' | ["(866) 210-5111","(866) 210-5112", "(866) 210-5113"] |
  `)
  run() {
    const { type, searchText, isMatched, tabType, matched } =
      this.context.example;

    const { CustomLogin, CustomCreateMock } = this;

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
