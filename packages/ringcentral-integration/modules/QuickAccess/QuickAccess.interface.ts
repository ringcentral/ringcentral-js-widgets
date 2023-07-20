import type { Auth } from '../Auth';
import type { Webphone } from '../Webphone';

export interface QuickAccessOptions {
  //
}

export interface Deps {
  auth: Auth;
  webphone: Webphone;
  quickAccessOptions?: QuickAccessOptions;
}
