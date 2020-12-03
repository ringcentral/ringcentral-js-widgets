import { Auth } from '../AuthV2';
import { Webphone } from '../WebphoneV2';

export interface QuickAccessOptions {
  //
}

export interface Deps {
  auth: Auth;
  webphone: Webphone;
  quickAccessOptions?: QuickAccessOptions;
}
