import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import loginStatus from '@ringcentral-integration/commons/modules/Auth/loginStatus';
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
    const {
      accountInfo,
      auth,
      brand,
      extensionInfo,
      extensionFeatures,
      locale,
      localeSettings,
      regionSettings,
      callingSettings,
      version,
      appFeatures,
      presence,
      userGuide,
    } = this._deps;
    let loginNumber = brand.name;
    const loggedIn = auth.loginStatus === loginStatus.loggedIn;
    if (
      loggedIn &&
      accountInfo.ready &&
      extensionInfo.ready &&
      accountInfo.mainCompanyNumber
    ) {
      // If no extensionNumber, extensionNumber field needs to be omitted
      const extensionNumber =
        extensionInfo.extensionNumber && extensionInfo.extensionNumber !== '0'
          ? extensionInfo.extensionNumber
          : null;
      const phoneNumber = [accountInfo.mainCompanyNumber, extensionNumber].join(
        '*',
      );
      loginNumber = formatNumber({
        phoneNumber,
        countryCode: regionSettings.countryCode,
        areaCode: regionSettings.areaCode,
      });
    }
    return {
      version,
      loginNumber,
      showFeedback,
      showQuickAccess,
      showSpinner: !(
        accountInfo.ready &&
        auth.ready &&
        loggedIn &&
        extensionInfo.ready &&
        locale.ready &&
        regionSettings.ready &&
        (!callingSettings || callingSettings.ready) &&
        appFeatures.ready &&
        (!presence || presence.ready) &&
        (!localeSettings || localeSettings.ready)
      ),
      showCalling:
        showCalling && callingSettings && appFeatures.isCallingEnabled,
      showAudio: showAudio && appFeatures.isCallingEnabled,
      showRegion:
        loggedIn &&
        regionSettings.showRegionSettings &&
        appFeatures.isCallingEnabled,
      currentLocale: locale.currentLocale,
      eulaLabel: brand.brandConfig.eulaLabel,
      eulaLink: brand.brandConfig.eulaLink,
      outboundSMS:
        !!appFeatures.hasOutboundSMSPermission ||
        !!appFeatures.hasInternalSMSPermission,
      isCallQueueMember: extensionInfo.isCallQueueMember,
      dndStatus: presence?.dndStatus,
      userStatus: presence?.userStatus,
      openPresenceSettings: !!(
        presence &&
        params &&
        params.showPresenceSettings
      ),
      showPresenceSettings:
        showPresenceSettings &&
        !!extensionFeatures.features?.EditPresenceStatus?.available,
      supportedLocales: localeSettings?.supportedLocales,
      savedLocale: localeSettings?.savedLocale,
      showUserGuide: showUserGuide && !!userGuide?.hasPermission,
    };
  }

  getUIFunctions({
    regionSettingsUrl = DEFAULT_REGION_SETTINGS_URL,
    callingSettingsUrl = DEFAULT_CALLING_SETTINGS_URL,
    audioSettingsUrl = DEFAULT_AUDIO_SETTINGS_URL,
    feedbackSettingsUrl = DEFAULT_FEEDBACK_SETTINGS_URL,
  }: SettingsContainerProps): UIFunctions<SettingsPanelProps> {
    const {
      auth,
      presence,
      routerInteraction,
      localeSettings,
      userGuide,
      quickAccess,
    } = this._deps;
    return {
      async onLogoutButtonClick() {
        await auth.logout();
      },
      onRegionSettingsLinkClick() {
        routerInteraction.push(regionSettingsUrl);
      },
      onCallingSettingsLinkClick() {
        routerInteraction.push(callingSettingsUrl);
      },
      onAudioSettingsLinkClick() {
        routerInteraction.push(audioSettingsUrl);
      },
      onFeedbackSettingsLinkClick() {
        routerInteraction.push(feedbackSettingsUrl);
      },
      onUserGuideClick() {
        userGuide.start();
      },
      onQuickAccessLinkClick() {
        quickAccess.enter();
      },
      setAvailable: () => presence?.setAvailable(),
      setBusy: () => presence?.setBusy(),
      setDoNotDisturb: () => presence?.setDoNotDisturb(),
      setInvisible: () => presence?.setInvisible(),
      toggleAcceptCallQueueCalls: () => presence?.toggleAcceptCallQueueCalls(),
      saveLocale:
        localeSettings &&
        ((locale: string) => localeSettings.saveLocale(locale)),
    };
  }
}
