import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.scss';

export const CallIcon = ({ title, iconClassName }) => (
  <div className={styles.callIcon} title={title}>
    <span className={iconClassName} />
  </div>
);

CallIcon.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string.isRequired,
};
CallIcon.defaultProps = {
  title: '',
};
