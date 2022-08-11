// Query parameters for operation listCallMonitoringGroups
export interface ListCallMonitoringGroupsParameters {
  /**
   * Indicates the page number to retrieve. Only positive number values are allowed
   * Default: 1
   */
  page: number;
  /**
   * Indicates the page size (number of items)
   * Default: 100
   */
  perPage: number;
  /**
   * Internal identifier of an extension that is a member of every group within the result
   */
  memberExtensionId: string;
}
