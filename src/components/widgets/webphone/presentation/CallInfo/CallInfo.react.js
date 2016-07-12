import React from 'react';
import styles from '../../index.css';

const CallInfo = (props) => (
  <div>
    <div className={styles.title}>
      {this.props.phoneNumber}
    </div>
    <div className={styles.time}>
      00:30
    </div>
    <div className={styles.subtitle}>
      You are on a WebPhone call.
    </div>
  </div>
);

export default CallInfo;
