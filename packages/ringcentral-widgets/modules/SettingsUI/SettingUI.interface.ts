import { BasePhone } from '@ringcentral-integration/commons/interfaces/BasePhone.interface';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfoV2';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfoV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { LocaleSettings } from '@ringcentral-integration/commons/modules/LocaleSettingsV2';
import { Presence } from '@ringcentral-integration/commons/modules/PresenceV2';
import { QuickAccess } from '@ringcentral-integration/commons/modules/QuickAccessV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { UserGuide } from '@ringcentral-integration/commons/modules/UserGuideV2';

// import { PresenceInfoModel } from '@ringcentral-integration/commons/interfaces/Presence.model';
import { RouterInteraction } from '../RouterInteraction';

interface SettingsUIOptions {
  //
}

export interface Deps {
  auth: Auth;
  brand: Brand;
  locale: Locale;
  version?: string;
  presence?: Presence;
  accountInfo: AccountInfo;
  extensionInfo: ExtensionInfo;
  regionSettings: RegionSettings;
  extensionFeatures: ExtensionFeatures;
  appFeatures: AppFeatures;
  routerInteraction: RouterInteraction;
  callingSettings?: CallingSettings;
  localeSettings?: LocaleSettings;
  quickAccess?: QuickAccess;
  userGuide?: UserGuide;
  settingsUIOptions?: SettingsUIOptions;
}

export interface SettingsContainerProps {
  phone: BasePhone;
  showRegion: boolean;
  showCalling: boolean;
  showAudio: boolean;
  showFeedback: boolean;
  showUserGuide: boolean;
  showPresenceSettings: boolean;
  showQuickAccess: boolean;
  params?: {
    showPresenceSettings?: boolean;
  };
  regionSettingsUrl?: string;
  callingSettingsUrl?: string;
  audioSettingsUrl?: string;
  feedbackSettingsUrl?: string;
}
