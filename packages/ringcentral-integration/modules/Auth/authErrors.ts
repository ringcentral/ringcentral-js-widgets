import type { ApiError } from '@ringcentral/sdk';

import { type AuthMessage, authMessages } from './authMessages';

export interface Solutions {
  logout?: boolean;
  alert?: AuthMessage;
}

export type AuthErrorConfig = [
  httpCode: number,
  errorCode: string,
  solutions?: Solutions,
  endpoints?: RegExp[],
];

/**
 * Authentication related error codes
 * https://developers.ringcentral.com/guide/basics/errors
 */
export const AUTH_ERRORS: Record<string, AuthErrorConfig> = {
  /**
   * 'Parameter [brandId] is invalid'
   */
  'OAU-101': [
    403,
    'OAU-101',
    { logout: true, alert: authMessages.accessDenied },
  ],

  /**
   * 'Unable to issue authorization code'
   */
  'OAU-102': [403, 'OAU-102', { alert: authMessages.accessDenied }],

  /**
   * 'Login for ${extensionType} extension is not allowed.'
   */
  'OAU-105': [403, 'OAU-105', { alert: authMessages.accessDenied }],

  /**
   * 'Invalid authorization code'
   */
  'OAU-106': [403, 'OAU-106', { alert: authMessages.accessDenied }],

  /**
   * 'Authorization code is expired'
   */
  'OAU-108': [403, 'OAU-108', { alert: authMessages.accessDenied }],

  /**
   * 'Redirect URIs do not match'
   */
  'OAU-109': [403, 'OAU-109', { alert: authMessages.accessDenied }],

  /**
   * 'Authorization code was not issued for this application'
   */
  'OAU-110': [403, 'OAU-110', { alert: authMessages.accessDenied }],

  /**
   * 'Request parameter duplication detected'
   */
  'OAU-111': [400, 'OAU-111', { alert: authMessages.accessDenied }],

  /**
   * 'The client is unauthorized for the required grant type: [${grant_type}]',
   */
  'OAU-112': [403, 'OAU-112', { alert: authMessages.accessDenied }],

  /**
   * 'No redirect uri is registered for the client'
   */
  'OAU-113': [403, 'OAU-113', { alert: authMessages.accessDenied }],

  /**
   * 'Invalid authorization method'
   */
  'OAU-116': [403, 'OAU-116', { alert: authMessages.accessDenied }],

  /**
   * 'The scope of requesting application cannot be narrower than the target application'
   */
  'OAU-117': [403, 'OAU-117', { alert: authMessages.accessDenied }],

  /**
   * 'International Virtual number cannot be used to login'
   */
  'OAU-119': [403, 'OAU-119', { alert: authMessages.accessDenied }],

  /**
   * 'Wrong Application ID'
   */
  'OAU-120': [401, 'OAU-120', { alert: authMessages.internalError }],

  /**
   * 'Wrong Application'
   */
  'OAU-121': [401, 'OAU-121', { alert: authMessages.internalError }],

  /**
   * 'Invalid Authorization header value: ${parameter}'
   */
  'OAU-123': [401, 'OAU-123', { alert: authMessages.internalError }],

  /**
   * 'Grant type is not allowed for application.'
   */
  'OAU-125': [401, 'OAU-125', { alert: authMessages.internalError }],

  /**
   * 'Invalid application release.'
   */
  'OAU-127': [401, 'OAU-127', { alert: authMessages.internalError }],

  /**
   * 'Access token expired.'
   */
  'OAU-128': [401, 'OAU-128', {}],

  /**
   * 'Access token corrupted.'
   */
  'OAU-129': [401, 'OAU-129', {}],

  /**
   * 'Invalid Authorization header.'
   */
  'OAU-134': [401, 'OAU-134', { alert: authMessages.internalError }],

  /**
   * 'Extension not found.'
   */
  'OAU-136': [
    401,
    'OAU-136',
    { logout: true, alert: authMessages.internalError },
  ],

  /**
   * 'Invalid resource owner credentials.'
   */
  'OAU-140': [401, 'OAU-140', { alert: authMessages.internalError }],

  /**
   * 'Login for extension in current state is not allowed.'
   */
  'OAU-141': [
    401,
    'OAU-141',
    { logout: true, alert: authMessages.internalError },
    [/\/restapi\/oauth\/token$/i], // matches "*/restapi/oauth/token"
  ],

  /**
   * 'Login to account in current state is not allowed.'
   */
  'OAU-142': [
    401,
    'OAU-142',
    { logout: true, alert: authMessages.internalError },
    [/\/restapi\/oauth\/token$/i], // matches "*/restapi/oauth/token"
  ],

  /**
   * 'Invalid client credentials'
   */
  'OAU-146': [401, 'OAU-146', { alert: authMessages.internalError }],

  /**
   * 'The account is locked out due to multiple unsuccessful logon attempts.'
   */
  'OAU-147': [400, 'OAU-147', { alert: authMessages.internalError }],

  /**
   * 'The account is locked out due to multiple unsuccessful logon attempts. Please use Single Sign-on way to authenticate.'
   */
  'OAU-148': [400, 'OAU-148', { alert: authMessages.internalError }],

  /**
   * 'Unparsable access token'
   */
  'OAU-149': [401, 'OAU-149', { alert: authMessages.internalError }],

  /**
   * 'The value of query parameter [${queryParameterName}] should be equal to parameter [${requestParameterName}] in request body'
   */
  'OAU-150': [400, 'OAU-150', { alert: authMessages.internalError }],

  /**
   * 'Authorization method not supported'
   */
  'OAU-151': [401, 'OAU-151', { alert: authMessages.internalError }],

  /**
   * 'Password grant is not allowed because MFA is required.'
   */
  'OAU-168': [401, 'OAU-168', { alert: authMessages.internalError }],

  /**
   * 'Token not found'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-213': [
    -1,
    'OAU-213',
    { logout: true, alert: authMessages.internalError },
    [/\/restapi\/oauth\/token$/i], // matches "*/restapi/oauth/token"
  ],

  /**
   * 'Extension not found'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-232': [
    -1,
    'OAU-232',
    { logout: true, alert: authMessages.internalError },
  ],

  /**
   * 'Extension is disabled or frozen'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-236': [
    -1,
    'OAU-236',
    { logout: true, alert: authMessages.internalError },
  ],

  /**
   * 'Sandbox client is not allowed: ${client_id}'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-165': [-1, 'OAU-165', { alert: authMessages.internalError }],

  /**
   * 'Account does not exist'
   * - https://rc-wiki-domian/pages/viewpage.action?pageId=476097866
   */
  'OAU-222': [
    -1,
    'OAU-222',
    { logout: true, alert: authMessages.internalError },
  ],

  /**
   * 'Site access forbidden'
   * - Migrate from old implementation
   */
  'OAU-167': [
    403,
    'OAU-167',
    { logout: true, alert: authMessages.siteAccessForbidden },
  ],
};

export type ResponseErrorCode = keyof typeof AUTH_ERRORS;

export interface ResponseErrorInfo {
  errorCode: ResponseErrorCode;
  message: string;
  additionalInfo?: string;
}

export const matchKnownRequestErrors = async (apiError: ApiError) => {
  const matches: AuthErrorConfig[] = [];
  if (apiError.response) {
    const url = apiError.request?.url ?? apiError.response?.url;
    // try to parse the response to get error code
    try {
      // clone the response to process to avoid affecting other error handling logic
      (
        (await apiError.response.clone().json()) as {
          errors?: ResponseErrorInfo[];
        }
      ).errors?.forEach((err) => {
        const errorConfig = AUTH_ERRORS[err.errorCode];
        if (errorConfig) {
          const [, , , endpoints] = errorConfig;
          if (
            !endpoints?.length ||
            endpoints.some((endpoint) => endpoint.test(url))
          ) {
            matches.push(errorConfig);
          }
        }
      });
    } catch (_) {
      // ignore
    }
  }

  return matches;
};
