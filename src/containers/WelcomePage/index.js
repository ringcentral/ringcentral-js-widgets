import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth from 'ringcentral-integration/modules/Auth';
import Locale from 'ringcentral-integration/modules/Locale';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';
import LoginPanel from '../../components/LoginPanel';

function mapToProps(_, {
  auth,
  locale,
  rateLimiter,
}) {
  return {
    currentLocale: locale.currentLocale,
    disabled: !auth.proxyLoaded || rateLimiter.throttling,
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
  mainUrl: PropTypes.string,
  onLogin: PropTypes.func,
};

WelcomePage.propTypes = propTypes;

export {
  mapToFunctions,
  mapToProps,
  propTypes,
  WelcomePage as default,
};
