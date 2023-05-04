import { Auth } from '@ringcentral-integration/commons/modules/Auth';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Presence } from '@ringcentral-integration/commons/modules/Presence';
import { QuickAccess } from '@ringcentral-integration/commons/modules/QuickAccess';
import { UserGuide } from '@ringcentral-integration/commons/modules/UserGuide';
import { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

import { RouterInteraction } from '../RouterInteraction';

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
