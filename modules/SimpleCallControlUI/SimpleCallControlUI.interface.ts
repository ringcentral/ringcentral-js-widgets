import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import type { ActiveCallControl } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

import type { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  activeCallControl: ActiveCallControl;
  regionSettings: RegionSettings;
  locale: Locale;
  brand: Brand;
  routerInteraction: RouterInteraction;
  accountInfo: AccountInfo;
}
export interface SimpleCallControlContainerProps {
  renderContactName?: (options: {
    sessionId: string;
    telephonySessionId: string;
  }) => string;
  params: {
    sessionId: string;
  };
}
