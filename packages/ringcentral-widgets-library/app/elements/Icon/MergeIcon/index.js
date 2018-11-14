import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CircleButton from '../CircleButton';
import Merge from '../../../assets/images/MergeIntoConferenceIcon.svg';
import styles from './styles.scss';

function MergeIcon({ onClick, showBorder, disabled }) {
  const iconCls = classnames(styles.mergeButton, {
    [styles.disabled]: disabled
  });
  return (
    <CircleButton
      className={iconCls}
      onClick={onClick}
      iconWidth={260}
      iconX={120}
      icon={Merge}
      showBorder={showBorder}
    />
  );
}

MergeIcon.propTypes = {
  onClick: PropTypes.func,
  showBorder: PropTypes.bool,
  disabled: PropTypes.bool,
};

MergeIcon.defaultProps = {
  onClick() {},
  showBorder: true,
  disabled: false,
};

export default MergeIcon;
