import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import {
  AppFeatures,
  Auth,
  Client,
  ExtensionInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  type CallQueueInfo,
  CallQueues,
  Grant,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  action,
  computed,
  delegate,
  injectable,
  optional,
  state,
  watch,
} from '@ringcentral-integration/next-core';

import { ConversationLogger } from '../ConversationLogger';
import type { FilteredConversation } from '../Conversations';
import { ConversationsBase } from '../Conversations/ConversationsBase';
import { MessageSender } from '../MessageSender';
import { SmsOptOut } from '../SmsOptOut';

import type {
  QueueConversationFilter,
  QueueConversationSearchForm,
  QueueConversationSearchFormUpdate,
  QueueConversationsOptions,
  QueueMessage,
} from './QueueConversations.interface';
import { QueueMessageStore } from './QueueMessageStore';

const FAILED_MESSAGE_STATUSES = new Set(['SendingFailed', 'DeliveryFailed']);
export const ALL_CALL_QUEUES = 'all';

@injectable({
  name: 'QueueConversations',
})
export class QueueConversations extends ConversationsBase<QueueMessageStore> {
  constructor(
    protected override _toast: Toast,
    protected override _auth: Auth,
    protected override _client: Client,
    protected override _messageSender: MessageSender,
    protected override _extensionInfo: ExtensionInfo,
    protected override _messageStore: QueueMessageStore,
    protected override _appFeatures: AppFeatures,
    protected override _regionSettings: RegionSettings,
    private _grant: Grant,
    private _callQueues: CallQueues,
    @optional() protected override _contactMatcher?: ContactMatcher,
    @optional() protected override _conversationLogger?: ConversationLogger,
    @optional('QueueConversationsOptions')
    protected override _conversationsOptions?: QueueConversationsOptions,
    @optional() protected override _smsOptOut?: SmsOptOut,
  ) {
    super(
      _toast,
      _auth,
      _client,
      _messageSender,
      _extensionInfo,
      _messageStore,
      _appFeatures,
      _regionSettings,
      _contactMatcher,
      _conversationLogger,
      {
        ..._conversationsOptions,
        enableLoadOldMessages: false,
      },
      _smsOptOut,
    );
  }

  @state
  filter: QueueConversationFilter = 'All';

  @state
  private _selectedCallQueueIds: string[] = [];

  @computed
  get selectedCallQueueIds() {
    const eligibleQueueIds = this.eligibleQueueIds;
    const selectedCallQueueIds = this._selectedCallQueueIds.filter((queueId) =>
      eligibleQueueIds.has(queueId),
    );

    if (selectedCallQueueIds.length === this.smsRecipientCallQueues.length) {
      return [];
    }

    return selectedCallQueueIds;
  }

  get selectedCallQueueId() {
    return this.selectedCallQueueIds[0] ?? null;
  }

  private get _enable() {
    return this._conversationsOptions?.enable ?? true;
  }

  override get _hasPermission() {
    return Boolean(
      this._enable &&
      this._appFeatures.hasReadTextPermission &&
      this.smsRecipientCallQueues.length > 0,
    );
  }

  get hasPermission() {
    return this._hasPermission;
  }

  @computed
  get smsRecipientCallQueues(): CallQueueInfo[] {
    return this._grant.grants
      .reduce((queues, grant) => {
        if (!grant.callQueueSmsRecipient) {
          return queues;
        }

        const extensionId = grant.extension.id;
        const queue = this._callQueues.getQueue(extensionId);

        if (queue && this._grant.isCallQueueExtensionById(extensionId)) {
          queues.push(queue);
        }

        return queues;
      }, [] as CallQueueInfo[])
      .sort((a, b) =>
        (a.name || a.extensionNumber).localeCompare(
          b.name || b.extensionNumber,
        ),
      );
  }

  @computed
  get eligibleQueueIds() {
    return new Set(this.smsRecipientCallQueues.map(({ id }) => id));
  }

  @computed
  override get allConversations(): Message[] {
    const eligibleQueueIds = this.eligibleQueueIds;

    // must filter to ensure the conversations are from the eligible queues, because the user may have been removed from some queues, but the conversations still exist in the store
    return super.allConversations.filter((conversation) => {
      const ownerExtensionId = (conversation as QueueMessage).owner
        ?.extensionId;
      return Boolean(
        ownerExtensionId && eligibleQueueIds.has(ownerExtensionId),
      );
    });
  }

  @computed
  get callQueueSearchForm(): QueueConversationSearchForm {
    return {
      searchInput: this.searchInput,
      filter: this.filter,
      selectedCallQueueIds: this.selectedCallQueueIds,
    };
  }

  @computed
  override get filteredConversations(): FilteredConversation[] {
    const selectedCallQueueIds = this.selectedCallQueueIds;
    const filter = this.filter;

    return super.filteredConversations.filter((conversation) => {
      const ownerExtensionId = (conversation as QueueMessage).owner
        ?.extensionId;
      if (
        selectedCallQueueIds.length > 0 &&
        (!ownerExtensionId || !selectedCallQueueIds.includes(ownerExtensionId))
      ) {
        return false;
      }

      switch (filter) {
        case 'Unread':
          return conversation.unreadCounts > 0;
        case 'Draft': {
          const inputContent =
            this.inputContents[String(conversation.conversationId)];
          return Boolean(
            (conversation as QueueMessage).messageStatus === 'Draft' ||
            inputContent?.text?.trim() ||
            inputContent?.attachments?.length,
          );
        }
        case 'Failed':
          return FAILED_MESSAGE_STATUSES.has(conversation.messageStatus ?? '');
        default:
          return true;
      }
    });
  }

  @computed
  get unreadCount() {
    if (!this.hasPermission) {
      return 0;
    }

    return this.formattedConversations.reduce(
      (count, conversation) => count + conversation.unreadCounts,
      0,
    );
  }

  getConversationQueue(conversationId: Message['conversationId']) {
    const extensionId = this.getConversationQueueExtensionId(conversationId);

    return extensionId ? this._callQueues.getQueue(extensionId) : undefined;
  }

  getConversationQueueExtensionId(conversationId: string | undefined) {
    const conversation = this.allConversationsMap.get(conversationId);
    const queueId = (conversation as QueueMessage | undefined)?.owner
      ?.extensionId;
    return queueId;
  }

  @action
  private _updateFilter(filter: QueueConversationFilter) {
    this.filter = filter;
    this.currentPage = 1;
  }

  @action
  private _updateSelectedCallQueueIds(queueIds: string[]) {
    this._selectedCallQueueIds = [...new Set(queueIds)];
    this.currentPage = 1;
  }

  @action
  private _resetCallQueueSearchForm() {
    this.searchInput = '';
    this.filter = 'All';
    this._selectedCallQueueIds = [];
    this.currentPage = 1;
  }

  @delegate('server')
  async updateFilter(filter: QueueConversationFilter) {
    this._updateFilter(filter);
  }

  @delegate('server')
  async updateSelectedCallQueueIds(queueIds: string[]) {
    this._updateSelectedCallQueueIds(queueIds);
  }

  @delegate('server')
  async updateSelectedCallQueueId(queueId: string | null) {
    this._updateSelectedCallQueueIds(
      queueId && queueId !== ALL_CALL_QUEUES ? [queueId] : [],
    );
  }

  @delegate('server')
  async updateCallQueueSearchForm(updates: QueueConversationSearchFormUpdate) {
    if (updates === 'reset') {
      this._resetCallQueueSearchForm();
      return;
    }

    if (updates.searchInput !== undefined) {
      this._updateSearchInput(updates.searchInput);
    }
    if (updates.filter !== undefined) {
      this._updateFilter(updates.filter);
    }
    if (updates.selectedCallQueueIds !== undefined) {
      this._updateSelectedCallQueueIds(updates.selectedCallQueueIds);
    }
  }

  override onInitOnce() {
    super.onInitOnce();

    watch(
      this,
      () =>
        `${this._selectedCallQueueIds.join(',')}:${[
          ...this.eligibleQueueIds,
        ].join(',')}`,
      () => {
        const validQueueIds = this._selectedCallQueueIds.filter((queueId) =>
          this.eligibleQueueIds.has(queueId),
        );
        if (validQueueIds.length !== this._selectedCallQueueIds.length) {
          this._updateSelectedCallQueueIds(validQueueIds);
        }
      },
    );
  }

  override onReset() {
    super.onReset();
    this._resetCallQueueSearchForm();
  }
}
