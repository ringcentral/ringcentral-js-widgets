import React from 'react';
import { connect } from 'react-redux';

import WebPhone from './containers/webphone';
import Auth from './containers/auth';

import TabPanels from '../../../src/widgets/shared/TabPanels';
import TabPanel from '../../../src/widgets/shared/TabPanel';

import Header from '../../../src/widgets/shared/Header';

import styles from './app.css';

const App = function ({ loggedIn }) {
  return (
    <div className={styles.app}>
      <Header logo={'ringcentral.png'} />
      {!loggedIn ?
        <Auth /> :
        <TabPanels displayedTab={0}>
          <WebPhone />
        </TabPanels>  
      }
    </div>
  );
};

App.propTypes = {
  loggedIn: React.PropTypes.bool,
};

export default connect(state => ({ loggedIn: state.common.auth.status === 'LOGGED_IN' }))(App);
