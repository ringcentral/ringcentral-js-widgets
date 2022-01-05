import { CountryInfo } from '@rc-ex/core/definitions';
import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import {
  RegionSettings,
  RegionSettingsData,
} from '@ringcentral-integration/commons/modules/RegionSettings';

import { RouterInteraction } from '../RouterInteraction';

export interface RegionSettingsUIOptions {}

export interface Deps {
  auth: Auth;
  locale: Locale;
  regionSettings: RegionSettings;
  routerInteraction: RouterInteraction;
  regionSettingsUIOptions?: RegionSettingsUIOptions;
}

export interface RegionSettingsUIPanelProps {
  availableCountries: (
    | CountryInfo
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
}

export interface RegionSettingsUIContainerProps {}
