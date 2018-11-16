import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { formatTime } from './time';
import styles from './styles.scss';

function FormatInfo({
  name, describe, timestamp, className
}) {
  function FormatTime() {
    if (!timestamp) {
      return null;
    }
    return (
      <div className={styles.timeFormat}>
        <span className={styles.separator}>|</span>
        <span>{formatTime(timestamp)}</span>
      </div>
    );
  }
  const cls = classnames(styles.formatInfo, className);
  return (
    <div className={cls}>
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
