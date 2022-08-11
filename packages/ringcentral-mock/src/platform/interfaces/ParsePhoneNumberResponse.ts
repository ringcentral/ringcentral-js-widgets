import { GetCountryInfoNumberParser } from './GetCountryInfoNumberParser';
import { PhoneNumberInfoNumberParser } from './PhoneNumberInfoNumberParser';

export interface ParsePhoneNumberResponse {
  /**
   * Canonical URI of a resource
   */
  uri: string;
  /**
   * Required
   */
  homeCountry: GetCountryInfoNumberParser;
  /**
   * Parsed phone numbers data
   * Required
   */
  phoneNumbers: PhoneNumberInfoNumberParser[];
}
