import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import SpinnerOverlay from '../../../src/components/SpinnerOverlay';
import AlertDisplay from '../../../src/components/AlertDisplay';
import AuthAlert from '../../../src/components/AuthAlert';
import CallAlert from '../../../src/components/CallAlert';
import CallingSettingsAlert from '../../../src/components/CallingSettingsAlert';
import RegionSettingsAlert from '../../../src/components/RegionSettingsAlert';
import MessageSenderAlert from '../../../src/components/MessageSenderAlert';
import RateExceededAlert from '../../../src/components/RateExceededAlert';
import ConnectivityAlert from '../../../src/components/ConnectivityAlert';
import OfflineModeBadge from '../../../src/components/OfflineModeBadge';
import Environment from '../../../src/components/Environment';

import styles from './styles.scss';

function AppView(props) {
  const spinner = props.showSpinner ?
    <SpinnerOverlay /> :
    null;

  return (
    <div className={styles.root}>
      {props.children}
      {spinner}
      <AlertDisplay
        messages={props.messages}
        getRenderer={props.getRenderer}
        dismiss={props.dismiss}
        currentLocale={props.currentLocale}
      />
      <OfflineModeBadge
        offline={props.offline}
        showOfflineAlert={props.showOfflineAlert}
        currentLocale={props.currentLocale}
      />
      <Environment
        server={props.server}
        enabled={props.enabled}
        onSetData={props.onSetData}
      />
    </div>
  );
}

AppView.propTypes = {
  children: PropTypes.node,
  showSpinner: PropTypes.bool.isRequired,
  messages: AlertDisplay.propTypes.messages,
  getRenderer: AlertDisplay.propTypes.getRenderer,
  dismiss: PropTypes.func.isRequired,
  server: PropTypes.string,
  enabled: PropTypes.bool,
  onSetData: PropTypes.func,
  currentLocale: PropTypes.string.isRequired,
  offline: PropTypes.bool.isRequired,
  showOfflineAlert: PropTypes.func.isRequired,
};

export default connect((state, {
  alert,
  locale,
  auth,
  environment,
  callingSettings,
  connectivityMonitor,
  rateLimiter,
}) => ({
  messages: alert.messages,
  currentLocale: locale.currentLocale,
  showSpinner: (
    (auth.loginStatus !== loginStatus.loggedIn &&
      auth.loginStatus !== loginStatus.notLoggedIn) ||
    (auth.loginStatus === loginStatus.loggedIn &&
      !callingSettings.ready)
  ),
  server: environment.server,
  enabled: environment.enabled,
  offline: (
    !connectivityMonitor.connectivity ||
    auth.proxyRetryCount > 0 ||
    rateLimiter.throttling
  ),
}), (dispatch, {
  alert,
  environment,
  brand,
  connectivityMonitor,
  rateLimiter,
}) => ({
  getRenderer: (message) => {
    if (AuthAlert.handleMessage(message)) {
      return AuthAlert;
    }
    if (CallAlert.handleMessage(message)) {
      return props => (
        <CallAlert
          {...props}
          regionSettingsUrl="/settings/region" />
      );
    }
    if (CallingSettingsAlert.handleMessage(message)) {
      return props => (
        <CallingSettingsAlert
          {...props}
          brand={brand.fullName}
          callingSettingsUrl="/settings/calling" />
      );
    }

    if (RegionSettingsAlert.handleMessage(message)) {
      return props => (
        <RegionSettingsAlert
          {...props}
          regionSettingsUrl="/settings/region" />
      );
    }

    if (MessageSenderAlert.handleMessage(message)) {
      return MessageSenderAlert;
    }

    if (RateExceededAlert.handleMessage(message)) {
      return props => (
        <RateExceededAlert
          {...props}
          timestamp={rateLimiter.timestamp}
          duration={rateLimiter._throttleDuration} />
      );
    }

    if (ConnectivityAlert.handleMessage(message)) {
      return ConnectivityAlert;
    }

    return undefined;
  },
  dismiss: (id) => {
    alert.dismiss(id);
  },
  onSetData: (options) => {
    environment.setData(options);
  },
  showOfflineAlert: () => {
    rateLimiter.showAlert();
    connectivityMonitor.showAlert();
  },
}))(AppView);
