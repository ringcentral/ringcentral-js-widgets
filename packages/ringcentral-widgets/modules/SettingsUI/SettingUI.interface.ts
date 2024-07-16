import type { BasePhone } from '@ringcentral-integration/commons/interfaces/BasePhone.interface';
import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import type { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import type { Auth } from '@ringcentral-integration/commons/modules/Auth';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import type { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { LocaleSettings } from '@ringcentral-integration/commons/modules/LocaleSettings';
import type { Presence } from '@ringcentral-integration/commons/modules/Presence';
import type { QuickAccess } from '@ringcentral-integration/commons/modules/QuickAccess';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import type { UserGuide } from '@ringcentral-integration/commons/modules/UserGuide';

// import { PresenceInfoModel } from '@ringcentral-integration/commons/interfaces/Presence.model';
import type { RouterInteraction } from '../RouterInteraction';

interface SettingsUIOptions {
  showRemoveMeetingWarning?: boolean;
  showTrackingIssue?: boolean;
}

export interface CPRClient {
  hasPermission: boolean;
}
export interface CPRClientUI {
  openCPRDialog: () => void;
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
  cPRClient?: CPRClient;
  cPRClientUI?: CPRClientUI;
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
