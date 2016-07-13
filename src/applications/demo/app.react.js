import React from 'react';
import { connect } from 'react-redux';

import WebPhone from '../../components/widgets/webphone/index.react';
import Auth from '../../components/widgets/auth/index.react';

import ActiveCall from '../../components/widgets/webphone/presentation/ActiveCall/ActiveCall.react';
import DialPad from '../../components/widgets/webphone/presentation/DialPad/DialPad.react';
import IncomingCall from '../../components/widgets/webphone/presentation/IncomingCall/IncomingCall.react';

import CallInfo from '../../components/widgets/webphone/presentation/CallInfo/CallInfo.react';

import styles from './app.css';

const App = function App(props) {
  return (
    <div>
      <div className={styles.line}>
        <div className={styles.app}>
          <WebPhone />
        </div>
        <div className={styles.app}>
          <Auth />
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.app}>
          <ActiveCall />
        </div>
        <div className={styles.app}>
          <DialPad />
        </div>
        <div className={styles.app}>
          <IncomingCall />
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  phone: React.PropTypes.object,
};

export default connect(state => ({ loggedIn: state.auth.status === 5 }))(App);
