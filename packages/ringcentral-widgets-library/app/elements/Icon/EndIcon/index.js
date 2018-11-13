import React from 'react';
import PropTypes from 'prop-types';
import CircleButton from '../CircleButton';
import End from '../../../assets/images/End.svg';
import styles from './style.scss';

function EndIcon({ onClick, showBorder }) {
  return (
    <CircleButton
      className={styles.endButton}
      onClick={onClick}
      iconWidth={260}
      iconX={120}
      icon={End}
      showBorder={showBorder}
    />
  );
}

EndIcon.propTypes = {
  onClick: PropTypes.func,
  showBorder: PropTypes.bool
};

EndIcon.defaultProps = {
  onClick() {},
  showBorder: false
};

export default EndIcon;
