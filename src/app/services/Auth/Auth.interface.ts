import type BaseTokenInfo from '@rc-ex/core/lib/definitions/TokenInfo';
import type { LoginUrlOptions as SdkLoginUrlOptions } from '@ringcentral/sdk';

import { AuthErrorConfig } from './authErrors';

export interface TokenInfo extends BaseTokenInfo {
  expire_time?: number;
  refresh_token_expire_time?: number;
}

export interface Token {
  ownerId?: TokenInfo['owner_id'];
  endpointId?: TokenInfo['endpoint_id'];
  accessToken?: TokenInfo['access_token'];
  tokenType?: TokenInfo['token_type'];
  expireTime?: TokenInfo['expire_time'];
  expiresIn?: TokenInfo['expires_in'];
  scope?: TokenInfo['scope'];
  refresh_token_expire_time?: TokenInfo['refresh_token_expire_time'];
}

export interface AuthOptions {
  usePKCE?: boolean;
  /**
   * Will using auth owner id as user storage key by default,
   *  set this to true if you want custom the user storage key in other module.
   *
   * always work with `_storage.getUserId` override
   */
  disabledAutoStorageUserId?: boolean;

  /**
   * Additional auth errors to be added to the default auth errors.
   * This is used to add custom auth errors to the default auth errors.
   * For example, if you want to add a custom auth error for a specific error code,
   * you can add it here.
   * @example
   * {
   *   'CAE-410': [401, 'CAE-410', { logout: false }],
   * }
   */
  additionalAuthErrors?: Record<string, AuthErrorConfig>;
}

export interface LoginOptions {
  username: string;
  password: string;
  extension: string;
  remember: boolean | number;
  code: string;
  redirectUri: string;
  accessToken: TokenInfo['access_token'];
  expiresIn: TokenInfo['expires_in'];
  endpointId: TokenInfo['endpoint_id'];
  tokenType: TokenInfo['token_type'];
  scope: TokenInfo['scope'];
  tokenUri: string;
  discoveryUri: string;
}

export interface LoginUrlOptions extends SdkLoginUrlOptions {
  redirectUri?: string;
  force?: boolean;
}

export interface BeforeLogoutHandler {
  (): Promise<unknown | void> | unknown | void;
}

export interface AfterLoggedInHandler {
  (): void;
}

export interface RefreshErrorHandler {
  (refreshTokenValid: boolean): Promise<void> | void;
}

export type RequestLog = {
  id: string;
  status?: number;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
  requestBody?: any;
  responseBody?: any;
  startTime?: number;
  endTime?: number;
  duration?: number;
  requestError?: string;
  // we currently cannot get accurate size because the the browser will return unzipped stream
  // size?: number;
};
