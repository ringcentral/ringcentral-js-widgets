import React from 'react';
import styles from './AuthPanel.css';

class AuthPanel extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    manuallyLogin: React.PropTypes.func,
    login: React.PropTypes.func,
  }

  oauth() {
    this.props.login({
      username: '16508370092',
      extension: '',
      password: 'Test!123',
    });
    this.props.manuallyLogin();
  }

  render() {
    return (
      <div className={styles.auth}>
        <button
          className={styles.loginButton}
          onClick={() => this.oauth()}
        >
          Login
        </button>
      </div>
    );
  }
}

export default AuthPanel;
