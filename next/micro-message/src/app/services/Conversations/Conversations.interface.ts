import type MessageAttachmentInfo from '@rc-ex/core/lib/definitions/MessageAttachmentInfo';
import type { EntityPhoneNumberItem } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import type {
  Correspondent,
  FaxAttachment,
  VoicemailAttachment,
} from '@ringcentral-integration/commons/lib/messageHelper';

import type { Attachment } from '../MessageSender';

export interface ConversationsOptions {
  perPage?: number;
  daySpan?: number;
  enableLoadOldMessages?: boolean;
  /**
   * # spring-ui always be true
   * TODO: should remove after all projects migrate to spring-ui
   */
  showMMSAttachment?: boolean;
  enableContactMatch?: boolean;
  contactMatchIgnoreCache?: boolean;
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
  /**
   * all correspondents matches list
   */
  correspondentMatches: CorrespondentMatch[];
  /**
   * every correspondents's matched entity list, not concat together like correspondentMatches
   *
   * spring-ui new version field
   */
  correspondentMatchesList: CorrespondentMatch[][];
  conversationMatches: ConversationMatch[];
  selfMatches: CorrespondentMatch[];
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
  entityType?: string;
  doNotCall?: boolean;
  type?: string;
  resourceType?: string;
  profileImageUrl?: string;
  phoneNumbers?: EntityPhoneNumberItem[];
}

export interface ConversationMatch {
  id: string;
  name: string;
  url?: string;
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
  /**
   * user custom select contact entity
   */
  lastMatchedCorrespondentEntity?: LastMatchedCorrespondentEntity | null;
}

export type ReadStatusFilter = 'Read' | 'Unread' | 'All';
