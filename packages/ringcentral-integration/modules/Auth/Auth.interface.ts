import type BaseTokenInfo from '@rc-ex/core/lib/definitions/TokenInfo';
import type { LoginUrlOptions as SdkLoginUrlOptions } from '@ringcentral/sdk';

import type { RingCentralClient } from '../../lib/RingCentralClient';
import type { Alert } from '../Alert';
import type { Environment } from '../Environment';
import type { Locale } from '../Locale';
import type { RateLimiter } from '../RateLimiter';
import type { TabManager } from '../TabManager';

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
}

export interface Deps {
  client: RingCentralClient;
  alert: Alert;
  locale: Locale;
  tabManager?: TabManager;
  environment?: Environment;
  authOptions?: AuthOptions;
  rateLimiter?: RateLimiter;
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
