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
import {
  ENHANCED_MMS_MIME_TYPES_IN_LOWERCASE,
  SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE,
} from '@ringcentral-integration/next-widgets/components/MessageInput/FileAttacher';

import { ConversationLogger } from '../ConversationLogger';
import { MessageSender } from '../MessageSender';
import { MessageStore } from '../MessageStore';
import { SmsOptOut } from '../SmsOptOut';

import type { ConversationsOptions } from './Conversations.interface';
import { ConversationsBase } from './ConversationsBase';

/**
 * This module is for legacy common widgets which has Fax/Sms/VoiceMail in one place
 * For new integration, pls use the particular Conversations module in Fax, Sms, Voicemail folders.
 */
@injectable({
  name: 'Conversations',
})
export class Conversations extends ConversationsBase<MessageStore> {
  acceptFileTypes =
    process.env.THEME_SYSTEM === 'spring-ui'
      ? SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE.concat(
          ENHANCED_MMS_MIME_TYPES_IN_LOWERCASE,
        ).join()
      : SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE.join();

  constructor(
    protected override _toast: Toast,
    protected override _auth: Auth,
    protected override _client: Client,
    protected override _messageSender: MessageSender,
    protected override _extensionInfo: ExtensionInfo,
    protected override _messageStore: MessageStore,
    protected override _appFeatures: AppFeatures,
    protected override _regionSettings: RegionSettings,
    @optional() protected override _contactMatcher?: ContactMatcher,
    @optional() protected override _conversationLogger?: ConversationLogger,
    @optional('ConversationsOptions')
    protected override _conversationsOptions?: ConversationsOptions,
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
      _conversationsOptions,
      _smsOptOut,
    );
  }
}
