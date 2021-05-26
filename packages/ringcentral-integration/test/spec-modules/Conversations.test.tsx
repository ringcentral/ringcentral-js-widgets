import { autorun, title, Scenario, Given, When, Then, Step } from 'crius-test';
import { messageTypes } from '../../enums/messageTypes';
import {
  Conversations,
  conversationsStatus,
} from '../../modules/ConversationsV2';
import { mockModuleGenerator } from '../lib/mockModule';

class MockModule {
  _ready = true;
  get ready() {
    return this._ready;
  }
}

class MockAlert extends MockModule {
  args: any = null;
  warning(...args: any[]) {
    this.args = args;
  }
}

class MockMessageSender extends MockModule {
  async send(...args) {
    return args;
  }

  get events() {
    return {
      send: 'send',
    };
  }

  get senderNumbersList() {
    return [{ phoneNumber: '+1234567890' }];
  }

  on() {}
}

class MockAuth extends MockModule {
  get isFreshLogin() {
    return false;
  }

  get loggedIn() {
    return true;
  }
}

class MockRolesAndPermissions extends MockModule {}

class MockMessageStore extends MockModule {}

class MockExtensionInfo extends MockModule {}

class MockContactMatcher extends MockModule {
  _dataMapping: {};

  get dataMapping() {
    return this._dataMapping;
  }

  addQuerySource() {}
}

const mockMessageRecord = JSON.parse(`{
  "uri" : "...",
  "id" : 12345678,
  "to" : [ {
    "phoneNumber" : "+19999999999"
  } ],
  "from" : {
    "phoneNumber" : "+18888888888"
  },
  "type" : "SMS",
  "creationTime" : "2020-08-04T09:43:53.000Z",
  "readStatus" : "Read",
  "priority" : "Normal",
  "attachments" : [ {
    "id" : 1234,
    "uri" : "...",
    "type" : "Text",
    "contentType" : "text/plain"
  } ],
  "direction" : "Inbound",
  "availability" : "Alive",
  "subject" : "ttttttt",
  "messageStatus" : "Received",
  "conversationId" : 123456789000,
  "conversation" : {
    "id" : "123456789000",
    "uri" : "..."
  },
  "lastModifiedTime" : "2020-08-04T09:44:03.421Z"
}`);

class MockClient {
  account() {
    return {
      extension: () => {
        return {
          messageStore: () => {
            return {
              list: async (args: any) => {
                return { records: [mockMessageRecord] };
              },
            };
          },
        };
      },
    };
  }
}

const getMockModule = () =>
  mockModuleGenerator({
    searchInput: '',
    typeFilter: messageTypes.all,
    oldConversations: [] as any[],
    currentPage: 1,
    fetchConversationsStatus: conversationsStatus.idle,
    currentConversationId: '123456789000',
    oldMessages: [] as any[],
    fetchMessagesStatus: conversationsStatus.idle,
    inputContents: [] as any[],
    conversationStatus: conversationsStatus.idle,
    earliestTime: Date.now(),
    filteredConversations: [] as any[],
    _olderDataExisted: true,
    _olderMessagesExisted: true,
    _perPage: 10,
    _daySpan: 7,
    _enableLoadOldMessages: true,
    _hasPermission: true,
    currentConversation: { messages: [] },
    _deps: {},
  });

@autorun(test)
@title('Conversations Module should fetch old conversations successfully')
export class FetchConversationsSuccessfully extends Step {
  run() {
    return (
      <Scenario desc="Fetch Conversations Successfully">
        <Given
          desc="An Conversations instance"
          action={async (_: any, context: any) => {
            const conversations = new Conversations({
              alert: new MockAlert() as any,
              auth: new MockAuth() as any,
              client: new MockClient() as any,
              messageSender: new MockMessageSender() as any,
              messageStore: new MockMessageStore() as any,
              rolesAndPermissions: new MockRolesAndPermissions() as any,
              extensionInfo: new MockExtensionInfo() as any,
              regionSettings: {} as any,
              contactMatcher: new MockContactMatcher() as any,
              conversationLogger: {} as any,
            });
            context.instance = conversations;
          }}
        />
        <When
          desc="Execute fetchOldConversations"
          action={async (_: any, context: any) => {
            context.mockModule = getMockModule();
            context.mockModule._deps.client = context.instance._deps.client;
            context.mockModule._updateFetchConversationsStatus =
              Conversations.prototype._updateFetchConversationsStatus;
            context.mockModule._fetchOldConversationsSuccess =
              Conversations.prototype._fetchOldConversationsSuccess;
            await Conversations.prototype.fetchOldConversations.call(
              context.mockModule,
            );
          }}
        />
        <Then
          desc="should get old conversations"
          action={(_: any, context: any) => {
            expect(context.mockModule.oldConversations.length).toBe(1);
            expect(context.mockModule.oldConversations[0].id).toBe(
              mockMessageRecord.id,
            );
            expect(context.mockModule.fetchConversationsStatus).toBe(
              conversationsStatus.idle,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Conversations Module should fetch old messages successfully')
export class FetchMessagesSuccessfully extends Step {
  run() {
    return (
      <Scenario desc="Fetch Messages Successfully">
        <Given
          desc="An Conversations instance"
          action={async (_: any, context: any) => {
            const conversations = new Conversations({
              alert: new MockAlert() as any,
              auth: new MockAuth() as any,
              client: new MockClient() as any,
              messageSender: new MockMessageSender() as any,
              messageStore: new MockMessageStore() as any,
              rolesAndPermissions: new MockRolesAndPermissions() as any,
              extensionInfo: new MockExtensionInfo() as any,
              regionSettings: {} as any,
              contactMatcher: new MockContactMatcher() as any,
              conversationLogger: {} as any,
            });
            context.instance = conversations;
          }}
        />
        <When
          desc="Execute fetchOldMessages"
          action={async (_: any, context: any) => {
            context.mockModule = getMockModule();
            context.mockModule._deps.client = context.instance._deps.client;
            context.mockModule._updateFetchMessagesStatus =
              Conversations.prototype._updateFetchMessagesStatus;
            context.mockModule._fetchOldMessagesSuccess =
              Conversations.prototype._fetchOldMessagesSuccess;
            await Conversations.prototype.fetchOldMessages.call(
              context.mockModule,
            );
          }}
        />
        <Then
          desc="should get old messages"
          action={(_: any, context: any) => {
            expect(context.mockModule.oldMessages.length).toBe(1);
            expect(context.mockModule.oldMessages[0].id).toBe(
              mockMessageRecord.id,
            );
            expect(context.mockModule.fetchMessagesStatus).toBe(
              conversationsStatus.idle,
            );
          }}
        />
      </Scenario>
    );
  }
}
