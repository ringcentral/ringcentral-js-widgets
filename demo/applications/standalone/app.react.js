import React from 'react';
import { connect } from 'react-redux';

import WebPhone from './containers/webphone';
import Auth from './containers/auth';

import TabPanels from '../../../src/widgets/shared/TabPanels';
import TabPanel from '../../../src/widgets/shared/TabPanel';

import Header from '../../../src/widgets/shared/Header';

import styles from './app.css';

const App = function (props) {
  return (
    <div>
      <Header logo={'ringcentral.png'} />
      <TabPanels className={styles.app} displayedTab={0}>
        <TabPanel isDisplay={!props.loggedIn}>
          <Auth />
        </TabPanel>
        <TabPanel isDisplay={props.loggedIn}>
          <WebPhone />
        </TabPanel>
      </TabPanels>
    </div>
  );
};

App.propTypes = {
  loggedIn: React.PropTypes.bool,
};

// todo: enums
export default connect(state => ({ loggedIn: state.common.auth.status === 'LOGGED_IN' }))(App);
