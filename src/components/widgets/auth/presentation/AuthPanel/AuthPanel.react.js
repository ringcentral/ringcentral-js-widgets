import React from 'react';
import styles from './AuthPanel.css';
console.log(styles);
const AuthPanel = (props) => {
  return (
    <div className={styles.auth}>
      <button
        className={styles.loginButton}
        onClick={() => {
          props.login({
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
};

AuthPanel.propTypes = {
  auth: React.PropTypes.object,
  manuallyLogin: React.PropTypes.func,
};

export default AuthPanel;
