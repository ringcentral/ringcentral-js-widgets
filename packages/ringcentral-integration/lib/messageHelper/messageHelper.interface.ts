import { GetMessageInfoResponse } from '@rc-ex/core/definitions';

export interface NormalizedMessageRecord
  extends Omit<
    GetMessageInfoResponse,
    'conversationId' | 'creationTime' | 'lastModifiedTime' | 'conversation'
  > {
  conversationId: string;
  creationTime: number;
  lastModifiedTime: number;
}

export interface Correspondent {
  phoneNumber?: string;
  extensionNumber?: string;
  name?: string;
}

export interface VoicemailAttachment {
  duration: number;
  uri?: string;
}

export interface FaxAttachment {
  uri?: string;
}

export interface SortEntity {
  matchOrder?: number;
  creationTime: number;
}
