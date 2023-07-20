import type { ContactAddressInfo } from './ContactAddressInfo';

export interface PersonalContactResource {
  /**
   * Canonical URI of the contact
   * Example: https://platform.devtest.ringcentral.com/restapi/v1.0/account/230919004/extension/230919004/address-book/contact/623045004
   */
  uri: string;
  /**
   * This property has a special meaning only on Address Book Sync (e.g. a contact can be `Deleted`). For simple contact list reading it has always the default value - `Alive`
   */
  availability: 'Alive' | 'Deleted' | 'Purged';
  /**
   * Email of the contact
   * Example: charlie.williams@example.com
   */
  email: string;
  /**
   * Internal identifier of the contact
   * Format: int64
   * Example: 623045004
   */
  id: number;
  /**
   * Notes for the contact
   * Example: #1 Customer
   */
  notes: string;
  /**
   * Company name of the contact
   * Example: Example, Inc.
   */
  company: string;
  /**
   * First name of the contact
   * Example: Charlie
   */
  firstName: string;
  /**
   * Last name of the contact
   * Example: Williams
   */
  lastName: string;
  /**
   * Job title of the contact
   * Example: CEO
   */
  jobTitle: string;
  /**
   * Date of birth of the contact
   * Format: date-time
   */
  birthday: string;
  /**
   * The contact home page URL
   * Example: http://www.example.com
   */
  webPage: string;
  /**
   * Middle name of the contact
   * Example: J
   */
  middleName: string;
  /**
   * Nick name of the contact
   * Example: The Boss
   */
  nickName: string;
  /**
   * 2nd email of the contact
   * Example: charlie-example@gmail.com
   */
  email2: string;
  /**
   * 3rd email of the contact
   * Example: theboss-example@hotmail.com
   */
  email3: string;
  /**
   * Home phone number of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  homePhone: string;
  /**
   * 2nd home phone number of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  homePhone2: string;
  /**
   * Business phone of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  businessPhone: string;
  /**
   * 2nd business phone of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  businessPhone2: string;
  /**
   * Mobile phone of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  mobilePhone: string;
  /**
   * Business fax number of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  businessFax: string;
  /**
   * Company number of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  companyPhone: string;
  /**
   * Phone number of the contact assistant in e.164 (with "+") format
   * Example: +15551234567
   */
  assistantPhone: string;
  /**
   * Car phone number of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  carPhone: string;
  /**
   * Other phone number of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  otherPhone: string;
  /**
   * Other fax number of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  otherFax: string;
  /**
   * Callback phone number of the contact in e.164 (with "+") format
   * Example: +15551234567
   */
  callbackPhone: string;
  /**
   */
  businessAddress: ContactAddressInfo;
  /**
   */
  homeAddress: ContactAddressInfo;
  /**
   */
  otherAddress: ContactAddressInfo;
  /**
   * Contact ringtone. Max number of symbols is 64
   */
  ringtoneIndex: string;
}
