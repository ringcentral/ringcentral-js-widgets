// Meeting host information
export interface HostInfoRequest {
  /**
   * Link to the meeting host resource
   */
  uri: string;
  /**
   * Internal identifier of an extension which is assigned to be a meeting host. The default value is currently logged-in extension identifier
   */
  id: string;
}
