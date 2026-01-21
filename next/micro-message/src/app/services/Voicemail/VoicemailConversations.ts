import {
  AppFeatures,
  Auth,
  Client,
  ExtensionInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import { injectable, optional } from '@ringcentral-integration/next-core';

import { ConversationLogger } from '../ConversationLogger';
import { ConversationsBase } from '../Conversations';
import { MessageSender } from '../MessageSender';

import type { VoicemailConversationsOptions } from './VoicemailConversations.interface';
import { VoicemailMessageStore } from './VoicemailMessageStore';

@injectable({
  name: 'VoicemailConversations',
})
export class VoicemailConversations extends ConversationsBase<VoicemailMessageStore> {
  protected override _minSearchStringLength = 1;

  constructor(
    protected override _toast: Toast,
    protected override _auth: Auth,
    protected override _client: Client,
    protected override _messageSender: MessageSender,
    protected override _extensionInfo: ExtensionInfo,
    protected override _messageStore: VoicemailMessageStore,
    protected override _appFeatures: AppFeatures,
    protected override _regionSettings: RegionSettings,
    @optional() protected override _contactMatcher?: ContactMatcher,
    @optional() protected override _conversationLogger?: ConversationLogger,
    @optional('VoicemailConversationsOptions')
    protected override _conversationsOptions?: VoicemailConversationsOptions,
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

  override get _hasPermission() {
    return this._appFeatures.hasVoicemailPermission;
  }
}
