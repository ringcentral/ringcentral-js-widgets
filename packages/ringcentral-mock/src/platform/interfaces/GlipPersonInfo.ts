export interface GlipPersonInfo {
  /**
   * Internal identifier of a user
   * Required
   */
  id: string;
  /**
   * First name of a user
   */
  firstName: string;
  /**
   * Last name of a user
   */
  lastName: string;
  /**
   * Email of a user
   */
  email: string;
  /**
   * Photo of a user
   */
  avatar: string;
  /**
   * Internal identifier of a company
   */
  companyId: string;
  /**
   * Time of creation in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Format: date-time
   */
  creationTime: string;
  /**
   * Time of the last modification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Format: date-time
   */
  lastModifiedTime: string;
}
