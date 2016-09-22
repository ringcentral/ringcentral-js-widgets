import React from 'react';
import { connect } from 'react-redux';

import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';
import Router from 'react-router/MemoryRouter';

import WebPhone from './containers/webphone';
import Auth from './containers/auth';

import styles from './app.css';

const WelcomePage = ({ loggedIn }) => {
  return (
    <div>
      {loggedIn ?
        <Redirect to={'/webphone'} /> :
        <Redirect to={'/auth'} />}
    </div>
  );
};

const connectedWelcomePage = connect(
  state => ({
    loggedIn: state.common.auth.status === 'LOGGED_IN',
  })
)(WelcomePage);

const App = function () {
  return (
    <Router>
      <div className={styles.app}>
        <Match exactly pattern="/" component={connectedWelcomePage} />
        <Match pattern="/auth" render={(props) => <Auth {...props} mainPage={'/webphone'} />} />
        <Match pattern="/webphone" component={WebPhone} />
      </div>
    </Router>
  );
};

WelcomePage.propTypes = {
  loggedIn: React.PropTypes.bool,
};

export default App;
