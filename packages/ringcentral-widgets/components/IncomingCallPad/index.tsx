import 'rc-tooltip/assets/bootstrap_white.css';

import React, { Component } from 'react';

import classnames from 'classnames';
import Tooltip from 'rc-tooltip';

import AnswerIcon from '../../assets/images/Answer.svg';
import ForwardIcon from '../../assets/images/Forward.svg';
import IgnoreIcon from '../../assets/images/Ignore.svg';
import MessageIcon from '../../assets/images/MessageFill.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import ActiveCallButton from '../ActiveCallButton';
import ForwardForm from '../ForwardForm';
import MultiCallAnswerButton from '../MultiCallAnswerButton';
import ReplyWithMessage from '../ReplyWithMessage';
import i18n from './i18n';
import styles from './styles.scss';

const TooltipCom = typeof Tooltip === 'function' ? Tooltip : Tooltip.default;
type IncomingCallPadProps = {
  answer: (...args: any[]) => any;
  reject: (...args: any[]) => any;
  toVoiceMail: (...args: any[]) => any;
  currentLocale: string;
  forwardingNumbers: any[];
  formatPhone?: (...args: any[]) => any;
  onForward: (...args: any[]) => any;
  replyWithMessage: (...args: any[]) => any;
  className?: string;
  answerAndEnd?: (...args: any[]) => any;
  answerAndHold?: (...args: any[]) => any;
  hasOtherActiveCall?: boolean;
  sessionId: string;
  searchContactList: any[];
  searchContact: (...args: any[]) => any;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
};
type IncomingCallPadState = {
  showForward: boolean;
  replyMessage: null;
  showReplyWithMessage: boolean;
  toVoiceMailEnabled: boolean;
  replyMessageEnabled: boolean;
};
class IncomingCallPad extends Component<
  IncomingCallPadProps,
  IncomingCallPadState
> {
  constructor(props) {
    super(props);
    this.state = {
      showForward: false,
      replyMessage: null,
      showReplyWithMessage: false,
      toVoiceMailEnabled: true,
      replyMessageEnabled: true,
    };
    this.onShowForwardChange = (visible) => {
      this.setState({
        showForward: visible,
      });
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
          toVoiceMailEnabled: false,
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
          replyMessageEnabled: false,
        });
        this.replyTimeout = setTimeout(() => {
          this.props.reject();
        }, 3000);
      }
    };
  }
  UNSAFE_componentWillReceiveProps(newProps) {
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
      <div
        className={classnames(styles.buttonRow, styles.multiCallsButtonGroup)}
      >
        <MultiCallAnswerButton
          onClick={answerAndEnd}
          title={i18n.getString('answerAndEnd', currentLocale)}
          dataSign="answerAndEnd"
          className={styles.callButton}
          isEndOtherCall
        />
        <ActiveCallButton
          onClick={this.toVoiceMail}
          title={i18n.getString('toVoicemail', currentLocale)}
          buttonClassName={
            this.state.toVoiceMailEnabled ? styles.voiceMailButton : ''
          }
          icon={VoicemailIcon}
          iconWidth={274}
          iconX={116}
          showBorder={!this.state.toVoiceMailEnabled}
          dataSign="toVoiceMail"
          className={styles.callButton}
          disabled={!this.state.toVoiceMailEnabled}
        />
        <MultiCallAnswerButton
          onClick={answerAndHold}
          title={i18n.getString('answerAndHold', currentLocale)}
          dataSign="answerAndHold"
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
          buttonClassName={
            this.state.toVoiceMailEnabled ? styles.voiceMailButton : ''
          }
          icon={VoicemailIcon}
          iconWidth={274}
          iconX={116}
          showBorder={!this.state.toVoiceMailEnabled}
          dataSign="toVoiceMail"
          className={styles.bigCallButton}
          disabled={!this.state.toVoiceMailEnabled}
        />
        <ActiveCallButton
          onClick={answer}
          title={i18n.getString('answer', currentLocale)}
          buttonClassName={styles.answerButton}
          icon={AnswerIcon}
          showBorder={false}
          dataSign="answer"
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
          <TooltipCom
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
                onForward={this.props.onForward}
                searchContact={this.props.searchContact}
                searchContactList={this.props.searchContactList}
                phoneTypeRenderer={this.props.phoneTypeRenderer}
                phoneSourceNameRenderer={this.props.phoneSourceNameRenderer}
              />
            }
          >
            <ActiveCallButton
              icon={ForwardIcon}
              iconWidth={250}
              iconX={125}
              onClick={() => null}
              title={i18n.getString('forward', currentLocale)}
              dataSign="forward"
              className={styles.callButton}
            />
          </TooltipCom>
          <TooltipCom
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
              dataSign="reply"
              className={styles.callButton}
            />
          </TooltipCom>
          <ActiveCallButton
            onClick={reject}
            icon={IgnoreIcon}
            title={i18n.getString('ignore', currentLocale)}
            dataSign="ignore"
            className={styles.callButton}
          />
        </div>
        {hasOtherActiveCall ? multiCallButtons : singleCallButtons}
      </div>
    );
  }
}
IncomingCallPad.defaultProps = {
  formatPhone: (phone) => phone,
  className: null,
  answerAndEnd: () => null,
  answerAndHold: () => null,
  hasOtherActiveCall: false,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
};
export default IncomingCallPad;
