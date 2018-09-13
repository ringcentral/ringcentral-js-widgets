import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import { isInbound, isRinging } from 'ringcentral-integration/lib/callLogHelpers';
import { isOnHold } from 'ringcentral-integration/modules/Webphone/webphoneHelper';

import CallIcon from '../CallIcon';
import ContactDisplay from '../ContactDisplay';
import CircleButton from '../CircleButton';
import EndIcon from '../../assets/images/End.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import AnswerIcon from '../../assets/images/Answer.svg';
import MergeIntoConferenceIcon from '../../assets/images/MergeIntoConferenceIcon.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import MediaObject from '../MediaObject';
import DurationCounter from '../DurationCounter';

import styles from './styles.scss';
import i18n from '../ActiveCallItem/i18n';// Reuse the exsisting translations

function WebphoneButtons({
  currentLocale,
  session,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  webphoneAnswer,
  webphoneHold,
  showMergeCall,
  showHold,
  disableMerge,
  onMergeCall,
}) {
  if (!session) {
    return null;
  }
  let hangupFunc = webphoneHangup;
  let endIcon = EndIcon;
  let answerBtn = null;

  let rejectTitle = i18n.getString('hangup', currentLocale);
  const holdTitle = i18n.getString('hold', currentLocale);
  const unholdTitle = i18n.getString('unhold', currentLocale);

  if (
    isInbound(session) &&
    session.callStatus === sessionStatus.connecting
  ) {
    hangupFunc = webphoneReject;
    endIcon = VoicemailIcon;
    rejectTitle = i18n.getString('toVoicemail', currentLocale);
    showHold = false;
    answerBtn = (
      <span title={i18n.getString('accept', currentLocale)} className={styles.webphoneButton}>
        <CircleButton
          className={styles.answerButton}
          onClick={(e) => {
                e.stopPropagation();
                webphoneAnswer(session.id);
              }}
          icon={AnswerIcon}
          showBorder={false}
            />
      </span>
    );
  }

  let holdBtn;
  let mergeBtn;

  if (showHold) {
    if (isOnHold(session)) {
      holdBtn = (
        <span title={unholdTitle} className={styles.webphoneButton}>
          <CircleButton
            className={classnames(styles.holdButton, styles.active)}
            onClick={(e) => {
              e.stopPropagation();
              webphoneResume(session.id);
            }}
            iconWidth={260}
            iconX={120}
            icon={HoldIcon}
            showBorder
          />
        </span>
      );
    } else {
      holdBtn = (
        <span title={holdTitle} className={styles.webphoneButton}>
          <CircleButton
            className={styles.holdButton}
            onClick={(e) => {
              e.stopPropagation();
              webphoneHold(session.id);
            }}
            iconWidth={260}
            iconX={120}
            icon={HoldIcon}
            showBorder
          />
        </span>
      );
    }
  }

  if (showMergeCall) {
    const mergeTitle = i18n.getString('mergeToConference', currentLocale);

    mergeBtn = (
      <span title={mergeTitle} className={styles.webphoneButton}>
        <CircleButton
          className={
            classnames({
              [styles.mergeButton]: true,
              [styles.disabled]: disableMerge
            })
          }
          onClick={(e) => {
            e.stopPropagation();
            onMergeCall(session.id);
          }}
          iconWidth={260}
          iconX={120}
          icon={MergeIntoConferenceIcon}
          showBorder
          disabled={disableMerge}
        />
      </span>
    );
  }

  return (
    <div className={styles.webphoneButtons}>
      {mergeBtn}
      {holdBtn}
      <span title={rejectTitle} className={styles.webphoneButton}>
        <CircleButton
          className={styles.rejectButton}
          onClick={(e) => {
            e.stopPropagation();
            hangupFunc(session.id);
          }}
          iconWidth={260}
          iconX={120}
          icon={endIcon}
          showBorder={false}
        />
      </span>
      {answerBtn}
    </div>
  );
}

WebphoneButtons.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  session: PropTypes.object,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneHold: PropTypes.func,
  showMergeCall: PropTypes.bool,
  showHold: PropTypes.bool,
  disableMerge: PropTypes.bool,
  onMergeCall: PropTypes.func,
  webphoneAnswer: PropTypes.func,
};

WebphoneButtons.defaultProps = {
  session: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneHold: undefined,
  showMergeCall: false,
  showHold: true,
  disableMerge: true,
  onMergeCall: i => i,
  webphoneAnswer: i => i,
};

function RingoutButtons({
  showRingoutCallControl,
  currentLocale,
  disableLinks,
  sessionId,
  ringoutHangup,
  ringoutTransfer,
  ringing,
}) {
  if (!showRingoutCallControl) return null;

  let hangupBtn;
  if (ringoutHangup) {
    const hangupTitle = i18n.getString('hangup', currentLocale);
    hangupBtn = (
      <span title={hangupTitle} className={styles.ringoutButton}>
        <CircleButton
          disabled={disableLinks}
          className={
            classnames({
              [styles.hangupButton]: true,
              [styles.disabled]: disableLinks
            })
          }
          onClick={(e) => {
            e.stopPropagation();
            ringoutHangup(sessionId);
          }}
          icon={EndIcon}
          showBorder={false}
            />
      </span>
    );
  }

  let transferBtn;
  if (ringoutTransfer && !ringing) {
    const transferTitle = i18n.getString('transfer', currentLocale);

    transferBtn = (
      <span title={transferTitle} className={styles.ringoutButton}>
        <CircleButton
          disabled={disableLinks}
          className={
            classnames({
              [styles.transferButton]: true,
              [styles.disabled]: disableLinks
            })
          }
          onClick={(e) => {
                e.stopPropagation();
                ringoutTransfer(sessionId);
          }}
          icon={TransferIcon}
            />
      </span>
    );
  }

  return (
    <div>
      {hangupBtn}
      {transferBtn}
    </div>
  );
}

RingoutButtons.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  disableLinks: PropTypes.bool,
  ringoutHangup: PropTypes.func,
  ringoutTransfer: PropTypes.func,
  ringing: PropTypes.bool.isRequired,
  sessionId: PropTypes.string.isRequired,
  showRingoutCallControl: PropTypes.bool.isRequired,
};

RingoutButtons.defaultProps = {
  disableLinks: false,
  ringoutHangup: undefined,
  ringoutTransfer: undefined,
};

/**
 * TODO: Gradually replace <ActiveCallItem/> with this component
 */
export default class ActiveCallItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      isLogging: false,
      avatarUrl: null,
      extraNum: 0
    };
    this._userSelection = false;
    this.contactDisplay = null;

    this.webphoneToVoicemail = (sessionId) => {
      if (typeof this.props.webphoneToVoicemail !== 'function') {
        return;
      }
      this.props.webphoneToVoicemail(sessionId);
      this.toVoicemailTimeout = setTimeout(() => {
        this.props.webphoneReject(sessionId);
      }, 3000);
    };
  }

  setContact(nextProps = this.props) {
    const {
      isOnConferenceCall, conferenceCallParties
    } = nextProps;

    if (isOnConferenceCall) {
      this.setState({
        avatarUrl: conferenceCallParties.map(profile => profile.avatarUrl)[0],
        extraNum: conferenceCallParties.length > 0 ? conferenceCallParties.length - 1 : 0
      });
      return;
    }

    const selected = this.getSelectedContactIdx(nextProps);
    this.onSelectContact(
      this.getSelectedContact(
        selected,
        nextProps),
      selected,
    );
  }

  componentDidMount() {
    this._mounted = true;
    this.setContact();
  }

  componentWillReceiveProps(nextProps) {
    if (this.getContactMatches(nextProps) !== this.getContactMatches()) {
      this.setContact(nextProps);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this.toVoicemailTimeout) {
      clearTimeout(this.toVoicemailTimeout);
      this.toVoicemailTimeout = null;
    }
  }

  getCallInfo() {
    const {
      call: {
        telephonyStatus,
        startTime,
        offset,
      },
      disableLinks,
      currentLocale,
      showCallDetail,
    } = this.props;

    if (!showCallDetail) {
      return null;
    }

    const telephonyStatusInfo = i18n.getString(telephonyStatus, currentLocale);
    return (
      <div className={styles.callDetail}>
        {
          disableLinks ?
            i18n.getString('unavailable', currentLocale) :
            <DurationCounter startTime={startTime} offset={offset} />
        }
        <span className={styles.split}>|</span>
        <span title={telephonyStatusInfo}>
          {telephonyStatusInfo}
        </span>
      </div>
    );
  }

  getFallbackContactName() {
    return isInbound(this.props.call) ?
      (this.props.call.from.name) :
      (this.props.call.to.name);
  }

  onSelectContact = (value, idx) => {
    if (!value || typeof this.props.getAvatarUrl !== 'function') {
      return;
    }

    this._userSelection = true;
    this.setState({
      selected: idx,
    });
    if (value) {
      this.props.getAvatarUrl(value).then((avatarUrl) => {
        if (this._mounted) {
          this.setState({ avatarUrl });
        }
      });
      if (this.props.call.webphoneSession) {
        this.props.updateSessionMatchedContact(this.props.call.webphoneSession.id, value);
      }
    }
  }

  getSelectedContactIdx = (nextProps = this.props) => {
    const contactMatches = this.getContactMatches(nextProps);
    let selected = null;

    if (!nextProps.call.webphoneSession) {
      selected = 0;
    } else if (contactMatches && contactMatches.length) {
      const contact = nextProps.call.webphoneSession.contactMatch;
      if (contact) {
        selected = contactMatches.findIndex(match =>
          match.id === contact.id
        );
      }
      if (selected === -1 || !contact) {
        selected = 0;
      }
    }
    return selected;
  }

  getSelectedContact = (selected = this.getSelectedContactIdx(), nextProps = this.props) => {
    const contactMatches = this.getContactMatches(nextProps);
    return (contactMatches && contactMatches[selected]) || null;
  }

  getContactMatches(nextProps = this.props) {
    return isInbound(nextProps.call) ?
      nextProps.call.fromMatches :
      nextProps.call.toMatches;
  }

  getPhoneNumber() {
    return isInbound(this.props.call) ?
      (this.props.call.from.phoneNumber || this.props.call.from.extensionNumber) :
      (this.props.call.to.phoneNumber || this.props.call.to.extensionNumber);
  }

  render() {
    const {
      call: {
        direction,
        webphoneSession,
        sessionId,
      },
      disableLinks,
      currentLocale,
      areaCode,
      countryCode,
      enableContactFallback,
      isLogging,
      brand,
      showContactDisplayPlaceholder,
      webphoneHangup,
      webphoneResume,
      sourceIcons,
      renderContactName,
      renderExtraButton,
      contactDisplayStyle,
      isOnConferenceCall,
      webphoneHold,
      onClick,
      showMergeCall,
      showHold,
      showAvatar,
      disableMerge,
      onMergeCall,
      showCallDetail,
      webphoneAnswer,
      ringoutHangup,
      ringoutTransfer,
      showRingoutCallControl,
    } = this.props;

    const { avatarUrl, extraNum } = this.state;
    const phoneNumber = this.getPhoneNumber();
    const contactMatches = this.getContactMatches();
    const fallbackContactName = this.getFallbackContactName();
    const ringing = isRinging(this.props.call);
    const contactName = typeof renderContactName === 'function' ?
      renderContactName(this.props.call) :
      undefined;
    const extraButton = typeof renderExtraButton === 'function' ?
      <div className={styles.extraButton}>{renderExtraButton(this.props.call)}</div> :
      undefined;
    return (
      <div
        onClick={onClick}
        className={classnames(styles.callItemContainer, onClick
        ? styles.pointer
        : null)}
      >
        <MediaObject
          containerCls={styles.wrapper}
          mediaLeft={
            <CallIcon
              direction={direction}
              ringing={ringing}
              active
              missed={false}
              inboundTitle={i18n.getString('inboundCall', currentLocale)}
              outboundTitle={i18n.getString('outboundCall', currentLocale)}
              missedTitle={i18n.getString('missedCall', currentLocale)}
              isOnConferenceCall={isOnConferenceCall}
              showAvatar={showAvatar}
              avatarUrl={avatarUrl}
              extraNum={extraNum}
            />
          }
          bodyCls={styles.content}
          mediaBody={
            <div>
              <ContactDisplay
                isOnConferenceCall={isOnConferenceCall}
                contactName={contactName}
                className={classnames(styles.contactDisplay, contactDisplayStyle)}
                contactMatches={contactMatches}
                selected={this.state.selected}
                onSelectContact={this.onSelectContact}
                disabled
                iconClassName={styles.icon}
                isLogging={isLogging || this.state.isLogging}
                fallBackName={fallbackContactName}
                enableContactFallback={enableContactFallback}
                areaCode={areaCode}
                countryCode={countryCode}
                phoneNumber={phoneNumber}
                currentLocale={currentLocale}
                brand={brand}
                showPlaceholder={showContactDisplayPlaceholder}
                showType={false}
                sourceIcons={sourceIcons}
                stopPropagation
              />
              {showCallDetail ? this.getCallInfo() : null}
            </div>
          }
          mediaRight={
            <div className={styles.actionIconsBox}>
              {
                webphoneSession ?
                  <WebphoneButtons
                    session={webphoneSession}
                    webphoneReject={this.webphoneToVoicemail}
                    webphoneHangup={webphoneHangup}
                    webphoneResume={webphoneResume}
                    webphoneHold={webphoneHold}
                    currentLocale={currentLocale}
                    showMergeCall={showMergeCall}
                    showHold={showHold}
                    disableMerge={disableMerge}
                    onMergeCall={onMergeCall}
                    webphoneAnswer={webphoneAnswer}
                /> :
                  <RingoutButtons
                    showRingoutCallControl={showRingoutCallControl}
                    sessionId={sessionId}
                    disableLinks={disableLinks}
                    currentLocale={currentLocale}
                    ringing={ringing}
                    ringoutHangup={ringoutHangup}
                    ringoutTransfer={ringoutTransfer}
                />
              }
              {extraButton}
            </div>
        }
      />
      </div>
    );
  }
}

ActiveCallItem.propTypes = {
  call: PropTypes.shape({
    direction: PropTypes.string.isRequired,
    telephonyStatus: PropTypes.string,
    startTime: PropTypes.number.isRequired,
    activityMatches: PropTypes.array.isRequired,
    fromMatches: PropTypes.array.isRequired,
    toMatches: PropTypes.array.isRequired,
    from: PropTypes.shape({
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    to: PropTypes.shape({
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
      name: PropTypes.string,
    }),
    webphoneSession: PropTypes.object,
    sessionId: PropTypes.string,
  }).isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  disableLinks: PropTypes.bool,
  isLogging: PropTypes.bool,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneToVoicemail: PropTypes.func,
  webphoneHold: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  renderContactName: PropTypes.func,
  renderExtraButton: PropTypes.func,
  contactDisplayStyle: PropTypes.string,
  isOnConferenceCall: PropTypes.bool,
  onClick: PropTypes.func,
  showAvatar: PropTypes.bool,
  getAvatarUrl: PropTypes.func,
  showMergeCall: PropTypes.bool,
  showHold: PropTypes.bool,
  disableMerge: PropTypes.bool,
  onMergeCall: PropTypes.func,
  showCallDetail: PropTypes.bool,
  updateSessionMatchedContact: PropTypes.func,
  webphoneAnswer: PropTypes.func,
  ringoutHangup: PropTypes.func,
  ringoutTransfer: PropTypes.func,
  showRingoutCallControl: PropTypes.bool,
};

ActiveCallItem.defaultProps = {
  isLogging: false,
  disableLinks: false,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  webphoneHold: undefined,
  enableContactFallback: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  isOnConferenceCall: false,
  onClick: undefined,
  showAvatar: true,
  getAvatarUrl: undefined,
  showMergeCall: false,
  showHold: true,
  disableMerge: false,
  onMergeCall: i => i,
  showCallDetail: false,
  updateSessionMatchedContact: i => i,
  webphoneAnswer: i => i,
  ringoutHangup: undefined,
  ringoutTransfer: undefined,
  showRingoutCallControl: false,
};
