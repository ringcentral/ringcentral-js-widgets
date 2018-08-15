import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import { isInbound } from 'ringcentral-integration/lib/callLogHelpers';
import { isOnHold } from 'ringcentral-integration/modules/Webphone/webphoneHelper';

import CallAvatar from '../CallAvatar';
import ContactDisplay from '../ContactDisplay';
import CircleButton from '../CircleButton';
import EndIcon from '../../assets/images/End.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import MergeIntoConferenceIcon from '../../assets/images/MergeIntoConferenceIcon.svg';
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

  setAvatar() {
    const {
      getAvatarUrl, call, isOnConferenceCall, conferenceCallParties
    } = this.props;

    if (isOnConferenceCall) {
      this.setState({
        avatarUrl: conferenceCallParties.map(profile => profile.avatarUrl)[0],
        extraNum: conferenceCallParties.length > 0 ? conferenceCallParties.length - 1 : 0
      });
      return;
    }

    if (!call.webphoneSession) {
      const nameMatches = call.toMatches || [];
      const contact = nameMatches && nameMatches[0];
      getAvatarUrl(contact).then((avatarUrl) => {
        if (this._mounted) {
          this.setState({ avatarUrl });
        }
      });
      return;
    }

    let contact = call.webphoneSession.contactMatch;

    if (!contact) {
      const nameMatches = call.toMatches || [];
      contact = nameMatches && nameMatches[0];
    }
    if (!isOnConferenceCall) {
      getAvatarUrl(contact).then((avatarUrl) => {
        if (this._mounted) {
          this.setState({ avatarUrl });
        }
      });
    }
  }

  componentDidMount() {
    this._mounted = true;
    this.setAvatar();
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

  onSelectContact = (value) => {
    const nameMatches = this.getContactMatches();
    const selected = nameMatches.findIndex(
      match => match.id === value.id
    );
    this._userSelection = true;
    this.setState({
      selected,
    });
    if (
      this.props.call.activityMatches.length > 0 &&
      this.props.autoLog
    ) {
      this.logCall({ redirect: false, selected });
    }
  }

  getSelectedContact = (selected = this.state.selected) => {
    const contactMatches = this.getContactMatches();
    return (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null;
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
        webphoneSession,
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
      disableMerge,
      onMergeCall,
      showCallDetail,
    } = this.props;

    const { avatarUrl, extraNum } = this.state;
    const phoneNumber = this.getPhoneNumber();
    const contactMatches = this.getContactMatches();
    const fallbackContactName = this.getFallbackContactName();
    const contactName = typeof renderContactName === 'function' ?
      renderContactName(this.props.call) :
      undefined;
    const extraButton = typeof renderExtraButton === 'function' ?
      renderExtraButton(this.props.call) :
      undefined;

    return (
      <div onClick={onClick} className={classnames(styles.callItemContainer, styles.pointer)}>
        <MediaObject
          containerCls={styles.wrapper}
          mediaLeft={
            <div className={classnames(styles.callIcon, styles.avatar)}>
              <CallAvatar
                isOnConferenceCall={isOnConferenceCall}
                avatarUrl={avatarUrl}
                extraNum={extraNum} />
            </div>
          }
          bodyCls={styles.content}
          mediaBody={
            <div>
              <ContactDisplay
                isOnConferenceCall={isOnConferenceCall}
                contactName={contactName}
                className={
                isOnConferenceCall
                  ? classnames(styles.conferenceContactDisplay)
                  : classnames(styles.contactDisplay, contactDisplayStyle)
              }
                contactMatches={contactMatches}
                selected={this.state.selected}
                onSelectContact={this.onSelectContact}
                disabled={disableLinks}
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
            <div>
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
            />
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
  autoLog: PropTypes.bool,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  renderContactName: PropTypes.func,
  renderExtraButton: PropTypes.func,
  contactDisplayStyle: PropTypes.string,
  isOnConferenceCall: PropTypes.bool,
  onClick: PropTypes.func,
  getAvatarUrl: PropTypes.func,
  conferenceCallParties: PropTypes.arrayOf(PropTypes.object),
  showMergeCall: PropTypes.bool,
  showHold: PropTypes.bool,
  disableMerge: PropTypes.bool,
  onMergeCall: PropTypes.func,
  showCallDetail: PropTypes.bool,
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
  autoLog: false,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  isOnConferenceCall: false,
  onClick: undefined,
  getAvatarUrl: i => i,
  conferenceCallParties: [],
  showMergeCall: false,
  showHold: true,
  disableMerge: false,
  onMergeCall: i => i,
  showCallDetail: false,
};
