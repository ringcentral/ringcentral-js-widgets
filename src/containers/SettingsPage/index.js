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
      callingSettings.ready &&
      rolesAndPermissions.ready &&
      (!detailedPresence || detailedPresence.ready) &&
      (!localeSettings || localeSettings.ready)
    ),
    showRegion: loggedIn && brand.id === '1210' && (
      regionSettings.availableCountries.length > 1 ||
      !!regionSettings.availableCountries.find(c => c.isoCode === 'US') ||
      !!regionSettings.availableCountries.find(c => c.isoCode === 'CA')
    ),
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
    showPresenceSettings: !!(detailedPresence && params && params.showPresenceSettings),
    supportedLocales: localeSettings && localeSettings.supportedLocales,
    savedLocale: localeSettings && localeSettings.savedLocale,
  };
}

function mapToFunctions(_, {
  phone: {
    auth,
    detailedPresence,
    routerInteraction,
    localeSettings,
  },
  regionSettingsUrl = '/settings/region',
  callingSettingsUrl = '/settings/calling',
  audioSettingsUrl = '/settings/audio',
  feedbackSettingsUrl = '/settings/feedback',
}) {
  return {
    onLogoutButtonClick: async () => {
      await auth.logout();
    },
    onRegionSettingsLinkClick: () => {
      routerInteraction.push(regionSettingsUrl);
    },
    onCallingSettingsLinkClick: () => {
      routerInteraction.push(callingSettingsUrl);
    },
    onAudioSettingsLinkClick: () => {
      routerInteraction.push(audioSettingsUrl);
    },
    onFeedbackSettingsLinkClick: () => {
      routerInteraction.push(feedbackSettingsUrl);
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
