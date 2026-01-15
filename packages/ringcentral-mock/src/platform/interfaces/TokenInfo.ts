export interface TokenInfo {
  /**
   * Access token to pass to subsequent API requests
   * Example: U1BCMDFUMDRKV1MwMXxzLFSvXdw5PHMsVLEn_MrtcyxUsw
   */
  access_token: string;
  /**
   * Issued access token TTL (time to live), in seconds
   * Example: 7199
   */
  expires_in: number;
  /**
   * Refresh token to get a new access token, when the issued one expires
   * Example: U1BCMDFUMDRKV1MwMXxzLFL4ec6A0XMsUv9wLriecyxS_w
   */
  refresh_token: string;
  /**
   * Issued refresh token TTL (time to live), in seconds
   * Example: 604799
   */
  refresh_token_expires_in: number;
  /**
   * List of permissions allowed with this access token, white-space separated
   * Example: 'EditAccounts ReadMessages Faxes ReadPresence EditCallLog Meetings VoipCalling ReadClientInfo Interoperability VideoInternal WebSocket SubscriptionPubNub SubscriptionWebSocket Contacts SubscriptionGCM EditExtensions TelephonySessions ProblemReportsManagement RingOut SMS InternalMessages EditMessages EditPresence SendUsageInfo'
   */
  scope: string;
  /**
   * Type of token. The only possible value supported is Bearer. This value should be used when specifying access token in `Authorization` header of subsequent API requests
   * Example: bearer
   */
  token_type: string;
  /**
   * Extension identifier
   * Example: 256440016
   */
  owner_id: string;
  /**
   * Application instance identifier
   * Example: 8zXq6oaLT7WvwWITlGiA1A
   */
  endpoint_id: string;
  /**
   */
  id_token: string;
}
