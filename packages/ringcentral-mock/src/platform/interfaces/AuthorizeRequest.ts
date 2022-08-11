// Request body for operation authorize
export interface AuthorizeRequest {
  /**
   * Determines authorization flow: **code** - Authorization Code, **token** - Implicit Grant
   * Required
   */
  response_type: 'code' | 'token';
  /**
   * This is a callback URI which determines where the response is sent. The value of this parameter must exactly match one of the URIs you have provided for your app upon registration
   * Required
   */
  redirect_uri: string;
  /**
   * Identifier (key) of a client application
   * Required
   */
  client_id: string;
  /**
   * Client state. Returned back to the client at the end of the flow
   */
  state: string;
  /**
   * Brand identifier. If it is not provided in request, server will try to determine brand from client app profile. The default value is '1210' - RingCentral US
   */
  brand_id: string;
  /**
   * Style of login form. The default value is 'page'. The 'popup' and 'touch' values are featured for mobile applications
   */
  display: 'page' | 'popup' | 'touch' | 'mobile';
  /**
   * Specifies which login form will be displayed. Space-separated set of the following values: 'login' - official RingCentral login form, 'sso' - Single Sign-On login form, 'consent' - form to show the requested scope and prompt user for consent. Either 'login' or 'sso' (or both) must be specified. The default value is 'login&sso'
   */
  prompt: 'login' | 'sso' | 'consent';
  /**
   * Localization code of a language. Overwrites 'Accept-Language' header value
   */
  localeId: string;
  /**
   * Localization code of a language. Overwrites 'localeId' parameter value
   */
  ui_locales: string;
  /**
   * User interface options data
   */
  ui_options:
    | 'hide_logo'
    | 'hide_tos'
    | 'hide_remember_me'
    | 'external_popup'
    | 'old_ui';
  /**
   */
  scope: string;
  /**
   */
  accept_language: string;
  /**
   */
  request: string;
  /**
   */
  request_uri: string;
  /**
   */
  nonce: string;
  /**
   */
  code_challenge: string;
  /**
   */
  code_challenge_method: 'plain' | 'S256';
  /**
   */
  discovery: boolean;
}
