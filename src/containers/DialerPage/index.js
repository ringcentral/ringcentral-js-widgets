import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';

import DialerPanel from '../../components/DialerPanel';

function mapToProps(_, {
  phone: {
    call,
    callingSettings,
    connectivityMonitor,
    locale,
    rateLimiter,
    webphone,
    audioSettings: {
      dialButtonVolume,
      dialButtonMuted,
    },
  }
}) {
  const isWebphoneMode = (callingSettings.callingMode === callingModes.webphone);
  const waitingWebphoneConnected = (isWebphoneMode && webphone && webphone.connecting);
  const webphoneDisconnected = (isWebphoneMode && webphone && !webphone.connected);
  return {
    currentLocale: locale.currentLocale,
    callingMode: callingSettings.callingMode,
    isWebphoneMode,
    callButtonDisabled: (
      !call.isIdle
      || !connectivityMonitor.connectivity
      || rateLimiter.throttling
      || webphoneDisconnected
    ),
    toNumber: call.toNumber,
    fromNumbers: callingSettings.fromNumbers,
    fromNumber: callingSettings.fromNumber,
    showSpinner: !(
      call.ready &&
      callingSettings.ready &&
      locale.ready &&
      connectivityMonitor.ready &&
      (!isWebphoneMode || !webphone || !waitingWebphoneConnected)
    ),
    dialButtonVolume,
    dialButtonMuted,
  };
}

function mapToFunctions(_, {
  phone: {
    call,
    callingSettings,
    regionSettings,
  }
}) {
  return {
    keepToNumber: (value) => {
      call.onToNumberChange(value);
    },
    onCall: () => {
      call.onCall();
    },
    changeFromNumber: (...args) => callingSettings.updateFromNumber(...args),
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings && regionSettings.areaCode,
      countryCode: regionSettings && regionSettings.countryCode,
    }),
  };
}

const DialerPage = connect(
  mapToProps,
  mapToFunctions,
)(DialerPanel);

export {
  mapToFunctions,
  mapToProps,
  DialerPage as default,
};
