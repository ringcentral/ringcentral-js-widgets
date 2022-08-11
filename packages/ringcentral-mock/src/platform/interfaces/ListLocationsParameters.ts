// Query parameters for operation listLocations
export interface ListLocationsParameters {
  /**
   * Sorts results by the property specified
   * Default: City
   */
  orderBy: 'Npa' | 'City';
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
   * Internal identifier of a state
   */
  stateId: string;
  /**
   * Specifies if nxx codes are returned
   */
  withNxx: boolean;
}
