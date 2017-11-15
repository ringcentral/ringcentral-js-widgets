import { connect } from 'react-redux';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import LoginPanel from '../../components/LoginPanel';
import withPhone from '../../lib/withPhone';

function mapToProps(_, {
  phone: {
    auth,
    locale,
    rateLimiter,
    connectivityMonitor,
  },
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
      auth.loginStatus === loginStatus.beforeLogout ||
      auth.loginStatus === loginStatus.loggedIn
    ),
  };
}

function mapToFunctions(_, {
  phone: {
    auth,
  },
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

const WelcomePage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(LoginPanel));

export {
  mapToFunctions,
  mapToProps,
  WelcomePage as default,
};
