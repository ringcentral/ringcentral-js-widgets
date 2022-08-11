import { Auth } from '../Auth';
import { Webphone } from '../Webphone';

export interface QuickAccessOptions {
  //
}

export interface Deps {
  auth: Auth;
  webphone: Webphone;
  quickAccessOptions?: QuickAccessOptions;
}
