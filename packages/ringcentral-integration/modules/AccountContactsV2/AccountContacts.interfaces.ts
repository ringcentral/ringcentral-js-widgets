import {
  ContactResource,
  PhoneNumberResource,
  PresenceInfoResponse,
} from '@rc-ex/core/definitions';
import { CompanyContacts } from '../CompanyContactsV2';
import ExtensionInfo from '../ExtensionInfo';
import phoneTypes from '../../enums/phoneTypes';

export interface Deps {
  client: any;
  companyContacts: CompanyContacts;
  extensionInfo: ExtensionInfo;
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

export interface Contact extends ContactResource {
  type: string;
  id: string;
  emails: string[];
  extensionNumber: string;
  hasProfileImage: boolean;
  phoneNumbers: ({
    phoneNumber?: string;
    phoneType?: keyof typeof phoneTypes;
  } & PhoneNumberResource)[];
  profileImageUrl: string;
  presence: Presence['presence'];
  contactStatus: string;
}

export type PresenceContexts = {
  contact: Contact;
  resolve: (...args: any) => void;
}[];

export type PresenceMap = Record<string, Presence['presence']>;
