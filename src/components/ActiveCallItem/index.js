import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';
import { isInbound, isRinging } from 'ringcentral-integration/lib/callLogHelpers';
import parseNumber from 'ringcentral-integration/lib/parseNumber';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import DurationCounter from '../DurationCounter';
import ContactDisplay from '../ContactDisplay';
import ActionMenu from '../ActionMenu';
import CircleButton from '../CircleButton';
import EndIcon from '../../assets/images/End.svg';
import AnswerIcon from '../../assets/images/Answer.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';

import styles from './styles.scss';

import i18n from './i18n';

const callIconMap = {
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
};

function CallIcon({
  direction,
  ringing,
  inboundTitle,
  outboundTitle,
}) {
  const title = (direction === callDirections.inbound) ? inboundTitle : outboundTitle;
  return (
    <div className={styles.callIcon}>
      <span
        className={classnames(
          callIconMap[direction],
          styles.activeCall,
          ringing && styles.ringing,
        )}
        title={title}
      />
    </div>
  );
}

CallIcon.propTypes = {
  direction: PropTypes.string.isRequired,
  ringing: PropTypes.bool,
  inboundTitle: PropTypes.string,
  outboundTitle: PropTypes.string,
};

CallIcon.defaultProps = {
  ringing: false,
  inboundTitle: undefined,
  outboundTitle: undefined,
};

function WebphoneButtons({
  session,
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
}) {
  if (!session || !webphoneAnswer || !webphoneHangup) {
    return null;
  }
  let hangupFunc = webphoneHangup;
  let resumeFunc = webphoneResume;
  let endIcon = EndIcon;
  let rejectTitle = i18n.getString('hangup');
  const acceptTitle = i18n.getString('accept');
  if (
    session.direction === callDirections.inbound &&
    session.callStatus === sessionStatus.connecting
  ) {
    hangupFunc = webphoneReject;
    resumeFunc = webphoneAnswer;
    endIcon = VoicemailIcon;
    rejectTitle = i18n.getString('toVoicemail');
  }
  return (
    <div className={styles.webphoneButtons}>
      <span title={rejectTitle}>
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
      <span title={acceptTitle}>
        <CircleButton
          className={styles.answerButton}
          onClick={(e) => {
          e.stopPropagation();
          resumeFunc(session.id);
        }}
          icon={AnswerIcon}
          showBorder={false}
      />
      </span>
    </div>
  );
}

WebphoneButtons.propTypes = {
  session: PropTypes.object,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
};

WebphoneButtons.defaultProps = {
  session: undefined,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
};

export default class ActiveCallItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      isLogging: false,
      extended: false,
      isCreating: false,
    };
    this._userSelection = false;

    this.toggleExtended = (e) => {
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

  getFallbackContactName() {
    return isInbound(this.props.call) ?
      (this.props.call.from.name) :
      (this.props.call.to.name);
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

  getMyPhoneNumber() {
    return isInbound(this.props.call) ?
      (this.props.call.to.phoneNumber || this.props.call.to.extensionNumber) :
      (this.props.call.from.phoneNumber || this.props.call.from.extensionNumber);
  }

  getCallInfo() {
    const {
      call: {
        telephonyStatus,
        startTime,
        webphoneSession,
        offset,
      },
      disableLinks,
      currentLocale,
      formatPhone,
    } = this.props;
    const myPhoneNumber = this.getMyPhoneNumber();
    if (webphoneSession) {
      return (
        <div className={styles.callDetail}>
          <span className={styles.label}>
            {
              isInbound(this.props.call) ?
                i18n.getString('to', currentLocale) :
                i18n.getString('from', currentLocale)
            }:
          </span>
          {formatPhone(myPhoneNumber)}
        </div>
      );
    }
    return (
      <div className={styles.callDetail}>
        {
          disableLinks ?
            i18n.getString('unavailable', currentLocale) :
            <DurationCounter startTime={startTime} offset={offset} />
        }
        <span className={styles.split}>|</span>
        { i18n.getString(telephonyStatus, currentLocale) }
      </div>
    );
  }

  clickToSms = () => {
    if (this.props.onClickToSms) {
      const phoneNumber = this.getPhoneNumber();
      const contact = this.getSelectedContact();
      if (contact) {
        this.props.onClickToSms({
          ...contact,
          phoneNumber,
        });
      } else {
        const formatted = this.props.formatPhone(phoneNumber);
        this.props.onClickToSms({
          name: this.props.enableContactFallback ? this.getFallbackContactName() : formatted,
          phoneNumber,
        }, true);
      }
    }
  }

  createSelectedContact = async (entityType) => {
    // console.log('click createSelectedContact!!', entityType);
    if (typeof this.props.onCreateContact === 'function' &&
      this._mounted &&
      !this.state.isCreating) {
      this.setState({
        isCreating: true,
      });
      // console.log('start to create: isCreating...', this.state.isCreating);
      const phoneNumber = this.getPhoneNumber();
      await this.props.onCreateContact({
        phoneNumber,
        name: this.props.enableContactFallback ? this.getFallbackContactName() : '',
        entityType,
      });

      if (this._mounted) {
        this.setState({
          isCreating: false,
        });
        // console.log('created: isCreating...', this.state.isCreating);
      }
    }
  }

  viewSelectedContact = () => {
    if (typeof this.props.onViewContact === 'function') {
      this.props.onViewContact({
        contact: this.getSelectedContact(),
      });
    }
  }

  async logCall({ redirect = true, selected }) {
    if (
      typeof this.props.onLogCall === 'function' &&
      this._mounted &&
      !this.state.isLogging
    ) {
      this.setState({
        isLogging: true,
      });
      await this.props.onLogCall({
        contact: this.getSelectedContact(selected),
        call: this.props.call,
        redirect,
      });
      if (this._mounted) {
        this.setState({
          isLogging: false,
        });
      }
    }
  }
  logCall = this.logCall.bind(this)

  render() {
    const {
      call: {
        direction,
        activityMatches,
        webphoneSession,
      },
      disableLinks,
      currentLocale,
      areaCode,
      countryCode,
      outboundSmsPermission,
      internalSmsPermission,
      enableContactFallback,
      isLogging,
      brand,
      showContactDisplayPlaceholder,
      onClickToSms,
      onViewContact,
      onCreateContact,
      onLogCall,
      webphoneAnswer,
      webphoneHangup,
      webphoneResume,
      sourceIcons,
    } = this.props;
    const phoneNumber = this.getPhoneNumber();
    const parsedInfo = parseNumber(phoneNumber);
    const isExtension = !parsedInfo.hasPlus &&
      parsedInfo.number.length <= 6;
    const showClickToSms = !!(
      onClickToSms &&
      (
        isExtension ?
          internalSmsPermission :
          outboundSmsPermission
      )
    );
    const contactMatches = this.getContactMatches();
    const fallbackContactName = this.getFallbackContactName();
    const ringing = isRinging(this.props.call);
    const callDetail = this.getCallInfo();

    return (
      <div className={styles.root} onClick={this.toggleExtended}>
        <div className={styles.callInfo}>
          <CallIcon
            direction={direction}
            ringing={ringing}
            active
            missed={false}
            inboundTitle={i18n.getString('inboundCall', currentLocale)}
            outboundTitle={i18n.getString('outboundCall', currentLocale)}
            missedTitle={i18n.getString('missedCall', currentLocale)}
          />
          <ContactDisplay
            className={styles.contactDisplay}
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
          {callDetail}
          <WebphoneButtons
            session={webphoneSession}
            webphoneAnswer={webphoneAnswer}
            webphoneReject={this.webphoneToVoicemail}
            webphoneHangup={webphoneHangup}
            webphoneResume={webphoneResume}
          />
        </div>
        <ActionMenu
          extended={this.state.extended}
          onToggle={this.toggleExtended}
          currentLocale={currentLocale}
          disableLinks={disableLinks}
          phoneNumber={phoneNumber}
          onClickToSms={
            showClickToSms ?
              () => this.clickToSms({ countryCode, areaCode })
              : undefined
          }
          hasEntity={!!contactMatches.length}
          onViewEntity={onViewContact && this.viewSelectedContact}
          onCreateEntity={onCreateContact && this.createSelectedContact}
          textTitle={i18n.getString('text', currentLocale)}
          onLog={onLogCall}
          isLogging={isLogging || this.state.isLogging}
          isLogged={activityMatches.length > 0}
          isCreating={this.state.isCreating}
          addLogTitle={i18n.getString('addLog', currentLocale)}
          editLogTitle={i18n.getString('editLog', currentLocale)}
          createEntityTitle={i18n.getString('addEntity', currentLocale)}
          viewEntityTitle={i18n.getString('viewDetails', currentLocale)}
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
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  isLogging: PropTypes.bool,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneToVoicemail: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  autoLog: PropTypes.bool,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
  onClickToSms: PropTypes.func,
  onCreateContact: PropTypes.func,
  onLogCall: PropTypes.func,
  onViewContact: PropTypes.func,
  sourceIcons: PropTypes.object,
};

ActiveCallItem.defaultProps = {
  onLogCall: undefined,
  onClickToSms: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  isLogging: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  disableLinks: false,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
};
