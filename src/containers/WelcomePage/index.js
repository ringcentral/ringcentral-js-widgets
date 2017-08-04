import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Auth from 'ringcentral-integration/modules/Auth';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import Locale from 'ringcentral-integration/modules/Locale';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';
import ConnectivityMonitor from 'ringcentral-integration/modules/ConnectivityMonitor';
import LoginPanel from '../../components/LoginPanel';

function mapToProps(_, {
  auth,
  locale,
  rateLimiter,
  connectivityMonitor,
  version,
}) {
  return {
    currentLocale: locale.currentLocale,
    disabled: (
      !auth.proxyLoaded ||
      rateLimiter.throttling ||
      !connectivityMonitor.connectivity
    ),
    version,
    showSpinner: (
      !auth.ready ||
      auth.loginStatus === loginStatus.loggingIn ||
      auth.loginStatus === loginStatus.loggingOut ||
      auth.loginStatus === loginStatus.beforeLogout
    ),
  };
}

function mapToFunctions(_, {
  auth,
  onLogin,
}) {
  return {
    setupProxyFrame() {
      auth.setupProxyFrame(onLogin);
    },
    clearProxyFrame() {
      auth.clearProxyFrame();
    },
    onLoginButtonClick() {
      auth.openOAuthPage();
    },
  };
}

const WelcomePage = connect(
  mapToProps,
  mapToFunctions,
)(LoginPanel);

const propTypes = {
  auth: PropTypes.instanceOf(Auth).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  rateLimiter: PropTypes.instanceOf(RateLimiter).isRequired,
  connectivityMonitor: PropTypes.instanceOf(ConnectivityMonitor).isRequired,
  mainUrl: PropTypes.string,
  onLogin: PropTypes.func,
  version: PropTypes.string,
};

WelcomePage.propTypes = propTypes;

export {
  mapToFunctions,
  mapToProps,
  propTypes,
  WelcomePage as default,
};
