import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitorV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Presence } from '@ringcentral-integration/commons/modules/PresenceV2';
import { QuickAccess } from '@ringcentral-integration/commons/modules/QuickAccessV2';
import { UserGuide } from '@ringcentral-integration/commons/modules/UserGuideV2';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';

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
