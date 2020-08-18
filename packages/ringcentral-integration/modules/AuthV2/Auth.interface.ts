import { TokenInfo as BaseTokenInfo } from '@rc-ex/core/definitions';
import Locale from '../Locale';
import Alert from '../Alert';
import TabManager from '../TabManager';
import Environment from '../Environment';

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
