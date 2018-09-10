import { connect } from 'react-redux';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import LoginPanel from '../../components/LoginPanel';
import { withPhone } from '../../lib/phoneContext';

/* global chrome */

function mapToProps(_, {
  phone: {
    auth,
    locale,
    rateLimiter,
    connectivityMonitor,
    oAuth,
  },
  version,
  showSignUp = false,
}) {
  return {
    currentLocale: locale.currentLocale,
    disabled: (
      !oAuth.oAuthReady ||
      rateLimiter.throttling ||
      !connectivityMonitor.connectivity
    ),
    version,
    showSpinner: (
      !auth.ready ||
      auth.loginStatus === loginStatus.loggingIn ||
      auth.loginStatus === loginStatus.loggingOut ||
      auth.loginStatus === loginStatus.beforeLogout ||
      auth.loginStatus === loginStatus.loggedIn
    ),
    showSignUp,
  };
}

function mapToFunctions(_, {
  phone: {
    oAuth,
  },
}) {
  return {
    setupOAuth() {
      oAuth.setupOAuth();
    },
    destroyOAuth() {
      oAuth.destroyOAuth();
    },
    onLoginButtonClick() {
      oAuth.openOAuthPage();
    },
    onSignUpButtonClick() {
      const url = 'https://www.ringcentral.com/office/plansandpricing.html';
      if (chrome && chrome.tabs) {
        chrome.tabs.create({ url });
      } else {
        window.open(url);
      }
    }
  };
}

const WelcomePage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(LoginPanel));

export {
  mapToFunctions,
  mapToProps,
  WelcomePage as default,
};
