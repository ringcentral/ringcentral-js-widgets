import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

import type { RouterInteraction } from '../RouterInteraction';

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
