import type PresenceInfoResponse from '@rc-ex/core/lib/definitions/PresenceInfoResponse';

import type { IContact } from '../../interfaces/Contact.model';
import type { AccountInfo } from '../AccountInfo';
import type { AppFeatures } from '../AppFeatures';
import type { CompanyContacts } from '../CompanyContacts';
import type { ExtensionInfo } from '../ExtensionInfo';

export interface Deps {
  client: any;
  extensionInfo: ExtensionInfo;
  companyContacts: CompanyContacts;
  appFeatures: AppFeatures;
  accountContactsOptions?: AccountContactsOptions;
  accountInfo: AccountInfo;
}

export interface AccountContactsOptions {
  /**
   * timestamp of avatar local cache, default 2 hour
   */
  avatarTtl?: number;
  /**
   * timestamp of presence local cache, default 10 mins
   */
  presenceTtl?: number;
  /**
   * interval of query avatar, default 2 seconds
   */
  avatarQueryInterval?: number;
}

export interface ProfileImage {
  imageUrl: string;
  timestamp: number;
}

export type ProfileImages = Record<string, ProfileImage>;

export interface Presence {
  presence: Pick<
    PresenceInfoResponse,
    | 'dndStatus'
    | 'presenceStatus'
    | 'telephonyStatus'
    | 'userStatus'
    | 'meetingStatus'
  >;
  timestamp: number;
}

export type Presences = Record<string, Presence>;

export interface Contact extends IContact {
  presence?: Presence['presence'];
  contactStatus?: string;
  isCallQueueNumber?: boolean;
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
