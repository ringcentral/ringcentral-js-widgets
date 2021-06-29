import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { Brand } from '@ringcentral-integration/commons/modules/BrandV2';
import { Locale } from '@ringcentral-integration/commons/modules/LocaleV2';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';
import { RouterInteraction } from '../RouterInteraction';

export interface CallingSettingsUIOptions {
  /**
   * location searchable, default value is true.
   */
  locationSearchable?: boolean;
  /**
   * ringtone settings, default value is false.
   */
  ringtoneSettings?: boolean;
}

export interface Deps {
  callingSettings: CallingSettings;
  brand: Brand;
  locale: Locale;
  webphone?: Webphone;
  routerInteraction: RouterInteraction;
  callingSettingsUIOptions?: CallingSettingsUIOptions;
}
