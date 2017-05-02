import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from '../Button';
import ActiveCallButton from '../ActiveCallButton';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

export default function IncomingCallPad(props) {
  return (
    <div>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={() => null}
          title={'Forward'}
        >
          <i className={rcFont.icon_collapse} />
        </ActiveCallButton>
        <ActiveCallButton
          onClick={() => null}
          title={'Reply'}
        >
          <i className={rcFont.RC_Sms_pressed} />
        </ActiveCallButton>
        <ActiveCallButton
          onClick={props.reject}
          title={'Ignore'}
        >
          <i className={rcFont.uni43} />
        </ActiveCallButton>
      </div>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={props.toVoiceMail}
          title={'To Voicemail'}
          buttonClassName={styles.rejectButton}
        >
          <i className={rcFont.uniA8} />
        </ActiveCallButton>
        <ActiveCallButton
          onClick={props.answer}
          title={'Answer'}
          buttonClassName={styles.answerButton}
        >
          <i className={rcFont.icon_call} />
        </ActiveCallButton>
      </div>
    </div>
  );
}

IncomingCallPad.propTypes = {
  answer: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  toVoiceMail: PropTypes.func.isRequired,
};
