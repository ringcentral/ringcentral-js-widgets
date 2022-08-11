// Query parameters for operation listWirelessPoints
export interface ListWirelessPointsParameters {
  /**
   * Internal identifier of a site. To filter Main Site (Company) 'main-site' must be specified. Supported only If multi-site feature is enabled for the account
   */
  siteId: string;
  /**
   * Filters entries by the specified substring (search by chassis ID, switch name or address) The characters range is 0-64 (if empty the filter is ignored)
   */
  searchString: string;
  /**
   * Comma-separated list of fields to order results prefixed by '+' sign (ascending order) or '-' sign (descending order). The default sorting is by `name`
   */
  orderBy: string;
  /**
   * Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page
   */
  perPage: number;
  /**
   * Indicates the page number to retrieve. Only positive number values are supported
   * Default: 1
   */
  page: number;
}
