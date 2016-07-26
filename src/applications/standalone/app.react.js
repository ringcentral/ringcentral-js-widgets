import React from 'react';
import { connect } from 'react-redux';

import WebPhone from '../../components/widgets/webphone/index.react';
import Auth from '../../components/widgets/auth/index.react';

import styles from './app.css';

// Some hack
let isManual = false;
const App = function (props) {
  function manuallyLogin() {
    isManual = true;
  }
  return (
    <div className={styles.app}>
      {
        props.loggedIn && isManual ?
          <WebPhone /> :
          <Auth manuallyLogin={manuallyLogin} />
      }
    </div>
  );
};

App.propTypes = {
  loggedIn: React.PropTypes.bool,
};

export default connect(state => ({ loggedIn: state.auth.status === 'LOGGED_IN' }))(App);
