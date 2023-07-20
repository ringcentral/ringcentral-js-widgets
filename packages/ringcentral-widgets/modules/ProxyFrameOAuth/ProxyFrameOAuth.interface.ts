import type { RingCentralClient } from '@ringcentral-integration/commons/lib/RingCentralClient';

import type {
  Deps as BaseDeps,
  OAuthOptions as BaseOAuthOptions,
} from '../../lib/OAuthBase';
import type { RouterInteraction } from '../RouterInteraction';

export interface OAuthOptions extends BaseOAuthOptions {
  loginPath?: string;
  proxyUri?: string;
  defaultProxyRetry?: number;
  prefix?: string;
}

export interface Deps extends BaseDeps {
  client: RingCentralClient;
  routerInteraction: RouterInteraction;
  oAuthOptions?: OAuthOptions;
}
