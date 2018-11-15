import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CircleButton from '../CircleButton';
import Answer from '../../../assets/images/Answer.svg';
import styles from './style.scss';

function AnswerIcon({
  onClick, showBorder, disabled, className
}) {
  const iconCls = classnames(styles.answerButton, {
    [styles.disabled]: disabled,
    [className]: true,
  });
  return (
    <CircleButton
      className={iconCls}
      onClick={onClick}
      iconWidth={260}
      iconX={120}
      icon={Answer}
      showBorder={showBorder}
    />
  );
}

AnswerIcon.propTypes = {
  onClick: PropTypes.func,
  showBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

AnswerIcon.defaultProps = {
  onClick() {},
  showBorder: false,
  disabled: false,
  className: '',
};

export default AnswerIcon;
