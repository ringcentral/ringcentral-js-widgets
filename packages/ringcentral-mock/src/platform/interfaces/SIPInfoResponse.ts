export interface SIPInfoResponse {
  /**
   * User credentials
   */
  username: string;
  /**
   * User password
   */
  password: string;
  /**
   * Identifier for SIP authorization
   */
  authorizationId: string;
  /**
   * SIP domain
   */
  domain: string;
  /**
   * SIP outbound proxy
   */
  outboundProxy: string;
  /**
   * SIP outbound IPv6 proxy
   */
  outboundProxyIPv6: string;
  /**
   * SIP outbound proxy backup
   */
  outboundProxyBackup: string;
  /**
   * SIP outbound IPv6 proxy backup
   */
  outboundProxyIPv6Backup: string;
  /**
   * Preferred transport. SIP info will be returned for this transport if supported
   */
  transport: 'UDP' | 'TCP' | 'TLS' | 'WS' | 'WSS';
  /**
   * For TLS transport only Base64 encoded certificate
   */
  certificate: string;
  /**
   * The interval in seconds after which the app must try to switch back to primary proxy if it was previously switched to backup. If this parameter is not returned, the app must stay on backup proxy and try to switch to primary proxy after the next SIP-provision call.
   */
  switchBackInterval: number;
}
