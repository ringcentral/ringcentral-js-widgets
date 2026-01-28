import type PresenceInfoResponse from '@rc-ex/core/lib/definitions/PresenceInfoResponse';
import type { PhoneType } from '@ringcentral-integration/commons/enums/phoneTypes';
import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';

export interface AccountContactsOptions {
  /**
   * timestamp of presence local cache, default 10 mins
   */
  presenceTtl?: number;
}

export interface ProfileImage {
  url: string;
}

export type ProfileImages = Record<string, ProfileImage>;

export type ContactPresenceStatus = Pick<
  PresenceInfoResponse,
  | 'dndStatus'
  | 'presenceStatus'
  | 'telephonyStatus'
  | 'userStatus'
  | 'meetingStatus'
>;

export interface Presence {
  presence: ContactPresenceStatus;
  timestamp: number;
}

export type Presences = Record<string, Presence>;

export interface Contact extends IContact {
  presence?: Presence['presence'];
  contactStatus?: string;
  isCallQueueNumber?: boolean;
  phoneType?: PhoneType;
}

export interface DirectoryContacts {
  all: Contact[];
  cdc: Contact[];
}

export type GetPresenceContext = {
  accountId: string;
  extensionId: string;
  callbacks: Array<(...args: any) => void>;
};

export type PresenceMap = Record<string, Presence['presence']>;
