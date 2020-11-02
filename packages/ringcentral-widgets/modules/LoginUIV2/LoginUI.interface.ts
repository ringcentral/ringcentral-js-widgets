import { Auth } from 'ringcentral-integration/modules/AuthV2';
import ConnectivityMonitor from 'ringcentral-integration/modules/ConnectivityMonitor';
import Locale from 'ringcentral-integration/modules/Locale';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';

import OAuth from '../OAuth';

export interface Deps {
  auth: Auth;
  connectivityMonitor: ConnectivityMonitor;
  locale: Locale;
  oAuth: OAuth;
  rateLimiter: RateLimiter;
}

export interface GetLoginUIProps {
  version: string;
  showSignUp: boolean;
  onSignUpButtonClick?: Function;
}
