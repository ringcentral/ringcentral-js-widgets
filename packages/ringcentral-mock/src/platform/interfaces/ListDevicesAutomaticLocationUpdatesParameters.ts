// Query parameters for operation listDevicesAutomaticLocationUpdates
export interface ListDevicesAutomaticLocationUpdatesParameters {
  /**
   * Internal identifier of a site. To filter devices of Main Site (Company) `main-site` must be specified. Supported only If Multi-Site feature is enabled for the account
   */
  siteId: string;
  /**
   * Filters entries by their status of Automatic Location Updates feature
   */
  featureEnabled: boolean;
  /**
   * Internal identifier of a device model for filtering. Multiple values are supported
   */
  model: string;
  /**
   * Filters devices which support HELD protocol
   */
  compatibleOnly: boolean;
  /**
   * Filters entries which have device name or model name containing the mentioned substring. The value should be split by spaces; the range is 0 - 64 characters, not case-sensitive. If empty the filter is ignored
   */
  searchString: string;
  /**
   * Comma-separated list of fields to order results prefixed by plus sign '+' (ascending order) or minus sign '-' (descending order). Supported values: 'name', 'modelName', 'siteName', 'featureEnabled'
   * Default: name
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
