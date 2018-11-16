import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

function formatTime(timestamp) {
  return 0;
}

function FormatInfo({
  name, describe, timestamp, className
}) {
  function FormatTime() {
    if (!timestamp) {
      return null;
    }
    return (
      <div className={styles.timeFormat}>
        <span>|</span>
        <span>{formatTime(timestamp)}</span>
      </div>
    );
  }
  return (
    <div className={className}>
      <div className={styles.name}>{name}</div>
      <div className={styles.describe}>
        <div className={styles.detail}>{describe}</div>
        <FormatTime />
      </div>
    </div>
  );
}

FormatInfo.propTypes = {
  name: PropTypes.string,
  describe: PropTypes.string,
  timestamp: PropTypes.number,
  className: PropTypes.string,
};

FormatInfo.defaultProps = {
  name: '',
  describe: '',
  timestamp: 0,
  className: ''
};

export default FormatInfo;
