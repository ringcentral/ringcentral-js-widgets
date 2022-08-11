export interface CallMonitoringGroupMemberInfo {
  /**
   * Link to a call monitoring group member
   */
  uri: string;
  /**
   * Internal identifier of a call monitoring group member
   */
  id: string;
  /**
   * Extension number of a call monitoring group member
   */
  extensionNumber: string;
  /**
   */
  permissions: ('Monitoring' | 'Monitored')[];
}
