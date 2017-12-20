import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

import ForwardForm from '../ForwardForm';
import ReplyWithMessage from '../ReplyWithMessage';
import ActiveCallButton from '../ActiveCallButton';
import MultiCallAnswerButton from '../MultiCallAnswerButton';

import MessageIcon from '../../assets/images/MessageFill.svg';
import ForwardIcon from '../../assets/images/Forward.svg';
import IgnoreIcon from '../../assets/images/Ignore.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import AnswerIcon from '../../assets/images/Answer.svg';
import styles from './styles.scss';

import i18n from './i18n';

export default class IncomingCallPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForward: false,
      forwardNumber: '',
      replyMessage: null,
      showReplyWithMessage: false,
      toVoiceMailEnabled: true,
      replyMessageEnabled: true,
    };
    this.onShowForwardChange = (visible) => {
      this.setState({
        showForward: visible,
        forwardNumber: '',
      });
    };
    this.onForwardNumberChange = (forwardNumber) => {
      this.setState({ forwardNumber });
    };
    this.closeForwardForm = () => {
      this.onShowForwardChange(false);
    };
    this.onShowReplyWithMessageChange = (visible) => {
      this.setState({
        showReplyWithMessage: visible,
      });
    };
    this.onReplyMessageChange = (message) => {
      this.setState({ replyMessage: message });
    };
    this.closeReplyWithMessage = () => {
      this.onShowReplyWithMessageChange(false);
    };
    this.toVoiceMail = () => {
      this.props.toVoiceMail();
      if (this.props.toVoiceMail) {
        this.setState({
          toVoiceMailEnabled: false
        });
        this.voicemailTimeout = setTimeout(() => {
          this.props.reject();
        }, 3000);
      }
    };
    this.replyWithMessage = (value) => {
      this.props.replyWithMessage(value);
      if (this.props.replyWithMessage) {
        this.setState({
          replyMessageEnabled: false
        });
        this.replyTimeout = setTimeout(() => {
          this.props.reject();
        }, 3000);
      }
    };
  }
  componentWillReceiveProps(newProps) {
    if (this.props.sessionId !== newProps.sessionId) {
      if (this.replyTimeout) {
        clearTimeout(this.replyTimeout);
        this.replyTimeout = null;
      }
      if (this.voicemailTimeout) {
        clearTimeout(this.voicemailTimeout);
        this.voicemailTimeout = null;
      }
    }
  }
  componentWillUnmount() {
    if (this.replyTimeout) {
      clearTimeout(this.replyTimeout);
      this.replyTimeout = null;
    }
    if (this.voicemailTimeout) {
      clearTimeout(this.voicemailTimeout);
      this.voicemailTimeout = null;
    }
  }
  render() {
    const {
      currentLocale,
      reject,
      answer,
      forwardingNumbers,
      formatPhone,
      className,
      hasOtherActiveCall,
      answerAndEnd,
      answerAndHold,
    } = this.props;
    // const isMultiCall = true;
    const multiCallButtons = (
      <div className={classnames(styles.buttonRow, styles.multiCallsButtonGroup)}>
        <MultiCallAnswerButton
          onClick={answerAndEnd}
          title={i18n.getString('answerAndEnd', currentLocale)}
          className={styles.callButton}
          isEndOtherCall
        />
        <ActiveCallButton
          onClick={this.toVoiceMail}
          title={i18n.getString('toVoicemail', currentLocale)}
          buttonClassName={this.state.toVoiceMailEnabled ? styles.voiceMailButton : ''}
          icon={VoicemailIcon}
          iconWidth={274}
          iconX={116}
          showBorder={!this.state.toVoiceMailEnabled}
          className={styles.callButton}
          disabled={!this.state.toVoiceMailEnabled}
        />
        <MultiCallAnswerButton
          onClick={answerAndHold}
          title={i18n.getString('answerAndHold', currentLocale)}
          className={styles.callButton}
          isEndOtherCall={false}
        />
      </div>
    );
    const singleCallButtons = (
      <div className={classnames(styles.buttonRow, styles.answerButtonGroup)}>
        <ActiveCallButton
          onClick={this.toVoiceMail}
          title={i18n.getString('toVoicemail', currentLocale)}
          buttonClassName={this.state.toVoiceMailEnabled ? styles.voiceMailButton : ''}
          icon={VoicemailIcon}
          iconWidth={274}
          iconX={116}
          showBorder={!this.state.toVoiceMailEnabled}
          className={styles.bigCallButton}
          disabled={!this.state.toVoiceMailEnabled}
        />
        <ActiveCallButton
          onClick={answer}
          title={i18n.getString('answer', currentLocale)}
          buttonClassName={styles.answerButton}
          icon={AnswerIcon}
          showBorder={false}
          className={styles.bigCallButton}
        />
      </div>
    );
    return (
      <div className={classnames(styles.root, className)}>
        <div
          className={styles.forwardContainner}
          ref={(containner) => {
            this.forwardContainner = containner;
          }}
        />
        <div
          className={styles.replyWithMessageContainner}
          ref={(containner) => {
            this.replyWithMessageContainner = containner;
          }}
        />
        <div className={styles.buttonRow}>
          <Tooltip
            defaultVisible={false}
            visible={this.state.showForward}
            onVisibleChange={this.onShowForwardChange}
            placement="topRight"
            trigger="click"
            arrowContent={<div className="rc-tooltip-arrow-inner" />}
            getTooltipContainer={() => this.forwardContainner}
            overlay={
              <ForwardForm
                forwardingNumbers={forwardingNumbers}
                currentLocale={currentLocale}
                onCancel={this.closeForwardForm}
                formatPhone={formatPhone}
                value={this.state.forwardNumber}
                onChange={this.onForwardNumberChange}
                onForward={this.props.onForward}
                searchContact={this.props.searchContact}
                searchContactList={this.props.searchContactList}
                phoneTypeRenderer={this.props.phoneTypeRenderer}
              />
            }
          >
            <ActiveCallButton
              icon={ForwardIcon}
              iconWidth={250}
              iconX={125}
              onClick={() => null}
              title={i18n.getString('forward', currentLocale)}
              className={styles.callButton}
            />
          </Tooltip>
          <Tooltip
            defaultVisible={false}
            visible={this.state.showReplyWithMessage}
            onVisibleChange={this.onShowReplyWithMessageChange}
            placement="top"
            trigger="click"
            arrowContent={<div className="rc-tooltip-arrow-inner" />}
            getTooltipContainer={() => this.replyWithMessageContainner}
            overlay={
              <ReplyWithMessage
                currentLocale={currentLocale}
                onCancel={this.closeReplyWithMessage}
                value={this.state.replyMessage}
                onChange={this.onReplyMessageChange}
                onReply={this.replyWithMessage}
                disabled={!this.state.replyMessageEnabled}
              />
            }
          >
            <ActiveCallButton
              onClick={() => null}
              icon={MessageIcon}
              title={i18n.getString('reply', currentLocale)}
              className={styles.callButton}
            />
          </Tooltip>
          <ActiveCallButton
            onClick={reject}
            icon={IgnoreIcon}
            title={i18n.getString('ignore', currentLocale)}
            className={styles.callButton}
          />
        </div>
        {hasOtherActiveCall ? multiCallButtons : singleCallButtons}
      </div>
    );
  }
}

IncomingCallPad.propTypes = {
  answer: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  toVoiceMail: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  forwardingNumbers: PropTypes.array.isRequired,
  formatPhone: PropTypes.func,
  onForward: PropTypes.func.isRequired,
  replyWithMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  answerAndEnd: PropTypes.func,
  answerAndHold: PropTypes.func,
  hasOtherActiveCall: PropTypes.bool,
  sessionId: PropTypes.string.isRequired,
  searchContactList: PropTypes.array.isRequired,
  searchContact: PropTypes.func.isRequired,
  phoneTypeRenderer: PropTypes.func,
};

IncomingCallPad.defaultProps = {
  formatPhone: phone => phone,
  className: null,
  answerAndEnd: () => null,
  answerAndHold: () => null,
  hasOtherActiveCall: false,
  contactSearch: undefined,
  phoneTypeRenderer: undefined,
};
