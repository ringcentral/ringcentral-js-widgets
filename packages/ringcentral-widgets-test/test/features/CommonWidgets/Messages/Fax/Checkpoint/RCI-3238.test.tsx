import type { StepProp } from '@ringcentral-integration/test-utils';
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
  common,
} from '@ringcentral-integration/test-utils';

import {
  mockMessageListData,
  modifyMessageStatus,
} from '../../../../../__mock__/mockMessageListData';
import type { Context } from '../../../../../interfaces';
import { ForceContactMatch } from '../../../../../steps/ContactMatch';
import { CheckMessageNumbers } from '../../../../../steps/Conversation/CheckMessageNumbers';
import { TypeCharacter } from '../../../../../steps/Messages/actions/TypeCharacter';
import {
  CheckCurrentName,
  CheckSearchResult,
} from '../../../../../steps/Messages/checks/CheckCurrentName';
import { MockMessageSync, MockMessageList } from '../../../../../steps/Mock';
import { NavigateToFax } from '../../../../../steps/Navigate/actions/NavigateToFax';

const faxList = [
  {
    direction: 'Inbound',
    type: 'Fax',
    readStatus: 'Unread',
    fromNumber: '+16509807430',
    conversationId: undefined,
  },
  {
    direction: 'Outbound',
    type: 'Fax',
    readStatus: 'Read',
    toNumber: '+16509807431',
    conversationId: undefined,
  },
  {
    direction: 'Outbound',
    type: 'Fax',
    readStatus: 'Read',
    toNumber: '+16509807432',
    conversationId: undefined,
  },
  {
    direction: 'Inbound',
    type: 'Fax',
    readStatus: 'Unread',
    fromNumber: '+16509807433',
    conversationId: undefined,
  },
];

@autorun(test.skip)
@common
@it
@p2
@title('Fax_list')
export class FaxContactMatchAndSearch3238 extends Step {
  CustomMock: StepProp | null = null;
  CustomEntry: StepProp | null = null;
  CustomLogin: StepProp | null = null;
  CustomContactMatch: StepProp | null = null;
  defaultQueryType: 'title' | 'text' = 'title';
  @examples(`
    | phoneNumber    | contactMatch | currentName      | searchText   | searchResult                                                       |
    | '+16509807430' | ''           | '(650) 980-7430' | '7430'       | ['(650) 980-7430']                                                 |
    | '+16509807431' | 'Contact 1'  | 'Contact 1'      | 'con'        | ['Contact 1']                                                      |
    | '+16509807431' | 'Contact 1'  | 'Contact 1'      | '6'          | ['Contact 1','(650) 980-7430', '(650) 980-7432', '(650) 980-7433'] |
    | '+16509807433' | 'Sarah Chen' | 'Sarah Chen'     | '6509807433' | ['Sarah Chen']                                                     |
    | '+16509807432' | 'Company 1'  | 'Company 1'      | 'sarx'       | ['noMatch']                                                        |
  `)
  run() {
    const mockMsgData = mockMessageListData(faxList);
    return (
      <Scenario desc="Fax list: Contact Match / Check Search Result / Check Fax List">
        <When
          desc="> Login with Account_A
								> Hover on fax in {Entry}"
          action={() => [
            this.CustomMock,
            <MockMessageList
              isDefaultInit
              repeat={0}
              handler={(mockData) => ({
                ...mockData,
                ...mockMsgData,
              })}
            />,
            <MockMessageSync
              isDefaultInit
              useFaker
              handler={() => mockMsgData}
            />,
            this.CustomContactMatch,
            this.CustomEntry,
            this.CustomLogin,
            NavigateToFax,
            <ForceContactMatch
              phoneNumber={this.context.example.phoneNumber}
            />,
          ]}
        />
        <Then
          desc="Information should be displayed
                Note:Corresponding information
                Phone number (fax1)
                Contact name and phone number(fax2,3)
                Google icon and Google contact name and phone number(fax4)"
          action={
            <CheckCurrentName
              nameItem={this.context.example.currentName}
              defaultQueryType={this.defaultQueryType}
            />
          }
        />
        <When
          desc="Input {searchText} in search box"
          action={
            <TypeCharacter searchText={this.context.example.searchText} />
          }
        />
        <Then
          desc="Corresponding results will be display as {searchResult}
								Note: The search is only started by typing 3 characters"
          action={
            <CheckSearchResult
              nameItems={this.context.example.searchResult}
              defaultQueryType={this.defaultQueryType}
            />
          }
        />
        <When
          desc="User delete or send fax in other client"
          action={[
            <TypeCharacter searchText="" />,
            (_: any, { rcMock }: Context) => {
              rcMock.receiveMessage(
                { repeat: 1 },
                modifyMessageStatus({
                  count: 1,
                  change: {
                    key: 'readStatus',
                    value: 'Read',
                  },
                  messageListData: mockMsgData,
                }),
              );
            },
            <CheckMessageNumbers count={2} />,
          ]}
        />
        <Then
          desc="The fax list should be updated according to the changes
                Note: Submitted and send failed status should not be updated to the changes"
          action={[
            (_: any, { rcMock }: Context) => {
              rcMock.receiveMessage(
                { repeat: 1 },
                modifyMessageStatus({
                  count: 2,
                  change: {
                    key: 'availability',
                    value: 'Deleted',
                  },
                  messageListData: mockMsgData,
                }),
              );
            },
            <CheckMessageNumbers count={1} />,
          ]}
        />
      </Scenario>
    );
  }
}
