// Query parameters for operation listCountries
export interface ListCountriesParameters {
  /**
   * Specifies whether login with the phone numbers of this country is enabled or not
   */
  loginAllowed: boolean;
  /**
   * Indicates whether signup/billing is allowed for a country. If not specified all countries are returned (according to other filters specified if any)
   */
  signupAllowed: boolean;
  /**
   * Specifies if RingCentral sells phone numbers of this country
   */
  numberSelling: boolean;
  /**
   * Indicates the page number to retrieve. Only positive number values are accepted
   * Default: 1
   */
  page: number;
  /**
   * Indicates the page size (number of items)
   * Default: 100
   */
  perPage: number;
  /**
   * Specifies if free phone line for softphone is available for a country or not
   */
  freeSoftphoneLine: boolean;
}
