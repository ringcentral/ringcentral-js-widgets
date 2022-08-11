export interface CallMonitoringExtensionInfo {
  /**
   * Internal identifier of an extension. Only the following extension types are allowed: User, DigitalUser, VirtualUser, FaxUser, Limited
   */
  id: string;
  /**
   * Set of call monitoring group permissions granted to the specified extension. In order to remove the specified extension from a call monitoring group use an empty value
   */
  permissions: ('Monitoring' | 'Monitored')[];
}
