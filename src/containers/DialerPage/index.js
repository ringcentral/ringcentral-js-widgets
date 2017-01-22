import { connect } from 'react-redux';
import { PropTypes } from 'react';

import Locale from 'ringcentral-integration/modules/Locale';
import CallingSettings from 'ringcentral-integration/modules/CallingSettings';
import Call from 'ringcentral-integration/modules/Call';
import ConnectivityMonitor from 'ringcentral-integration/modules/ConnectivityMonitor';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';


import DialerPanel from '../../components/DialerPanel';

const DialerPage = connect((state, props) => ({
  currentLocale: props.locale.currentLocale,
  callingMode: props.callingSettings.callingMode,
  callButtonDisabled: !props.call.isIdle
    || !props.connectivityMonitor.connectivity
    || props.rateLimiter.throttling,
  toNumber: props.call.toNumber,
}), (dispatch, props) => ({
  keepToNumber: (value) => {
    props.call.onToNumberChange(value);
  },
  onCall: () =>
    props.call.onCall(),
}))(DialerPanel);

DialerPage.propTypes = {
  call: PropTypes.instanceOf(Call).isRequired,
  callingSettings: PropTypes.instanceOf(CallingSettings).isRequired,
  connectivityMonitor: PropTypes.instanceOf(ConnectivityMonitor).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  rateLimiter: PropTypes.instanceOf(RateLimiter).isRequired,
};

export default DialerPage;
