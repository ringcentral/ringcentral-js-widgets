import React, { PropTypes } from 'react';
import ActiveCallButton from '../ActiveCallButton';
import MessageIcon from '../../assets/images/MessageFill.svg';
import ForwardIcon from '../../assets/images/Forward.svg';
import IgnoreIcon from '../../assets/images/Ignore.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import AnswerIcon from '../../assets/images/Answer.svg';
import styles from './styles.scss';

export default function IncomingCallPad(props) {
  return (
    <div className={styles.root}>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={() => null}
          Icon={ForwardIcon}
          title={'Forward'}
          className={styles.callButton}
        />
        <ActiveCallButton
          onClick={() => null}
          Icon={MessageIcon}
          title={'Reply'}
          className={styles.callButton}
        />
        <ActiveCallButton
          onClick={props.reject}
          Icon={IgnoreIcon}
          title={'Ignore'}
          className={styles.callButton}
        />
      </div>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={props.toVoiceMail}
          title={'To Voicemail'}
          buttonClassName={styles.rejectButton}
          Icon={VoicemailIcon}
          showBorder={false}
          className={styles.bigCallButton}
        />
        <ActiveCallButton
          onClick={props.answer}
          title={'Answer'}
          buttonClassName={styles.answerButton}
          Icon={AnswerIcon}
          showBorder={false}
          className={styles.bigCallButton}
        />
      </div>
    </div>
  );
}

IncomingCallPad.propTypes = {
  answer: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  toVoiceMail: PropTypes.func.isRequired,
};
