import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import OfflineModeBadge from 'ringcentral-widgets/components/OfflineModeBadge';
import WebphoneBadge from 'ringcentral-widgets/components/WebphoneBadge';
import Environment from 'ringcentral-widgets/components/Environment';
import { withPhone } from 'ringcentral-widgets/lib/phoneContext';

import styles from './styles.scss';

function AppView(props) {
  let badge = null;
  if (props.offline) {
    badge = (
      <OfflineModeBadge
        offline={props.offline}
        showOfflineAlert={props.showOfflineAlert}
        currentLocale={props.currentLocale}
      />
    );
  } else if (props.webphoneUnavailable) {
    badge = (
      <WebphoneBadge
        currentLocale={props.currentLocale}
        onClick={props.onWebphoneBadgeClicked}
        isConnecting={props.webphoneConnecting}
      />
    );
  }
  return (
    <div className={styles.root}>
      {props.children}
      {badge}
      <Environment
        server={props.server}
        enabled={props.enabled}
        onSetData={props.onSetData}
        recordingHost=""
      />
    </div>
  );
}

AppView.propTypes = {
  children: PropTypes.node,
  server: PropTypes.string,
  enabled: PropTypes.bool,
  onSetData: PropTypes.func,
  currentLocale: PropTypes.string.isRequired,
  offline: PropTypes.bool.isRequired,
  showOfflineAlert: PropTypes.func.isRequired,
  webphoneUnavailable: PropTypes.bool.isRequired,
  onWebphoneBadgeClicked: PropTypes.func.isRequired,
  webphoneConnecting: PropTypes.bool,
};

AppView.defaultProps = {
  children: null,
  server: null,
  enabled: false,
  onSetData: undefined,
  webphoneConnecting: false,
};

export default withPhone(connect((state, {
  phone: {
    locale,
    auth,
    webphone,
    audioSettings,
    environment,
    connectivityMonitor,
    callingSettings,
  },
}) => ({
  currentLocale: locale.currentLocale,
  server: environment.server,
  enabled: environment.enabled,
  offline: (
    !connectivityMonitor.connectivity ||
    auth.proxyRetryCount > 0
  ),
  webphoneUnavailable: (
    auth.ready &&
    audioSettings.ready &&
    webphone.ready &&
    auth.loggedIn &&
    callingSettings.isWebphoneMode &&
    (
      !audioSettings.userMedia ||
      (webphone.reconnecting || webphone.connectError)
    )
  ),
  webphoneConnecting: (webphone.ready && webphone.reconnecting),
}), (dispatch, {
  phone: {
    webphone,
    environment,
    audioSettings,
    connectivityMonitor,
    rateLimiter,
    callingSettings,
  },
}) => ({
  onSetData(options) {
    environment.setData(options);
  },
  showOfflineAlert() {
    rateLimiter.showAlert();
    connectivityMonitor.showAlert();
  },
  onWebphoneBadgeClicked() {
    // Only works for webphone mode
    if (callingSettings.callingMode !== callingModes.webphone) {
      return;
    }
    if (audioSettings && audioSettings.ready) {
      audioSettings.showAlert();
      audioSettings.getUserMedia();
    }
    if (webphone && webphone.ready) {
      // Trigger reconnect
      webphone.connect();
    }
  },
}))(AppView));
