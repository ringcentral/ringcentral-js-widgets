import type { Auth } from '@ringcentral-integration/commons/modules/Auth';
import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';

import type { OAuth } from '../OAuth';

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
