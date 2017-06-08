import { connect } from 'react-redux';
import { PropTypes } from 'react';

import formatNumber from 'ringcentral-integration/lib/formatNumber';

import Locale from 'ringcentral-integration/modules/Locale';
import CallingSettings from 'ringcentral-integration/modules/CallingSettings';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';

import Call from 'ringcentral-integration/modules/Call';
import ConnectivityMonitor from 'ringcentral-integration/modules/ConnectivityMonitor';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';

import DialerPanel from '../../components/DialerPanel';

function mapToProps(_, {
  call,
  callingSettings,
  connectivityMonitor,
  locale,
  rateLimiter,
}) {
  return {
    currentLocale: locale.currentLocale,
    callingMode: callingSettings.callingMode,
    isWebphoneMode: callingSettings.callingMode === callingModes.webphone,
    callButtonDisabled: !call.isIdle
    || !connectivityMonitor.connectivity
    || rateLimiter.throttling,
    toNumber: call.toNumber,
    fromNumbers: callingSettings.fromNumbers,
    fromNumber: callingSettings.fromNumber,
  };
}

function mapToFunctions(_, {
  call,
  callingSettings,
  regionSettings,
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

const propTypes = {
  call: PropTypes.instanceOf(Call).isRequired,
  callingSettings: PropTypes.instanceOf(CallingSettings).isRequired,
  connectivityMonitor: PropTypes.instanceOf(ConnectivityMonitor).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  rateLimiter: PropTypes.instanceOf(RateLimiter).isRequired,
};

DialerPage.propTypes = propTypes;

export {
  mapToFunctions,
  mapToProps,
  propTypes,
  DialerPage as default,
};
