import React from 'react';
import PropTypes from 'prop-types';
import CircleButton from '../CircleButton';
import Answer from '../../../assets/images/Answer.svg';
import styles from './style.scss';

function AnswerIcon({ onClick, showBorder }) {
  return (
    <CircleButton
      className={styles.answerButton}
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
  showBorder: PropTypes.bool
};

AnswerIcon.defaultProps = {
  onClick() {},
  showBorder: false
};

export default AnswerIcon;
