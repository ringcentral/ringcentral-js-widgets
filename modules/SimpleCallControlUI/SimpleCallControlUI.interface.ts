import { ActiveCallControl } from '@ringcentral-integration/commons/modules/ActiveCallControlV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettingsV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  activeCallControl: ActiveCallControl;
  regionSettings: RegionSettings;
  locale: Locale;
  brand: Brand;
  routerInteraction: RouterInteraction;
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
