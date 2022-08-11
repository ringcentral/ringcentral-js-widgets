import { ActiveCallControl } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';

import { RouterInteraction } from '../RouterInteraction';

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
