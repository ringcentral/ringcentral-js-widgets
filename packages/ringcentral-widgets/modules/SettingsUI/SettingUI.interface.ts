import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Presence } from '@ringcentral-integration/commons/modules/PresenceV2';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfoV2';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfoV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettingsV2';
import { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { LocaleSettings } from '@ringcentral-integration/commons/modules/LocaleSettingsV2';
import { QuickAccess } from '@ringcentral-integration/commons/modules/QuickAccessV2';
import { UserGuide } from '@ringcentral-integration/commons/modules/UserGuideV2';
import { BasePhone } from '@ringcentral-integration/commons/interfaces/BasePhone.interface';
import { PresenceInfoModel } from '@ringcentral-integration/commons/interfaces/Presence.model';
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

export interface SettingsPanelProps {
  version: string;
  loginNumber: string;
  showFeedback: boolean;
  showQuickAccess: boolean;
  showSpinner: boolean;
  showCalling: boolean;
  showAudio: boolean;
  showRegion: boolean;
  currentLocale: string;
  brandId: string;
  ringoutEnabled: boolean;
  outboundSMS: boolean;
  isCallQueueMember: boolean;
  dndStatus: PresenceInfoModel['dndStatus'];
  userStatus: PresenceInfoModel['userStatus'];
  openPresenceSettings: boolean;
  showPresenceSettings: boolean;
  supportedLocales: string[];
  savedLocale: string;
  showUserGuide: boolean;
  onLogoutButtonClick(): Promise<void>;
  onRegionSettingsLinkClick(): void;
  onCallingSettingsLinkClick(): void;
  onAudioSettingsLinkClick(): void;
  onFeedbackSettingsLinkClick(): void;
  onUserGuideClick(): void;
  onQuickAccessLinkClick(): void;
  setAvailable: Presence['setAvailable'];
  setBusy: Presence['setBusy'];
  setDoNotDisturb: Presence['setDoNotDisturb'];
  setInvisible: Presence['setInvisible'];
  toggleAcceptCallQueueCalls: Presence['toggleAcceptCallQueueCalls'];
  saveLocale?: LocaleSettings['saveLocale'];
}
