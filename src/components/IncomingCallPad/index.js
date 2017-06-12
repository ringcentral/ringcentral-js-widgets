import React from 'react';
import PropTypes from 'prop-types';
import ActiveCallButton from '../ActiveCallButton';
import MessageIcon from '../../assets/images/MessageFill.svg';
import ForwardIcon from '../../assets/images/Forward.svg';
import IgnoreIcon from '../../assets/images/Ignore.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import AnswerIcon from '../../assets/images/Answer.svg';
import styles from './styles.scss';

import i18n from './i18n';

export default function IncomingCallPad(props) {
  return (
    <div className={styles.root}>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={() => null}
          icon={ForwardIcon}
          title={i18n.getString('forward', props.currentLocale)}
          className={styles.callButton}
        />
        <ActiveCallButton
          onClick={() => null}
          icon={MessageIcon}
          title={i18n.getString('reply', props.currentLocale)}
          className={styles.callButton}
        />
        <ActiveCallButton
          onClick={props.reject}
          icon={IgnoreIcon}
          title={i18n.getString('ignore', props.currentLocale)}
          className={styles.callButton}
        />
      </div>
      <div className={styles.buttonRow}>
        <ActiveCallButton
          onClick={props.toVoiceMail}
          title={i18n.getString('toVoicemail', props.currentLocale)}
          buttonClassName={styles.rejectButton}
          icon={VoicemailIcon}
          showBorder={false}
          className={styles.bigCallButton}
        />
        <ActiveCallButton
          onClick={props.answer}
          title={i18n.getString('answer', props.currentLocale)}
          buttonClassName={styles.answerButton}
          icon={AnswerIcon}
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
  currentLocale: PropTypes.string.isRequired,
};
