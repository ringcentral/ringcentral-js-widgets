import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import SpinnerOverlay from '../../../src/components/SpinnerOverlay';
import AlertDisplay from '../../../src/components/AlertDisplay';
import AuthAlert from '../../../src/components/AuthAlert';
import CallingSettingsAlert from '../../../src/components/CallingSettingsAlert';
import RegionSettingsAlert from '../../../src/components/RegionSettingsAlert';
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
};

export default connect((state, {
  alert,
  locale,
  auth,
  environment,
  callingSettings,
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
}), (dispatch, {
  alert,
  environment,
  brand,
}) => ({
  getRenderer: (message) => {
    if (AuthAlert.handleMessage(message)) {
      return AuthAlert;
    }
    if (CallingSettingsAlert.handleMessage(message)) {
      return props => (
        <CallingSettingsAlert
          {...props}
          brand={brand.fullName}
          callingSettingsUrl="/settings/calling"
        />
      );
    }

    if (RegionSettingsAlert.handleMessage(message)) {
      return props => (
        <RegionSettingsAlert {...props} regionSettingsUrl="/settings/region" />
      );
    }
    return undefined;
  },
  dismiss: (id) => {
    alert.dismiss(id);
  },
  onSetData: (options) => {
    environment.setData(options);
  },
}))(AppView);
