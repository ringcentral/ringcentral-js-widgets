import type { AddressBookBulkContactAddressInfo } from './AddressBookBulkContactAddressInfo';

// Contact resource
export interface AddressBookBulkContactResource {
  /**
   * Email of a contact
   * Example: charlie.williams@example.com
   */
  email: string;
  /**
   * Notes for a contact
   * Example: #1 Customer
   */
  notes: string;
  /**
   * Company name of a contact
   * Example: Example, Inc.
   */
  company: string;
  /**
   * First name of a contact
   * Example: Charlie
   */
  firstName: string;
  /**
   * Last name of a contact
   * Example: Williams
   */
  lastName: string;
  /**
   * Job title of a contact
   * Example: CEO
   */
  jobTitle: string;
  /**
   * Date of birth of a contact
   * Format: date-time
   */
  birthday: string;
  /**
   * Link to a contact home page
   * Example: http://www.example.com
   */
  webPage: string;
  /**
   * Middle name of a contact
   * Example: J
   */
  middleName: string;
  /**
   * Nick name of a contact
   * Example: The Boss
   */
  nickName: string;
  /**
   * Second email of a contact
   * Example: charlie.williams2@example.com
   */
  email2: string;
  /**
   * Third email of a contact
   * Example: charlie.williams3@example.com
   */
  email3: string;
  /**
   * Home phone number of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  homePhone: string;
  /**
   * 2nd home phone number of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  homePhone2: string;
  /**
   * Business phone of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  businessPhone: string;
  /**
   * 2nd business phone of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  businessPhone2: string;
  /**
   * Mobile phone of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  mobilePhone: string;
  /**
   * Business fax number of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  businessFax: string;
  /**
   * Company number of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  companyPhone: string;
  /**
   * Phone number of a contact assistant in e.164 (with "+") format
   * Example: +15551234567
   */
  assistantPhone: string;
  /**
   * Car phone number of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  carPhone: string;
  /**
   * Other phone number of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  otherPhone: string;
  /**
   * Other fax number of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  otherFax: string;
  /**
   * Callback phone number of a contact in e.164 (with "+") format
   * Example: +15551234567
   */
  callbackPhone: string;
  /**
   */
  businessAddress: AddressBookBulkContactAddressInfo;
  /**
   */
  homeAddress: AddressBookBulkContactAddressInfo;
  /**
   */
  otherAddress: AddressBookBulkContactAddressInfo;
}
