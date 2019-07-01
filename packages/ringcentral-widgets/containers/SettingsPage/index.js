import { connect } from 'react-redux';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import formatNumber from 'ringcentral-integration/lib/formatNumber';

import SettingsPanel from '../../components/SettingsPanel';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
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
    showFeedback,
    showQuickAccess,
    showCalling: showCalling && callingSettings && rolesAndPermissions.callingEnabled,
    showAudio: showAudio && rolesAndPermissions.callingEnabled,
    showRegion:
      loggedIn &&
      brand.id === '1210' &&
      regionSettings.showReginSetting &&
      rolesAndPermissions.callingEnabled &&
      showRegion,
    loginNumber,
    version,
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

function mapToFunctions(_, {
  phone: {
    auth,
    presence,
    routerInteraction,
    localeSettings,
    userGuide,
    quickAccess
  },
  regionSettingsUrl = '/settings/region',
  callingSettingsUrl = '/settings/calling',
  audioSettingsUrl = '/settings/audio',
  feedbackSettingsUrl = '/settings/feedback',
  msteamsSettingsUrl = '/settings/msteams'
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
const SettingsPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(SettingsPanel));

export {
  mapToFunctions,
  mapToProps,
  SettingsPage as default,
};
