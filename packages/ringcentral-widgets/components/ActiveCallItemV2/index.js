import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import { isInbound, isOnHold } from 'ringcentral-integration/lib/callLogHelpers';

import CallAvatar from '../CallAvatar';
import ContactDisplay from '../ContactDisplay';
import CircleButton from '../CircleButton';
import EndIcon from '../../assets/images/End.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import MediaObject from '../MediaObject';

import styles from './styles.scss';
import i18n from '../ActiveCallItem/i18n';// Reuse the exsisting translations

function WebphoneButtons({
  currentLocale,
  session,
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  webphoneHold,
}) {
  if (!session || !webphoneAnswer || !webphoneHangup) {
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

  return (
    <div className={styles.webphoneButtons}>
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
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneHold: PropTypes.func,
};

WebphoneButtons.defaultProps = {
  session: undefined,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneHold: undefined,
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
    };
    this._userSelection = false;
    this.contactDisplay = null;

    this.toggleExtended = (e) => {
      if (this.props.isOnConferenceCall) {
        return;
      }
      if ((
        this.contactDisplay &&
        this.contactDisplay.contains(e.target))
      ) {
        return;
      }
      this.setState(preState => ({
        extended: !preState.extended,
      }));
    };

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

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this.toVoicemailTimeout) {
      clearTimeout(this.toVoicemailTimeout);
      this.toVoicemailTimeout = null;
    }
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
      webphoneAnswer,
      webphoneHangup,
      webphoneResume,
      sourceIcons,
      renderContactName,
      renderExtraButton,
      contactDisplayStyle,
      isOnConferenceCall,
      webphoneHold,
      avatarUrl,
      extraNum,
      onClick,
    } = this.props;
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
          mediaLeft={
            <div className={classnames(styles.callIcon, styles.avatar)}>
              <CallAvatar
                isOnConferenceCall={isOnConferenceCall}
                avatarUrl={avatarUrl}
                extraNum={extraNum} />
            </div>
        }
          mediaBody={
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
        }
          mediaRight={
            <div>
              <WebphoneButtons
                session={webphoneSession}
                webphoneAnswer={webphoneAnswer}
                webphoneReject={this.webphoneToVoicemail}
                webphoneHangup={webphoneHangup}
                webphoneResume={webphoneResume}
                webphoneHold={webphoneHold}
                currentLocale={currentLocale}
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
  webphoneAnswer: PropTypes.func,
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
  avatarUrl: PropTypes.string,
  extraNum: PropTypes.number,
  onClick: PropTypes.func,
};

ActiveCallItem.defaultProps = {
  isLogging: false,
  disableLinks: false,
  webphoneAnswer: undefined,
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
  avatarUrl: null,
  extraNum: 0,
  onClick: undefined,
};
