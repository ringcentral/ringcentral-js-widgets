import { sortByDate } from '@ringcentral-integration/commons/lib/messageHelper';
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
  action,
  computed,
  injectable,
  optional,
  state,
} from '@ringcentral-integration/next-core';
import filter from 'lodash/filter';

import { ConversationLogger } from '../ConversationLogger';
import type { FilteredConversation } from '../Conversations/Conversations.interface';
import { ConversationsBase } from '../Conversations/ConversationsBase';
import { MessageSender } from '../MessageSender';

import type { FaxConversationsOptions } from './FaxConversations.interface';
import type { FaxFilterStatus } from './FaxFilter.interface';
import { FaxMessageStore } from './FaxMessageStore';

/**
 * For fax conversations
 */
@injectable({
  name: 'FaxConversations',
})
export class FaxConversations extends ConversationsBase<FaxMessageStore> {
  constructor(
    protected override _toast: Toast,
    protected override _auth: Auth,
    protected override _client: Client,
    protected override _messageSender: MessageSender,
    protected override _extensionInfo: ExtensionInfo,
    protected override _messageStore: FaxMessageStore,
    protected override _appFeatures: AppFeatures,
    protected override _regionSettings: RegionSettings,
    @optional() protected override _contactMatcher?: ContactMatcher,
    @optional() protected override _conversationLogger?: ConversationLogger,
    @optional('FaxConversationsOptions')
    protected override _conversationsOptions?: FaxConversationsOptions,
  ) {
    super(
      _toast,
      _auth,
      _client,
      null,
      _extensionInfo,
      _messageStore,
      _appFeatures,
      _regionSettings,
      _contactMatcher,
      _conversationLogger,
      _conversationsOptions,
    );
  }
  @state
  currentStatus: FaxFilterStatus = 'All';

  @action
  setCurrentStatus(val: FaxFilterStatus) {
    this.currentStatus = val;
  }

  override onReset() {
    super.onReset();
  }

  override get _hasPermission() {
    return this._appFeatures.hasReadFaxPermission;
  }

  @computed((that: FaxConversations) => [
    that.currentStatus,
    that.formattedConversations,
  ])
  get limitedConversations(): FilteredConversation[] {
    const targetStatus = this.currentStatus;
    if (targetStatus === 'All') {
      return this.formattedConversations;
    }
    return filter(
      this.formattedConversations,
      ({ messageStatus, direction }) => {
        switch (targetStatus) {
          case 'Failed':
            return (
              messageStatus === 'SendingFailed' ||
              messageStatus === 'DeliveryFailed'
            );
          case 'Received':
            return direction === 'Inbound' && messageStatus === 'Received';
          case 'Sent':
            return messageStatus === 'Sent' || messageStatus === 'Queued';
          default:
            return true;
        }
      },
    );
  }

  @computed((that: FaxConversations) => [
    that.searchInput,
    that.limitedConversations,
  ])
  override get filteredConversations(): FilteredConversation[] {
    const effectSearchStr = this.searchInput?.toLowerCase?.()?.trim();
    const faxList = this.limitedConversations;

    if (effectSearchStr === '' || effectSearchStr === null) {
      return faxList;
    }
    return faxList
      .filter((fax) => {
        if (
          fax.correspondentMatches.find(
            (entity) =>
              (entity.name || '').toLowerCase().indexOf(effectSearchStr) > -1,
          )
        ) {
          // match by entity's name
          return true;
        }
        if (
          fax.correspondents?.find(
            (contact) =>
              (contact.phoneNumber || contact.extensionNumber || '').indexOf(
                effectSearchStr,
              ) > -1,
          )
        ) {
          return true;
        }
        if (
          fax.correspondents?.find(
            (contact) =>
              (contact.name || '').toLowerCase().indexOf(effectSearchStr) > -1,
          )
        ) {
          return true;
        }
        return false;
      })
      .sort(sortByDate as any);
  }
}
