import React from 'react';
import styles from '../index.css';

const AuthPanel = (props) => (
  <div className={styles.auth}>
    <button
      className={styles.loginButton}
      onClick={() => {
        props.phone.auth.login({
          username: '16508370092',
          extension: '',
          password: 'Test!123',
        });
        props.manuallyLogin();
      }}
    >
      Login
    </button>
  </div>
);

AuthPanel.propTypes = {
  phone: React.PropTypes.object,
  manuallyLogin: React.PropTypes.func,
};

export default AuthPanel;
