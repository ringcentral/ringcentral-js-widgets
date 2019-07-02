import { connect } from 'react-redux';
import { withPhone } from '../../lib/phoneContext';
import ConnectivityBadge from '../../components/ConnectivityBadge';

function mapToProps(_, {
  phone: {
    locale,
    connectivityManager
  },
}) {
  return {
    currentLocale: locale.currentLocale,
    mode: (connectivityManager.ready && connectivityManager.mode) || null,
    webphoneConnecting: connectivityManager.ready && connectivityManager.webphoneConnecting,
    hasLimitedStatusError: connectivityManager.ready && connectivityManager.hasLimitedStatusError
  };
}

function mapToFunctions(_, {
  phone: {
    connectivityManager
  },
}) {
  return {
    onClick() {
      if (connectivityManager.isWebphoneUnavailableMode) {
        connectivityManager.checkWebphoneAndConnect();
      } else if (connectivityManager.hasLimitedStatusError) {
        connectivityManager.checkStatus();
      } else {
        connectivityManager.showConnectivityAlert();
      }
    },
    showBadgeAlert: connectivityManager.showConnectivityAlert,
  };
}

const ConnectivityBadgeContainer = withPhone(connect(
  mapToProps,
  mapToFunctions
)(ConnectivityBadge));

export default ConnectivityBadgeContainer;
