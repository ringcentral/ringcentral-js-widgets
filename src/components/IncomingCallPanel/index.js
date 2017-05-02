import React, { PropTypes } from 'react';

import Button from '../Button';
import ActiveCallUserInfo from '../ActiveCallUserInfo';
import IncomingCallPad from '../IncomingCallPad';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

export default function IncomingCallPanel(props) {
  return (
    <div className={styles.root}>
      <Button
        className={styles.minimizeButton}
        onClick={props.toggleMinimized}
      >
        <i className={dynamicsFont.close} />
      </Button>
      <ActiveCallUserInfo
        name={props.userName}
        phoneNumber={props.phoneNumber}
        currentLocale={props.currentLocale}
        isBig
      />
      <IncomingCallPad
        answer={props.answer}
        reject={props.reject}
        toVoiceMail={props.toVoiceMail}
        replyWithMessage={props.replyWithMessage}
      />
      {props.children}
    </div>
  );
}

IncomingCallPanel.propTypes = {
  toggleMinimized: PropTypes.func.isRequired,
  userName: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  answer: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  toVoiceMail: PropTypes.func.isRequired,
  replyWithMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
};

IncomingCallPanel.defaultProps = {
  userName: null,
  phoneNumber: null,
  children: undefined,
};
