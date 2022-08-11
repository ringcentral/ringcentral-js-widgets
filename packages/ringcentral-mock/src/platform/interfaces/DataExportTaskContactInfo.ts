// List of users whose data is collected. The following data will be exported: posts, tasks, events, etc. posted by the user(s); posts addressing the user(s) via direct and @Mentions; tasks assigned to the listed user(s). The list of 10 users per request is supported.
export interface DataExportTaskContactInfo {
  /**
   * Internal identifier of a contact
   */
  id: string;
  /**
   * Email address of a contact
   */
  email: string;
}
