import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CircleButton from '../CircleButton';
import End from '../../../assets/images/End.svg';
import styles from './style.scss';

function EndIcon({ onClick, showBorder, disabled }) {
  const iconCls = classnames(styles.endButton, {
    [styles.disabled]: disabled
  });
  return (
    <CircleButton
      className={iconCls}
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
  showBorder: PropTypes.bool,
  disabled: PropTypes.bool,
};

EndIcon.defaultProps = {
  onClick() {},
  showBorder: false,
  disabled: false,
};

export default EndIcon;
