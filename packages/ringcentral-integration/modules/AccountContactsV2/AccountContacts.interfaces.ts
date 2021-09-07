import { PresenceInfoResponse } from '@rc-ex/core/definitions';
import { IContact } from '../../interfaces/Contact.model';
import { AppFeatures } from '../AppFeatures';
import { CompanyContacts } from '../CompanyContactsV2';
import { ExtensionInfo } from '../ExtensionInfoV2';

export interface Deps {
  client: any;
  extensionInfo: ExtensionInfo;
  companyContacts: CompanyContacts;
  appFeatures: AppFeatures;
  accountContactsOptions?: AccountContactsOptions;
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
  contact: Contact;
  resolve: (...args: any) => void;
}[];

export type PresenceMap = Record<string, Presence['presence']>;
