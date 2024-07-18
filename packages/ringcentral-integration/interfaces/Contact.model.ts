import type ContactResource from '@rc-ex/core/lib/definitions/ContactResource';
import type PersonalContactResource from '@rc-ex/core/lib/definitions/PersonalContactResource';
import type PhoneNumberResource from '@rc-ex/core/lib/definitions/PhoneNumberResource';
import type PresenceInfoResponse from '@rc-ex/core/lib/definitions/PresenceInfoResponse';

export interface ContactGroup {
  caption: string;
  contacts: IContact[];
  id: string;
}

export type ContactPhoneNumber = {
  phoneNumber?: string;
  phoneType?: string;
  hidden?: boolean;
} & PhoneNumberResource;

export interface IContact extends Omit<ContactResource, 'type'> {
  id: string;
  type: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phoneNumber?: string;
  phoneNumbers?: ContactPhoneNumber[];
  email?: string;
  emails?: string[];
  hasProfileImage?: boolean;
  extensionNumber?: string;
  profileImageUrl?: string;
  hidden?: boolean;
  isCallQueueNumber?: boolean;
  presence?: ContactPresence | null;
}

export interface TypedPhoneNumber {
  id: string;
  name: string;
  type: string;
  phoneNumber: string;
  phoneType: string;
  contactId: string;
  profileImageUrl?: string;
  entityType: string;
  isCallQueueNumber: boolean;
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
  | 'dndStatus'
  | 'presenceStatus'
  | 'telephonyStatus'
  | 'userStatus'
  | 'meetingStatus'
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
  ) => ContactPresence | Promise<ContactPresence | null>;
  /**
   * get source profile image
   */
  getProfileImage?: (
    contact: IContact,
    useCache?: boolean,
  ) => Promise<string | null>;
  /**
   * find contact by id
   */
  findContact?: (
    contactId: string,
  ) => IContact | Promise<IContact | undefined> | undefined;
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
