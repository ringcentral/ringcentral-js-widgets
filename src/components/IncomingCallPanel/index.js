import React, { PropTypes } from 'react';
import classnames from 'classnames';

import ActiveCallUserInfo from '../ActiveCallUserInfo';
import IncomingCallPad from '../IncomingCallPad';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

export default function IncomingCallPanel(props) {
  return (
    <div className={styles.root}>
      <ActiveCallUserInfo
        name={props.userName}
        phoneNumber={props.phoneNumber}
        currentLocale={props.currentLocale}
        className={styles.userInfo}
        formatPhone={props.formatPhone}
        avatar={(
          <div className={styles.avatarHolder}>
            <div className={classnames(styles.ringOutside, styles.ringing)} />
            <div className={classnames(styles.ringInner, styles.ringing)} />
            <div className={styles.avatar}>
              <i className={classnames(dynamicsFont.portrait, styles.icon)} />
            </div>
          </div>
        )}
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
  userName: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  answer: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  toVoiceMail: PropTypes.func.isRequired,
  replyWithMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
  formatPhone: PropTypes.func.isRequired,
};

IncomingCallPanel.defaultProps = {
  userName: null,
  phoneNumber: null,
  children: undefined,
};
