import { ActiveCallControl } from 'ringcentral-integration/modules/ActiveCallControlV2';
import { RegionSettings } from 'ringcentral-integration/modules/RegionSettingsV2';
import { Locale } from 'ringcentral-integration/modules/LocaleV2';
import { Brand } from 'ringcentral-integration/modules/BrandV2';
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
