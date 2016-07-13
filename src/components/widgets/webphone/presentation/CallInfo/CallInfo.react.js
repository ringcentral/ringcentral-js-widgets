import React from 'react';
import styles from '../../index.css';

const CallInfo = (props) => (
  <div>
    <div className={styles.title}>
      {props.phoneNumber}
    </div>
    <div className={styles.time}>
      00:00
    </div>
    <div className={styles.subtitle}>
      You are on a WebPhone call.
    </div>
  </div>
);

CallInfo.propTypes = {
  phoneNumber: React.PropTypes.string,
};
CallInfo.defaultProps = {
  phoneNumber: 'Unknown',
};

export default CallInfo;
