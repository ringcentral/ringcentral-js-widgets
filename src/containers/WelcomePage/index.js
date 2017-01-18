import { PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginPanel from '../../components/LoginPanel';

const WelcomePage = connect((_, props) => ({
  currentLocale: props.locale.currentLocale,
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
  auth: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  mainUrl: PropTypes.string,
  onLogin: PropTypes.func,
};

export default WelcomePage;
