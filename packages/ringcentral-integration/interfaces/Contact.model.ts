import {
  PresenceInfoResponse,
  PersonalContactResource,
} from '@rc-ex/core/definitions';

export interface ContactGroup {
  caption: string;
  contacts: IContact[];
  id: string;
}

export interface IContact {
  id: string;
  type: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phoneNumber?: string;
  phoneNumbers?: { phoneNumber?: string; phoneType?: string }[];
  email?: string;
  emails?: string[];
  hasProfileImage?: boolean;
  extensionNumber?: string;
  profileImageUrl?: string;
}

export interface TypedPhoneNumber {
  id: string;
  name: string;
  type: string;
  phoneNumber: string;
  phoneType: string;
  entityType: string;
}

export interface TypedContact extends IContact {
  entityType: string;
}

export interface ContactModel
  extends Pick<
    PersonalContactResource,
    Exclude<keyof PersonalContactResource, 'id'>
  > {
  type: string;
  phoneNumbers: [];
  emails: string[];
  name: string;
  id: string;
}

export interface ContactSource {
  /**
   * source name
   */
  sourceName: string;
  /**
   * source module ready status
   */
  readonly ready: boolean;
  /**
   * source ready status
   */
  readonly sourceReady: boolean;
  /**
   * source contacts data
   */
  contacts: IContact[];
  /**
   * get source presence
   */
  getPresence?: (
    contact: IContact,
    useCache?: boolean,
  ) => Promise<
    Pick<
      PresenceInfoResponse,
      'dndStatus' | 'presenceStatus' | 'telephonyStatus' | 'userStatus'
    >
  >;
  /**
   * get source profile image
   */
  getProfileImage?: (contact: IContact, useCache?: boolean) => Promise<string>;
  /**
   * filter contacts
   */
  filterContacts?: (searchFilter: string) => IContact[];
  /**
   * get search contacts with a search string
   */
  searchForPhoneNumbers?: (searchString: string) => TypedPhoneNumber[];
  /**
   * get match phoneNumber
   */
  matchContactsByPhoneNumber?: (phoneNumber: string) => TypedContact[];
  /**
   * sync source data
   */
  sync?: (...args: any) => Promise<void>;
}
