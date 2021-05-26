import { MessageAttachmentInfo } from '@rc-ex/core/definitions';
import { Message } from '../../interfaces/MessageStore.model';
import {
  Correspondent,
  FaxAttachment,
  VoicemailAttachment,
} from '../../lib/messageHelper';
import { RingCentralClient } from '../../lib/RingCentralClient';
import { Alert } from '../AlertV2';
import { Auth } from '../AuthV2';
import { ContactMatcher } from '../ContactMatcherV2';
import { ConversationLogger } from '../ConversationLoggerV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { Attachment, MessageSender } from '../MessageSenderV2';
import { MessageStore } from '../MessageStoreV2';
import { RegionSettings } from '../RegionSettingsV2';

export interface Deps {
  alert: Alert;
  auth: Auth;
  client: RingCentralClient;
  contactMatcher?: ContactMatcher;
  conversationLogger?: ConversationLogger;
  extensionFeatures: ExtensionFeatures;
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
