import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import ConnectivityMonitor from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiterV2';

import { OAuth } from '../OAuth';

export interface LoginUIOptions {}

export interface Deps {
  auth: Auth;
  connectivityMonitor: ConnectivityMonitor;
  locale: Locale;
  oAuth: OAuth;
  rateLimiter: RateLimiter;
  loginUIOptions?: LoginUIOptions;
}

export interface LoginUIPanelProps {
  currentLocale: string;
  disabled: boolean;
  showSpinner: boolean;
  onLoginButtonClick?: () => void;
}

export interface LoginContainerProps {
  version?: string;
  showSignUp?: boolean;
  onSignUpButtonClick?: () => void;
}
