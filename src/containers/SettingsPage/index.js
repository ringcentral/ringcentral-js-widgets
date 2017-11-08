import { connect } from 'react-redux';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import formatNumber from 'ringcentral-integration/lib/formatNumber';

import SettingsPanel from '../../components/SettingsPanel';

function mapToProps(_, {
  phone: {
    accountInfo,
    auth,
    brand,
    extensionInfo,
    locale,
    regionSettings,
    callingSettings,
    version,
    rolesAndPermissions,
    presence,
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
      (!presence || presence.ready)
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
    dndStatus: presence && presence.dndStatus,
    userStatus: presence && presence.userStatus,
    showPresenceSettings: !!(presence && params && params.showPresenceSettings),
  };
}

function mapToFunctions(_, {
  phone: {
    auth,
    presence,
    router,
  },
  regionSettingsUrl = '/settings/region',
  callingSettingsUrl = '/settings/calling',
  audioSettingsUrl = '/settings/audio',
}) {
  return {
    onLogoutButtonClick: async () => {
      await auth.logout();
    },
    onRegionSettingsLinkClick: () => {
      router.push(regionSettingsUrl);
    },
    onCallingSettingsLinkClick: () => {
      router.push(callingSettingsUrl);
    },
    onAudioSettingsLinkClick: () => {
      router.push(audioSettingsUrl);
    },
    setAvailable: (...args) => (presence && presence.setAvailable(...args)),
    setBusy: (...args) => (presence && presence.setBusy(...args)),
    setDoNotDisturb: (...args) => (presence && presence.setDoNotDisturb(...args)),
    setInvisible: (...args) => (presence && presence.setInvisible(...args)),
    toggleAcceptCallQueueCalls: (...args) => (
      presence && presence.toggleAcceptCallQueueCalls(...args)
    ),
  };
}
const SettingsPage = connect(
  mapToProps,
  mapToFunctions,
)(SettingsPanel);

export {
  mapToFunctions,
  mapToProps,
  SettingsPage as default,
};
