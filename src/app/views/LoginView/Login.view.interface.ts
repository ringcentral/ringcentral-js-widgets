import type { AuthPage } from '@ringcentral-integration/next-widgets/deprecated/Auth/AuthPage';
import type { AuthPage as NextAuthPage } from '@ringcentral-integration/next-widgets/pages/Auth/AuthPage';

import type { AuthPage as SpringAuthPage } from './AuthPage';

export interface LoginViewOptions {
  component?: typeof AuthPage | typeof NextAuthPage | typeof SpringAuthPage;
  /**
   * disabled default router guard, not listen to route change and redirect to login page.
   */
  disabledRouteGuard?: boolean;
  /**
   * if not set, will use the default route after login
   */
  routeAfterLogin?: string | boolean;
  getDescription?: () => string;
  welcomePicture?: React.ReactNode;
}

export interface LoginViewPanelProps {
  brandName: string;
  appName: string;
  currentLocale: string;
  disabled: boolean;
  showSpinner: boolean;
  openOAuthPage: () => void;
  onSignUpButtonClick: () => void | null;
  // spring-ui only
  logoUrl?: string;
  showSignUp: boolean;
  description?: string;
  welcomePicture?: React.ReactNode;
}

export interface LoginContainerProps {
  version?: string;
  showSignUp?: boolean;
  onSignUpButtonClick?: () => void;
}

export interface LoginViewProps {
  //
}
