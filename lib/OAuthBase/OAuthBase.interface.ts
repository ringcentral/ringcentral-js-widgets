import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { Auth } from '@ringcentral-integration/commons/modules/Auth';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type TabManager from '@ringcentral-integration/commons/modules/TabManager';
import type { LoginUrlOptions } from '@ringcentral/sdk';

export interface OAuthOptions
  extends Pick<LoginUrlOptions, 'redirectUri' | 'uiOptions'> {}

export interface Deps {
  locale: Locale;
  auth: Auth;
  alert: Alert;
  brand: Brand;
  oAuthOptions?: OAuthOptions;
  tabManager?: TabManager;
}
