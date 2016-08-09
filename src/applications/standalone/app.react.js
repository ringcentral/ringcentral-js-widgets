import React from 'react';
import { connect } from 'react-redux';

import WebPhone from '../../widgets/modules/webphone/container';
import Auth from '../../widgets/modules/auth/container';

import styles from './app.css';

const App = function (props) {
  return (
    <div className={styles.app}>
      {
        props.loggedIn ?
          <WebPhone /> :
          <Auth />
      }
    </div>
  );
};

App.propTypes = {
  loggedIn: React.PropTypes.bool,
};

// todo: enums
export default connect(state => ({ loggedIn: state.common.auth.status === 'LOGGED_IN' }))(App);
