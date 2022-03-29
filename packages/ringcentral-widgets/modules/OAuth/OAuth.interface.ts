import { RingCentralClient } from '@ringcentral-integration/commons/lib/RingCentralClient';

import {
  Deps as BaseDeps,
  OAuthOptions as BaseOAuthOptions,
} from '../../lib/OAuthBase';
import { RouterInteraction } from '../RouterInteraction';

export interface OAuthOptions extends BaseOAuthOptions {
  loginPath?: string;
  restrictSameOriginRedirectUri?: boolean;
  prefix?: string;
}

export interface Deps extends BaseDeps {
  client: RingCentralClient;
  routerInteraction: RouterInteraction;
  oAuthOptions?: OAuthOptions;
}
