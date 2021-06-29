import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import loginStatus from '@ringcentral-integration/commons/modules/Auth/loginStatus';
import RcUIModule from '../../lib/RcUIModule';

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
    {
      dep: 'Version',
      optional: true,
    },
    {
      dep: 'Presence',
      optional: true,
    },
    'AccountInfo',
    'ExtensionInfo',
    'RegionSettings',
    'ExtensionFeatures',
    'RouterInteraction',
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
export default class SettingsUI extends RcUIModule {
  getUIProps({
    phone: {
      accountInfo,
      auth,
      brand,
      extensionInfo,
      locale,
      localeSettings,
      regionSettings,
      callingSettings,
      version,
      extensionFeatures,
      presence,
      userGuide,
    },
    showRegion = true,
    showCalling = true,
    showAudio = true,
    showFeedback = true,
    showUserGuide = true,
    showPresenceSettings = true,
    showQuickAccess = false,
    params,
  }) {
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
        extensionFeatures.ready &&
        (!presence || presence.ready) &&
        (!localeSettings || localeSettings.ready)
      ),
      showCalling:
        showCalling && callingSettings && extensionFeatures.isCallingEnabled,
      showAudio: showAudio && extensionFeatures.isCallingEnabled,
      showRegion:
        loggedIn &&
        brand.code === 'rc' &&
        regionSettings.showReginSetting &&
        extensionFeatures.isCallingEnabled &&
        showRegion,
      currentLocale: locale.currentLocale,
      brandId: brand.id,
      ringoutEnabled: extensionFeatures.isRingOutEnabled,
      outboundSMS:
        !!extensionFeatures.hasOutboundSMSPermission ||
        !!extensionFeatures.hasInternalSMSPermission,
      isCallQueueMember: extensionInfo.isCallQueueMember,
      dndStatus: presence && presence.dndStatus,
      userStatus: presence && presence.userStatus,
      openPresenceSettings: !!(
        presence &&
        params &&
        params.showPresenceSettings
      ),
      showPresenceSettings:
        showPresenceSettings &&
        !!extensionFeatures.features?.EditPresenceStatus?.available,
      supportedLocales: localeSettings && localeSettings.supportedLocales,
      savedLocale: localeSettings && localeSettings.savedLocale,
      showUserGuide: showUserGuide && !!userGuide?.hasPermission,
    };
  }

  getUIFunctions({
    regionSettingsUrl = DEFAULT_REGION_SETTINGS_URL,
    callingSettingsUrl = DEFAULT_CALLING_SETTINGS_URL,
    audioSettingsUrl = DEFAULT_AUDIO_SETTINGS_URL,
    feedbackSettingsUrl = DEFAULT_FEEDBACK_SETTINGS_URL,
    phone: {
      auth,
      presence,
      routerInteraction,
      localeSettings,
      userGuide,
      quickAccess,
    },
  }) {
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

      setAvailable: (...args) => presence && presence.setAvailable(...args),
      setBusy: (...args) => presence && presence.setBusy(...args),
      setDoNotDisturb: (...args) =>
        presence && presence.setDoNotDisturb(...args),
      setInvisible: (...args) => presence && presence.setInvisible(...args),
      toggleAcceptCallQueueCalls: (...args) =>
        presence && presence.toggleAcceptCallQueueCalls(...args),
      saveLocale:
        localeSettings && ((locale) => localeSettings.saveLocale(locale)),
    };
  }
}
