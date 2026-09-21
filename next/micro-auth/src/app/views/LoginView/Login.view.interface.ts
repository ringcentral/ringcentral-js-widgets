import type { ThemeType } from '@ringcentral-integration/micro-core/src/app/services';
import type { ReactNode } from 'react';

import type { AuthPage, AuthPageVariant } from './AuthPage';

export interface AuthPageTextOptions {
  title?: string;
  description?: string;
  signInButtonLabel?: string;
  newUserLabel?: string;
  tryForFreeLabel?: string;
}

export interface LoginViewOptions {
  component?: typeof AuthPage;
  /**
   * disabled default router guard, not listen to route change and redirect to login page.
   */
  disabledRouteGuard?: boolean;
  /**
   * if not set, will use the default route after login
   */
  routeAfterLogin?: string | boolean;
  /**
   * variant of the login page
   * @default 'hero'
   * @enum {string}
   * @values {hero, card}
   * @description {
   *   hero: hero variant of the login page
   *   card: card variant of the login page
   * }
   */
  variant?: AuthPageVariant;
  /**
   * get the text options for the login page
   * @returns {AuthPageTextOptions}
   * @description {
   *   title: title of the login page
   *   description: description of the login page
   *   signInButtonLabel: label of the sign in button
   *   newUserLabel: label of the new user button
   *   tryForFreeLabel: label of the try for free button
   * }
   */
  getAuthPageTexts?: () => AuthPageTextOptions;
  /**
   * if not set, will use the default signup url from brand config
   *
   * by default only `rc` brand will show the sign up button, and the signup url is from brand config
   */
  showSignUp?: boolean;
  /**
   * logoUrl of the login page, if not set, will use the default logo url from brand config
   */
  logoUrl?: string;
  /** Bottom footer link (e.g. Integration Console “Learn more” → admin guide). */
  footer?: ReactNode;
}

export interface LoginViewPanelProps
  extends
    Pick<LoginViewOptions, 'variant' | 'showSignUp'>,
    AuthPageTextOptions {
  brandName: string;
  appName: string;
  currentLocale: string;
  disabled: boolean;
  showSpinner: boolean;
  openOAuthPage: () => void;
  onSignUpButtonClick: () => void | null;
  // spring-ui only
  logoUrl?: string;
  /** Current Spring UI theme; drives hero dark-mode background when set. */
  themeType?: ThemeType;
}

export interface LoginContainerProps {
  version?: string;
  showSignUp?: boolean;
  onSignUpButtonClick?: () => void;
}

export interface LoginViewProps {
  children?: ReactNode;
}
