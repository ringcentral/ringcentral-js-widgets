import { TokenInfo as BaseTokenInfo } from '@rc-ex/core/definitions';
import { LoginUrlOptions as SdkLoginUrlOptions } from '@ringcentral/sdk';
import { Locale } from '../LocaleV2';
import { Alert } from '../AlertV2';
import { TabManager } from '../TabManagerV2';
import { Environment } from '../EnvironmentV2';

export interface TokenInfo extends BaseTokenInfo {
  expire_time?: number;
}

export interface Token {
  ownerId?: TokenInfo['owner_id'];
  endpointId?: TokenInfo['endpoint_id'];
  accessToken?: TokenInfo['access_token'];
  expireTime?: TokenInfo['expire_time'];
  expiresIn?: TokenInfo['expires_in'];
  scope?: TokenInfo['scope'];
}

export interface AuthOptions {
  usePKCE?: boolean;
}

export interface Deps {
  client: any;
  alert: Alert;
  locale: Locale;
  tabManager?: TabManager;
  environment?: Environment;
  authOptions?: AuthOptions;
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
