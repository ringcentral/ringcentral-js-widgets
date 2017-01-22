import React, { PropTypes, Component } from 'react';
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
    } = this.props;
    return (
      <div className={classnames(styles.root, className)}>
        <button
          className={styles.loginButton}
          onClick={onLoginButtonClick}
          disabled={disabled} >
          {i18n.getString('loginButton', currentLocale)}
        </button>
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
};

LoginPanel.defaultProps = {
  className: null,
  disabled: false,
};
