// Site data. If multi-site feature is turned on for the account, then ID of a site must be specified. In order to assign a wireless point to the main site (company) site ID should be set to `main-site`
export interface AutomaticLocationUpdatesSiteInfo {
  /**
   * Internal identifier of a site
   */
  id: string;
  /**
   * Link to a site resource
   */
  uri: string;
  /**
   * Name of a site
   */
  name: string;
  /**
   * Site code value. Returned only if specified
   */
  code: string;
}
