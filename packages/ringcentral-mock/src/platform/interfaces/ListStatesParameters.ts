// Query parameters for operation listStates
export interface ListStatesParameters {
  /**
   * If set to 'True' then states for all countries are returned and `countryId` is ignored, even if specified. If the value is empty then the parameter is ignored
   */
  allCountries: boolean;
  /**
   * Internal identifier of a country
   * Format: int64
   */
  countryId: number;
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
   * If 'True', the list of states with phone numbers available for buying is returned
   */
  withPhoneNumbers: boolean;
}
