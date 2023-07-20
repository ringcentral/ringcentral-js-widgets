import type CountryInfoShortModel from '@rc-ex/core/lib/definitions/CountryInfoShortModel';
import type { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import type { Auth } from '@ringcentral-integration/commons/modules/Auth';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type {
  RegionSettings,
  RegionSettingsData,
} from '@ringcentral-integration/commons/modules/RegionSettings';

import type { RouterInteraction } from '../RouterInteraction';

export interface RegionSettingsUIOptions {}

export interface Deps {
  auth: Auth;
  locale: Locale;
  regionSettings: RegionSettings;
  routerInteraction: RouterInteraction;
  appFeatures: AppFeatures;
  regionSettingsUIOptions?: RegionSettingsUIOptions;
}

export interface RegionSettingsUIPanelProps {
  availableCountries: (
    | CountryInfoShortModel
    | {
        id: string;
        isoCode: string;
        callingCode: string;
      }
  )[];
  countryCode: string;
  areaCode: string;
  currentLocale: string;
  onBackButtonClick: () => Promise<void>;
  onSave: (args_0: RegionSettingsData) => Promise<void>;
  onLogoutButtonClick: () => Promise<void>;
  canAreaCodeShow: (currentCountryCode: string) => boolean;
}

export interface RegionSettingsUIContainerProps {}
