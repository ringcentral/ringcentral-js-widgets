import { connect } from 'react-redux';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import formatNumber from 'ringcentral-integration/lib/formatNumber';

import SettingsPanel from '../../components/SettingsPanel';
import withPhone from '../../lib/withPhone';

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
    detailedPresence,
  },
  showRegion = true,
  showCalling = true,
  showAudio = true,
  showFeedback = true,
  showUserGuide = true,
  showPresenceSettings = true,
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
      (!detailedPresence || detailedPresence.ready) &&
      (!localeSettings || localeSettings.ready)
    ),
    showFeedback,
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
    dndStatus: detailedPresence && detailedPresence.dndStatus,
    userStatus: detailedPresence && detailedPresence.userStatus,
    openPresenceSettings: !!(detailedPresence && params && params.showPresenceSettings),
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
    detailedPresence,
    routerInteraction,
    localeSettings,
    userGuide,
  },
  regionSettingsUrl = '/settings/region',
  callingSettingsUrl = '/settings/calling',
  audioSettingsUrl = '/settings/audio',
  feedbackSettingsUrl = '/settings/feedback',
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
    setAvailable: (...args) => (detailedPresence && detailedPresence.setAvailable(...args)),
    setBusy: (...args) => (detailedPresence && detailedPresence.setBusy(...args)),
    setDoNotDisturb: (...args) => (detailedPresence && detailedPresence.setDoNotDisturb(...args)),
    setInvisible: (...args) => (detailedPresence && detailedPresence.setInvisible(...args)),
    toggleAcceptCallQueueCalls: (...args) => (
      detailedPresence && detailedPresence.toggleAcceptCallQueueCalls(...args)
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
