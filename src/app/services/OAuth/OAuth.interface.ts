import type { OAuthBaseOptions } from '../OAuthBase';

export interface OAuthOptions extends OAuthBaseOptions {
  loginPath?: string;
  restrictSameOriginRedirectUri?: boolean;
  prefix?: string;
  extraStateProps?: Record<string, any>;
}

export interface CombinedAuthState {
  now: number;
  uuid: string;
  prefix?: string;
  origin?: string;
}
