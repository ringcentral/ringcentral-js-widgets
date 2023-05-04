import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import { loginStatus } from '@ringcentral-integration/commons/modules/Auth';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import { SettingsPanelProps } from '../../components/SettingsPanel/SettingsPanel.interface';
import { Deps, SettingsContainerProps } from './SettingUI.interface';

const DEFAULT_REGION_SETTINGS_URL = '/settings/region';
const DEFAULT_CALLING_SETTINGS_URL = '/settings/calling';
const DEFAULT_AUDIO_SETTINGS_URL = '/settings/audio';
const DEFAULT_FEEDBACK_SETTINGS_URL = '/settings/feedback';

@Module({
  name: 'SettingsUI',
  deps: [
    'Auth',
    'Brand',
    'Locale',
    'AccountInfo',
    'ExtensionInfo',
    'RegionSettings',
    'ExtensionFeatures',
    'AppFeatures',
    'RouterInteraction',
    {
      dep: 'CPRClient',
      optional: true,
    },
    {
      dep: 'CPRClientUI',
      optional: true,
    },
    {
      dep: 'Version',
      optional: true,
    },
    {
      dep: 'Presence',
      optional: true,
    },
    {
      dep: 'CallingSettings',
      optional: true,
    },
    {
      dep: 'LocaleSettings',
      optional: true,
    },
    {
      dep: 'QuickAccess',
      optional: true,
    },
    {
      dep: 'UserGuide',
      optional: true,
    },
    {
      dep: 'SettingsUIOptions',
      optional: true,
    },
  ],
})
export class SettingsUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor({
    storageKey,
    enableCache,
    deps,
    ...options
  }: {
    storageKey?: string;
    enableCache?: boolean;
    deps?: T;
  }) {
    super({
      deps: deps || (options as T),
      storageKey,
      enableCache,
    });
  }

  getUIProps({
    showCalling = true,
    showAudio = true,
    showFeedback = true,
    showUserGuide = true,
    showPresenceSettings = true,
    showQuickAccess = false,
    params,
  }: SettingsContainerProps): UIProps<SettingsPanelProps> {
    let loginNumber = this._deps.brand.name;
    const loggedIn = this._deps.auth.loginStatus === loginStatus.loggedIn;
    if (
      loggedIn &&
      this._deps.accountInfo.ready &&
      this._deps.extensionInfo.ready &&
      this._deps.accountInfo.mainCompanyNumber
    ) {
      // If no extensionNumber, extensionNumber field needs to be omitted
      const extensionNumber =
        this._deps.extensionInfo.extensionNumber &&
        this._deps.extensionInfo.extensionNumber !== '0'
          ? this._deps.extensionInfo.extensionNumber
          : null;
      const phoneNumber = [
        this._deps.accountInfo.mainCompanyNumber,
        extensionNumber,
      ].join('*');
      // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
      loginNumber = formatNumber({
        phoneNumber,
        countryCode: this._deps.regionSettings.countryCode,
        areaCode: this._deps.regionSettings.areaCode,
      });
    }
    return {
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      version: this._deps.version,
      loginNumber,
      showFeedback,
      showQuickAccess,
      showSpinner: !(
        this._deps.accountInfo.ready &&
        this._deps.auth.ready &&
        loggedIn &&
        this._deps.extensionInfo.ready &&
        this._deps.locale.ready &&
        this._deps.regionSettings.ready &&
        (!this._deps.callingSettings || this._deps.callingSettings.ready) &&
        this._deps.appFeatures.ready &&
        (!this._deps.presence || this._deps.presence.ready) &&
        (!this._deps.localeSettings || this._deps.localeSettings.ready)
      ),
      showCalling:
        showCalling &&
        this._deps.callingSettings &&
        this._deps.appFeatures.isCallingEnabled,
      showAudio: showAudio && this._deps.appFeatures.isCallingEnabled,
      showRegion:
        loggedIn &&
        this._deps.regionSettings.showRegionSettings &&
        this._deps.appFeatures.isCallingEnabled,
      currentLocale: this._deps.locale.currentLocale,
      // @ts-expect-error TS(2322): Type 'string | { translations: { [x: string]: stri... Remove this comment to see the full error message
      eulaLabel: this._deps.brand.brandConfig.eulaLabel,
      // @ts-expect-error TS(2322): Type 'URL | { translations: { [x: string]: string;... Remove this comment to see the full error message
      eulaLink: this._deps.brand.brandConfig.eulaLink,
      outboundSMS:
        !!this._deps.appFeatures.hasOutboundSMSPermission ||
        !!this._deps.appFeatures.hasInternalSMSPermission,
      isCallQueueMember: this._deps.extensionInfo.isCallQueueMember,
      // @ts-expect-error TS(2322): Type '"TakeAllCalls" | "DoNotAcceptAnyCalls" | "Do... Remove this comment to see the full error message
      dndStatus: this._deps.presence?.dndStatus,
      // @ts-expect-error TS(2322): Type '"Offline" | "Busy" | "Available" | null | un... Remove this comment to see the full error message
      userStatus: this._deps.presence?.userStatus,
      openPresenceSettings: !!(
        this._deps.presence &&
        params &&
        params.showPresenceSettings
      ),
      showPresenceSettings:
        showPresenceSettings &&
        !!this._deps.extensionFeatures.features?.EditPresenceStatus?.available,
      supportedLocales: this._deps.localeSettings?.supportedLocales,
      savedLocale: this._deps.localeSettings?.savedLocale,
      showUserGuide: showUserGuide && !!this._deps.userGuide?.hasPermission,
      showReportIssue: this._deps.cPRClient?.hasPermission,
      brandConfig: this._deps.brand.brandConfig,
      showRemoveMeetingWarning:
        !!this._deps.settingsUIOptions?.showRemoveMeetingWarning,
    };
  }

  getUIFunctions({
    regionSettingsUrl = DEFAULT_REGION_SETTINGS_URL,
    callingSettingsUrl = DEFAULT_CALLING_SETTINGS_URL,
    audioSettingsUrl = DEFAULT_AUDIO_SETTINGS_URL,
    feedbackSettingsUrl = DEFAULT_FEEDBACK_SETTINGS_URL,
  }: SettingsContainerProps): UIFunctions<SettingsPanelProps> {
    return {
      onLogoutButtonClick: async () => {
        await this._deps.auth.logout();
      },
      onRegionSettingsLinkClick: () => {
        this._deps.routerInteraction.push(regionSettingsUrl);
      },
      onCallingSettingsLinkClick: () => {
        this._deps.routerInteraction.push(callingSettingsUrl);
      },
      onAudioSettingsLinkClick: () => {
        this._deps.routerInteraction.push(audioSettingsUrl);
      },
      onFeedbackSettingsLinkClick: () => {
        this._deps.routerInteraction.push(feedbackSettingsUrl);
      },
      onUserGuideClick: () => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.userGuide.start();
      },
      onReportIssueClick: () => {
        this._deps.cPRClientUI.openCPRDialog();
      },
      onQuickAccessLinkClick: () => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.quickAccess.enter();
      },
      setAvailable: () => this._deps.presence?.setAvailable(),
      setBusy: () => this._deps.presence?.setBusy(),
      setDoNotDisturb: () => this._deps.presence?.setDoNotDisturb(),
      setInvisible: () => this._deps.presence?.setInvisible(),
      toggleAcceptCallQueueCalls: () =>
        this._deps.presence?.toggleAcceptCallQueueCalls(),
      // @ts-expect-error TS(2322): Type '((locale: string) => Promise<void>) | undefi... Remove this comment to see the full error message
      saveLocale:
        this._deps.localeSettings &&
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        ((locale: string) => this._deps.localeSettings.saveLocale(locale)),
    };
  }
}
