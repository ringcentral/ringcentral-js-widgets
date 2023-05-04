import type PresenceInfoResponse from '@rc-ex/core/lib/definitions/PresenceInfoResponse';

import { IContact } from '../../interfaces/Contact.model';
import { AccountInfo } from '../AccountInfo';
import { AppFeatures } from '../AppFeatures';
import { CompanyContacts } from '../CompanyContacts';
import { ExtensionInfo } from '../ExtensionInfo';

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
   * timestamp of local cache, default 30 mins
   */
  ttl?: number;
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
    'dndStatus' | 'presenceStatus' | 'telephonyStatus' | 'userStatus'
  >;
  timestamp: number;
}

export type Presences = Record<string, Presence>;

export interface Contact extends IContact {
  presence?: Presence['presence'];
  contactStatus?: string;
}

export interface DirectoryContacts {
  all: Contact[];
  cdc: Contact[];
}

export type PresenceContexts = {
  contact: IContact;
  resolve: (...args: any) => void;
}[];

export type PresenceMap = Record<string, Presence['presence']>;
