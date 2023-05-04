// Query parameters for operation listContacts
export interface ListContactsParameters {
  /**
   * If specified, only contacts whose First name or Last name start with the mentioned substring are returned. Case-insensitive
   */
  startsWith: string;
  /**
   * Sorts results by the specified property
   */
  sortBy: ('FirstName' | 'LastName' | 'Company')[];
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
   */
  phoneNumber: string[];
}
