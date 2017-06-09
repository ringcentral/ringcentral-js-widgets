import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IncomingCallPad from '../IncomingCallPad';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function UserInfo(props) {
  const name = props.name;
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarHolder}>
          <div className={classnames(styles.ringOutside, styles.ringing)} />
          <div className={classnames(styles.ringInner, styles.ringing)} />
          <div className={styles.avatar}>
            <i className={classnames(dynamicsFont.portrait, styles.icon)} />
          </div>
        </div>
      </div>
      <div className={styles.userName}>{name}</div>
      <div className={styles.userPhoneNumber}>
        {props.formatPhone(props.phoneNumber)}
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  formatPhone: PropTypes.func.isRequired,
};

UserInfo.defaultProps = {
  className: null,
  phoneNumber: null,
};

export default function IncomingCallPanel(props) {
  return (
    <div className={styles.root}>
      <UserInfo
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
        currentLocale={props.currentLocale}
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
