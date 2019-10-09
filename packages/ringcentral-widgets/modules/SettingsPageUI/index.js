import {
  Module
} from 'ringcentral-integration/lib/di';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import RcUIModule from '../../lib/RcUIModule';

const DEFAULT_REGION_SETTINGS_URL = '/settings/region';
const DEFAULT_CALLING_SETTINGS_URL = '/settings/calling';
const DEFAULT_AUDIO_SETTINGS_URL = '/settings/audio';
const DEFAULT_FEEDBACK_SETTINGS_URL = '/settings/feedback';
const DEFAULT_MSTEAMS_SETTINGS_URL = '/settings/msteams';

@Module({
  name: 'SettingsPageUI',
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
    'RolesAndPermissions',
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
      dep: 'SettingsPageUIOptions',
      optional: true,
    }
  ]
})
export default class SettingsPageUI extends RcUIModule {
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
      rolesAndPermissions,
      presence,
    },
    showRegion = true,
    showCalling = true,
    showAudio = true,
    showFeedback = true,
    showUserGuide = true,
    showPresenceSettings = true,
    showMsteamsSettings = false,
    showQuickAccess = false,
    params,
  }) {
    let loginNumber = '';
    const loggedIn = auth.loginStatus === loginStatus.loggedIn;
    if (
      loggedIn &&
      accountInfo.ready &&
      extensionInfo.ready
    ) {
      // If no extensionNumber, extensionNumber field needs to be omitted
      const extensionNumber = extensionInfo.extensionNumber &&
        extensionInfo.extensionNumber !== '0' ? extensionInfo.extensionNumber : null;
      const phoneNumber = [accountInfo.mainCompanyNumber, extensionNumber].join('*');
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
      showMsteamsSettings,
      showSpinner: !(
        accountInfo.ready &&
        auth.ready &&
        loggedIn &&
        extensionInfo.ready &&
        locale.ready &&
        regionSettings.ready &&
        (!callingSettings || callingSettings.ready) &&
        rolesAndPermissions.ready &&
        (!presence || presence.ready) &&
        (!localeSettings || localeSettings.ready)
      ),
      showCalling: showCalling && callingSettings && rolesAndPermissions.callingEnabled,
      showAudio: showAudio && rolesAndPermissions.callingEnabled,
      showRegion:
        loggedIn &&
        brand.id === '1210' &&
        regionSettings.showReginSetting &&
        rolesAndPermissions.callingEnabled &&
        showRegion,
      currentLocale: locale.currentLocale,
      brandId: brand.id,
      ringoutEnabled: rolesAndPermissions.ringoutEnabled,
      outboundSMS: !!rolesAndPermissions.permissions.OutboundSMS ||
      !!rolesAndPermissions.permissions.InternalSMS,
      isCallQueueMember: extensionInfo.isCallQueueMember,
      dndStatus: presence && presence.dndStatus,
      userStatus: presence && presence.userStatus,
      openPresenceSettings: !!(presence && params && params.showPresenceSettings),
      showPresenceSettings:
        showPresenceSettings && rolesAndPermissions.hasEditPresencePermission,
      supportedLocales: localeSettings && localeSettings.supportedLocales,
      savedLocale: localeSettings && localeSettings.savedLocale,
      showUserGuide: showUserGuide && rolesAndPermissions.hasUserGuidePermission,
    };
  }

  getUIFunctions({
    regionSettingsUrl = DEFAULT_REGION_SETTINGS_URL,
    callingSettingsUrl = DEFAULT_CALLING_SETTINGS_URL,
    audioSettingsUrl = DEFAULT_AUDIO_SETTINGS_URL,
    feedbackSettingsUrl = DEFAULT_FEEDBACK_SETTINGS_URL,
    msteamsSettingsUrl = DEFAULT_MSTEAMS_SETTINGS_URL,
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
      onMsteamsSettingsLinkClick() {
        routerInteraction.push(msteamsSettingsUrl);
      },
      onUserGuideClick() {
        userGuide.start();
      },
      onQuickAccessLinkClick() {
        quickAccess.enter();
      },

      setAvailable: (...args) => (presence && presence.setAvailable(...args)),
      setBusy: (...args) => (presence && presence.setBusy(...args)),
      setDoNotDisturb: (...args) => (presence && presence.setDoNotDisturb(...args)),
      setInvisible: (...args) => (presence && presence.setInvisible(...args)),
      toggleAcceptCallQueueCalls: (...args) => (
        presence && presence.toggleAcceptCallQueueCalls(...args)
      ),
      saveLocale: localeSettings && (locale => localeSettings.saveLocale(locale)),
    };
  }
}
