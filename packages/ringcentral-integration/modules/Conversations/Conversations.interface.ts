import type MessageAttachmentInfo from '@rc-ex/core/lib/definitions/MessageAttachmentInfo';

import { Message } from '../../interfaces/MessageStore.model';
import {
  Correspondent,
  FaxAttachment,
  VoicemailAttachment,
} from '../../lib/messageHelper';
import { RingCentralClient } from '../../lib/RingCentralClient';
import { Alert } from '../Alert';
import { AppFeatures } from '../AppFeatures';
import { Auth } from '../Auth';
import { ContactMatcher } from '../ContactMatcher';
import { ConversationLogger } from '../ConversationLogger';
import { ExtensionInfo } from '../ExtensionInfo';
import { Attachment, MessageSender } from '../MessageSender';
import { MessageStore } from '../MessageStore';
import { RegionSettings } from '../RegionSettings';

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
