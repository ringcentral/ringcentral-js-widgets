import React from 'react';
import { connect } from 'react-redux';

import WebPhone from '../../components/widgets/webphone/index.react';

import styles from './app.css';

const App = function App(props) {
  return (
    <div className={styles.app}>
      <WebPhone phone={props.phone} />
    </div>
  );
};

App.propTypes = {
  phone: React.PropTypes.object,
};

export default connect(state => ({ loggedIn: state.auth.status === 5 }))(App);
