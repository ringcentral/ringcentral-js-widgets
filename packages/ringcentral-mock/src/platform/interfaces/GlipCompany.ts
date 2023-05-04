export interface GlipCompany {
  /**
   * Internal identifier of a Glip company (RC account)
   * Required
   */
  id: string;
  /**
   * Name of a company
   */
  name: string;
  /**
   * Domain name of a company
   */
  domain: string;
  /**
   * Datetime of creation in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Required
   */
  creationTime: string;
  /**
   * Datetime of last modification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Required
   */
  lastModifiedTime: string;
}
