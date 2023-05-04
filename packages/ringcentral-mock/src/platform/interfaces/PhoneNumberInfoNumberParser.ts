import { GetCountryInfoNumberParser } from './GetCountryInfoNumberParser';

export interface PhoneNumberInfoNumberParser {
  /**
   * Area code of location. The portion of the [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) number that identifies a specific geographic region/numbering area of the national numbering plan (NANP); that can be summarized as `NPA-NXX-xxxx` and covers Canada, the United States, parts of the Caribbean Sea, and some Atlantic and Pacific islands. See [North American Numbering Plan] (https://en.wikipedia.org/wiki/North_American_Numbering_Plan) for details
   */
  areaCode: string;
  /**
   */
  country: GetCountryInfoNumberParser;
  /**
   * Dialing format of a phone number
   */
  dialable: string;
  /**
   * Phone number [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format
   */
  e164: string;
  /**
   * International format of a phone number
   */
  formattedInternational: string;
  /**
   * Domestic format of a phone number
   */
  formattedNational: string;
  /**
   * One of the numbers to be parsed, passed as a string in response
   */
  originalString: string;
  /**
   * 'True' if the number is in a special format (for example N11 code)
   */
  special: boolean;
  /**
   * Phone number [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format without plus sign ('+')
   */
  normalized: string;
  /**
   * Specifies if a phone number is toll free or not
   */
  tollFree: boolean;
  /**
   * Sub-Address. The portion of the number that identifies a subscriber into the subscriber internal (non-public) network.
   */
  subAddress: string;
  /**
   * Subscriber number. The portion of the [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) number that identifies a subscriber in a network or numbering area.
   */
  subscriberNumber: string;
  /**
   * DTMF (Dual Tone Multi-Frequency) postfix
   */
  dtmfPostfix: string;
}
