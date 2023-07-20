import type { Auth } from '@ringcentral-integration/commons/modules/Auth';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Presence } from '@ringcentral-integration/commons/modules/Presence';
import type { QuickAccess } from '@ringcentral-integration/commons/modules/QuickAccess';
import type { UserGuide } from '@ringcentral-integration/commons/modules/UserGuide';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

import type { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  auth: Auth;
  callMonitor: CallMonitor;
  routerInteraction: RouterInteraction;
  locale: Locale;
  webphone: Webphone;
  presence: Presence;
  userGuide?: UserGuide;
  quickAccess?: QuickAccess;
  brand?: Brand;
}
