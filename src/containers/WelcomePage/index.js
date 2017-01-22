import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth from 'ringcentral-integration/modules/Auth';
import Locale from 'ringcentral-integration/modules/Locale';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';
import LoginPanel from '../../components/LoginPanel';

const WelcomePage = connect((_, props) => ({
  currentLocale: props.locale.currentLocale,
  disabled: !props.auth.proxyLoaded || props.rateLimiter.throttling,
}), (_, props) => ({
  setupProxyFrame() {
    props.auth.setupProxyFrame(props.onLogin);
  },
  clearProxyFrame() {
    props.auth.clearProxyFrame();
  },
  onLoginButtonClick() {
    props.auth.openOAuthPage();
  },
}))(LoginPanel);

WelcomePage.propTypes = {
  auth: PropTypes.instanceOf(Auth).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  rateLimiter: PropTypes.instanceOf(RateLimiter).isRequired,
  mainUrl: PropTypes.string,
  onLogin: PropTypes.func,
};

export default WelcomePage;
