import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth from 'ringcentral-integration/modules/Auth';
import Locale from 'ringcentral-integration/modules/Locale';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';
import LoginPanel from '../../components/LoginPanel';

import styles from './styles.scss';

function WelcomeContainer(props) {
  return (
    <div className={styles.root}>
      <LoginPanel
        currentLocale={props.currentLocale}
        disabled={props.disabled}
        setupProxyFrame={props.setupProxyFrame}
        clearProxyFrame={props.clearProxyFrame}
        onLoginButtonClick={props.onLoginButtonClick}
      />
      {props.children}
    </div>
  );
}

WelcomeContainer.propTypes = {
  children: PropTypes.node,
  currentLocale: PropTypes.string.isRequired,
  setupProxyFrame: PropTypes.func.isRequired,
  clearProxyFrame: PropTypes.func.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

WelcomeContainer.defaultProps = {
  children: null,
  disabled: false,
};

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
)(WelcomeContainer);

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
