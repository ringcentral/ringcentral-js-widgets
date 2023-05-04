// Request body for operation getToken
export interface GetTokenRequest {
  /**
   * Phone number linked to an account or extension in E.164 format with or without leading '+' sign
   */
  username: string;
  /**
   * User's password
   * Format: password
   */
  password: string;
  /**
   * Optional. Extension short number. If company number is specified as a username, and extension is not specified, the server will attempt to authenticate client as main company administrator
   */
  extension: string;
  /**
   * Grant type
   * Default: password
   */
  grant_type:
    | 'authorization_code'
    | 'password'
    | 'refresh_token'
    | 'client_credentials'
    | 'urn:ietf:params:oauth:grant-type:jwt-bearer'
    | 'partner_jwt';
  /**
   * Authorization code
   */
  code: string;
  /**
   * This is a callback URI which determines where the response is sent. The value of this parameter must exactly match one of the URIs you have provided for your app upon registration
   */
  redirect_uri: string;
  /**
   * Access token lifetime in seconds
   * Maximum: 3600
   * Minimum: 600
   * Format: int64
   * Default: 3600
   */
  access_token_ttl: number;
  /**
   * Refresh token lifetime in seconds
   * Maximum: 604800
   * Format: int64
   * Default: 604800
   */
  refresh_token_ttl: number;
  /**
   * List of API permissions to be used with access token. Can be omitted when requesting all permissions defined during the application registration phase
   */
  scope: string;
  /**
   * Previously issued refresh token. This is the only formData field used for the Refresh Token Flow.
   */
  refresh_token: string;
  /**
   * The unique identifier of a client application. If not specified, the previously specified or auto generated value is used by default
   */
  endpoint_id: string;
  /**
   */
  pin: string;
  /**
   */
  client_id: string;
  /**
   */
  account_id: string;
  /**
   */
  partner_account_id: string;
  /**
   */
  client_assertion_type: string;
  /**
   */
  client_assertion: string;
  /**
   */
  assertion: string;
  /**
   */
  brand_id: string;
  /**
   */
  code_verifier: string;
}
