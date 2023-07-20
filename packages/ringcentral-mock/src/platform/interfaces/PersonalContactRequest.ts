import type { ContactAddressInfo } from './ContactAddressInfo';

export interface PersonalContactRequest {
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
   * Company name of the contact
   * Example: Example, Inc.
   */
  company: string;
  /**
   * Job title of the contact
   * Example: CEO
   */
  jobTitle: string;
  /**
   * Email of the contact
   * Example: charlie.williams@example.com
   */
  email: string;
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
   * Notes for the contact
   * Example: #1 Customer
   */
  notes: string;
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
  homeAddress: ContactAddressInfo;
  /**
   */
  businessAddress: ContactAddressInfo;
  /**
   */
  otherAddress: ContactAddressInfo;
  /**
   * Contact ringtone. Max number of symbols is 64
   */
  ringtoneIndex: string;
}
