import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import i18n from './i18n';

export default class LoginPanel extends Component {
  componentDidMount() {
    this.props.setupProxyFrame();
  }
  componentWillUnmount() {
    this.props.clearProxyFrame();
  }
  render() {
    const {
      className,
      onLoginButtonClick,
      currentLocale,
      disabled,
      version,
    } = this.props;
    const versionDisplay = version ?
      (
        <div className={styles.versionContainer} >
          {i18n.getString('version', currentLocale)} {version}
        </div>
      ) :
      null;
    return (
      <div className={classnames(styles.root, className)}>
        <button
          className={styles.loginButton}
          onClick={onLoginButtonClick}
          disabled={disabled} >
          {i18n.getString('loginButton', currentLocale)}
        </button>
        {versionDisplay}
      </div>
    );
  }
}

LoginPanel.propTypes = {
  className: PropTypes.string,
  setupProxyFrame: PropTypes.func.isRequired,
  clearProxyFrame: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  version: PropTypes.string,
};

LoginPanel.defaultProps = {
  className: null,
  disabled: false,
  version: undefined,
};
