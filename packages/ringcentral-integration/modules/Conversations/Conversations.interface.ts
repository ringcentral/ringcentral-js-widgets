import type MessageAttachmentInfo from '@rc-ex/core/lib/definitions/MessageAttachmentInfo';

import type { Message } from '../../interfaces/MessageStore.model';
import type {
  Correspondent,
  FaxAttachment,
  VoicemailAttachment,
} from '../../lib/messageHelper';
import type { RingCentralClient } from '../../lib/RingCentralClient';
import type { Alert } from '../Alert';
import type { AppFeatures } from '../AppFeatures';
import type { Auth } from '../Auth';
import type { ContactMatcher } from '../ContactMatcher';
import type { ConversationLogger } from '../ConversationLogger';
import type { ExtensionInfo } from '../ExtensionInfo';
import type { Attachment, MessageSender } from '../MessageSender';
import type { MessageStore } from '../MessageStore';
import type { RegionSettings } from '../RegionSettings';

export interface Deps {
  alert: Alert;
  auth: Auth;
  client: RingCentralClient;
  contactMatcher?: ContactMatcher;
  conversationLogger?: ConversationLogger;
  appFeatures: AppFeatures;
  extensionInfo: ExtensionInfo;
  messageSender: MessageSender;
  messageStore: MessageStore;
  regionSettings: RegionSettings;
  conversationsOptions?: ConversationsOptions;
}

export interface ConversationsOptions {
  perPage?: number;
  daySpan?: number;
  enableLoadOldMessages?: boolean;
  showMMSAttachment?: boolean;
  enableContactMatch?: boolean;
}

export interface InputContent {
  conversationId: string;
  text?: string;
  attachments?: Attachment[];
}

export interface FormattedConversation extends Message {
  unreadCounts: number;
  self: Correspondent;
  voicemailAttachment?: VoicemailAttachment;
  faxAttachment?: FaxAttachment;
  mmsAttachments: MessageAttachmentInfo[];
  correspondents: Correspondent[];
  conversationLogId: string;
  isLogging: boolean;
  correspondentMatches: CorrespondentMatch[];
  conversationMatches: ConversationMatch[];
}

export interface FilteredConversation extends FormattedConversation {
  matchOrder?: number;
  matchedMessage?: Message;
}

export interface CorrespondentMatch {
  name?: string;
  phoneNumber?: string;
  rawId?: string;
  id?: string;
  doNotCall?: boolean;
  type?: string;
  resourceType?: string;
}

export interface ConversationMatch {
  id: string;
}

export interface CorrespondentResponse {
  [key: string]: string;
}

export interface LastMatchedCorrespondentEntity {
  id: string;
  name: string;
}
export interface CurrentConversation extends FormattedConversation {
  messages: Message[];
  senderNumber: Correspondent;
  recipients: Correspondent[];
  lastMatchedCorrespondentEntity?: LastMatchedCorrespondentEntity;
}
