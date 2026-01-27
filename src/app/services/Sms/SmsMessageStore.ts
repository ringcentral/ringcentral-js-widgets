import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import {
  directionlessMessageIsUnread,
  messageIsDeleted,
} from '@ringcentral-integration/commons/lib/messageHelper';
import {
  AppFeatures,
  Auth,
  AvailabilityMonitor,
  Client,
  ConnectivityMonitor,
  DataFetcher,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import { injectable, optional } from '@ringcentral-integration/next-core';

import { MessageStoreBase } from '../MessageStore/MessageStoreBase';
import { MessageStoreEventSubscriber } from '../MessageStoreEventSubscriber';

import type { SmsMessageStoreOptions } from './SmsMessageStore.interface';

interface PreUpdateParams {
  conversationId: string;
  messageId?: number;
  readStatus?: 'Read' | 'Unread';
}

interface MessageWithTempReadStatus extends Message {
  preUpdateReadStatus?: Pick<Message, 'readStatus'>;
}

@injectable({
  name: 'SmsMessageStore',
})
export class SmsMessageStore extends MessageStoreBase {
  constructor(
    protected override _toast: Toast,
    protected override _auth: Auth,
    protected override _client: Client,
    protected override _dataFetcher: DataFetcher,
    protected override _connectivityMonitor: ConnectivityMonitor,
    protected override _messageEventSubscriber: MessageStoreEventSubscriber,
    protected override _appFeatures: AppFeatures,
    @optional()
    protected override _availabilityMonitor?: AvailabilityMonitor,
    @optional('TabManager') protected override _tabManager?: any,
    @optional('SmsMessageStoreOptions')
    protected override _messageStoreOptions?: SmsMessageStoreOptions,
  ) {
    super(
      _toast,
      _auth,
      _client,
      _dataFetcher,
      _connectivityMonitor,
      _appFeatures,
      _messageEventSubscriber,
      _availabilityMonitor,
      _tabManager,
      {
        ..._messageStoreOptions,
        messageType: ['SMS', 'Text'],
        messageStoreKey: 'smsMessageStore',
      },
    );
    // in SMS both inbound & outbound SMS could be unread status
    this._messageIsUnreadFunc = directionlessMessageIsUnread;
  }

  private _findTargetMessages({
    conversationId,
    messageId,
    readStatus,
  }: PreUpdateParams) {
    let targetMessages: MessageWithTempReadStatus[] = [];

    if (readStatus === 'Read') {
      // Mark as read -> MessageStore.readMessages, multiple messages
      const messageList = this.conversationStore[conversationId!];
      if (!messageList || messageList.length === 0) {
        return;
      }
      const unreadMessageIds = messageList.filter(this._messageIsUnreadFunc);
      if (unreadMessageIds.length === 0) {
        return;
      }
      targetMessages = [...unreadMessageIds];
    } else {
      // Mark as unread -> MessageStore.unreadMessage, one messages
      const oldDataSet = { ...this.data?.conversationStore };
      if (!oldDataSet) {
        return;
      }
      const targetConversation = JSON.parse(
        JSON.stringify(oldDataSet[conversationId]),
      );
      const targetMessage = targetConversation.find(
        (message: Message) => message.id === messageId,
      );
      targetMessages.push(targetMessage);
    }

    return targetMessages;
  }

  /**
   * manually update the local conversationStore before message-sync back
   */
  preUpdateReadStatus({
    conversationId,
    messageId,
    readStatus,
  }: PreUpdateParams) {
    const targetMessages = this._findTargetMessages({
      conversationId,
      messageId,
      readStatus,
    });
    if (!targetMessages || targetMessages.length === 0) {
      return;
    }
    /*
     * 'conversation' and 'lastModifiedTime' data structure are must-have
     * for '_processRawConversationList' & '_processRawConversationStore'
     * 'lastModifiedTime + 1' to make sure update local message success
     * add extra 'preUpdateReadStatus' field, which will be erased when sync done
     */
    const newTargetMessages = targetMessages.map((msg) => ({
      ...msg,
      preUpdateReadStatus: readStatus,
      conversation: {
        id: conversationId,
      },
      lastModifiedTime: msg.lastModifiedTime! + 1,
    })) as any;
    this.pushMessages(newTargetMessages);
  }

  rollbackPreUpdateReadStatus({ conversationId }: PreUpdateParams) {
    const messageList = this.conversationStore[
      conversationId!
    ] as MessageWithTempReadStatus[];
    if (!messageList || messageList.length === 0) {
      return;
    }
    const rollbackMessages = messageList
      .filter((msg) => msg.preUpdateReadStatus)
      .map((msg) => {
        const original = {
          ...msg,
          conversation: {
            id: conversationId,
          },
          lastModifiedTime: msg.lastModifiedTime! + 1,
        };
        delete original.preUpdateReadStatus;
        return original;
      }) as any;

    this.pushMessages(rollbackMessages);
  }

  override get _hasPermission() {
    return this._appFeatures.hasReadTextPermission;
  }

  override async _setConversationAsRead(
    conversationId: Message['conversationId'],
  ) {
    const messageList = this.conversationStore[conversationId!];
    if (!messageList || messageList.length === 0) {
      return;
    }
    const unreadMessageIds = messageList
      // the only different with MessageStoreBase, could not use the _messageIsUnreadFunc
      // cause it will mix the preUpdateReadStatus and real readStatus
      .filter((msg) => msg.readStatus === 'Unread' && !messageIsDeleted(msg))
      .map((m) => m.id);
    if (unreadMessageIds.length === 0) {
      return;
    }

    const { ownerId } = this._auth;
    const updatedMessages = await this._updateMessagesApi(
      unreadMessageIds,
      'Read',
    );

    if (ownerId !== this._auth.ownerId) {
      return;
    }

    this.pushMessages(updatedMessages);
  }
}
