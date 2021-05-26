import {
  PresenceInfoResponse,
  PersonalContactResource,
  ContactResource,
  PhoneNumberResource,
} from '@rc-ex/core/definitions';

export interface ContactGroup {
  caption: string;
  contacts: IContact[];
  id: string;
}

export interface IContact extends ContactResource {
  id: string;
  type: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phoneNumber?: string;
  phoneNumbers?: ({
    phoneNumber?: string;
    phoneType?: string;
    hidden?: boolean;
  } & PhoneNumberResource)[];
  email?: string;
  emails?: string[];
  hasProfileImage?: boolean;
  extensionNumber?: string;
  profileImageUrl?: string;
  hidden?: boolean;
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

export type ContactPresence = Pick<
  PresenceInfoResponse,
  'dndStatus' | 'presenceStatus' | 'telephonyStatus' | 'userStatus'
>;

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
   * source contacts raw data
   */
  rawContacts: unknown[];
  /**
   * get source presence
   */
  getPresence?: (
    contact: IContact,
    useCache?: boolean,
  ) => ContactPresence | Promise<ContactPresence>;
  /**
   * get source profile image
   */
  getProfileImage?: (contact: IContact, useCache?: boolean) => Promise<string>;
  /**
   * find contact by id
   */
  findContact?: (contactId: string) => IContact | Promise<IContact>;
  /**
   * filter contacts
   */
  filterContacts?: (searchFilter: string) => IContact[] | Promise<IContact[]>;
  /**
   * get search contacts with a search string
   */
  searchForPhoneNumbers?: (
    searchString: string,
  ) => TypedPhoneNumber[] | Promise<TypedPhoneNumber[]>;
  /**
   * get match phoneNumber
   */
  matchContactsByPhoneNumber?: (
    phoneNumber: string,
  ) => TypedContact[] | Promise<TypedContact[]>;
  /**
   * sync source data
   */
  sync?: (...args: any) => Promise<void>;
}
