export interface GetCountryInfoDictionaryResponse {
  /**
   * Internal identifier of a country
   */
  id: string;
  /**
   * Canonical URI of a country
   */
  uri: string;
  /**
   * Country calling code defined by ITU-T recommendations [E.123](https://www.itu.int/rec/T-REC-E.123-200102-I/en) and [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I)
   */
  callingCode: string;
  /**
   * Emergency calling feature availability/emergency address requirement indicator
   */
  emergencyCalling: boolean;
  /**
   * Country code according to the ISO standard, see [ISO 3166](https://www.iso.org/iso-3166-country-codes.html)
   */
  isoCode: string;
  /**
   * Official name of a country
   */
  name: string;
  /**
   * Determines whether phone numbers are available for a country
   */
  numberSelling: boolean;
  /**
   * Specifies whether login with the phone numbers of this country is enabled or not
   */
  loginAllowed: boolean;
  /**
   * Indicates whether signup/billing is allowed for a country
   */
  signupAllowed: boolean;
  /**
   * Specifies if free phone line for softphone is available for a country or not
   */
  freeSoftphoneLine: boolean;
}
