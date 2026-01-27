import type CountryInfoShortModel from '@rc-ex/core/lib/definitions/CountryInfoShortModel';
import type { RegionSettingsData } from '@ringcentral-integration/micro-auth/src/app/services';
import type RegionSettingsPanel from '@ringcentral-integration/widgets/components/RegionSettingsPanel';

export interface RegionSettingsViewOptions {
  component?: typeof RegionSettingsPanel;
}

export interface RegionSettingsViewPanelProps {
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
  canAreaCodeShow: (currentCountryCode: string) => boolean;
}

export interface RegionSettingsViewContainerProps {}

export interface RegionSettingsViewProps {
  //
}
