// TODO
// Once transform OAuth module to TS, export this from index.ts?
export interface OAuthOptions {
  redirectUri?: string;
  loginPath?: string;
  restrictSameOriginRedirectUri?: boolean;
}
