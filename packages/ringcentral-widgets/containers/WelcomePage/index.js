import { connect } from 'react-redux';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import LoginPanel from '../../components/LoginPanel';
import { withPhone } from '../../lib/phoneContext';

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
  onSignUpButtonClick
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
    onSignUpButtonClick,
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
