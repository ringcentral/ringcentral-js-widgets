import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';
import {
  isInbound,
  isRinging,
  isMissed,
} from 'ringcentral-integration/lib/callLogHelpers';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import DurationCounter from '../DurationCounter';
import ContactDisplay from '../ContactDisplay';
import Button from '../Button';
import CircleButton from '../CircleButton';
import EndIcon from '../../assets/images/End.svg';
import AnswerIcon from '../../assets/images/Answer.svg';

import styles from './styles.scss';

import i18n from './i18n';

const callIconMap = {
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
  missed: dynamicsFont.missed,
};

function CallIcon({
  direction,
  missed,
  active,
  ringing,
  inboundTitle,
  outboundTitle,
  missedTitle,
}) {
  const title = missed ? missedTitle :
    ((direction === callDirections.inbound) ? inboundTitle : outboundTitle);
  return (
    <div className={styles.callIcon}>
      <span
        className={classnames(
          missed ? callIconMap.missed : callIconMap[direction],
          active && styles.activeCall,
          ringing && styles.ringing,
          missed && styles.missed,
        )}
        title={title}
      />
    </div>
  );
}

CallIcon.propTypes = {
  direction: PropTypes.string.isRequired,
  missed: PropTypes.bool,
  active: PropTypes.bool,
  ringing: PropTypes.bool,
  inboundTitle: PropTypes.string,
  outboundTitle: PropTypes.string,
  missedTitle: PropTypes.string,
};

CallIcon.defaultProps = {
  missed: false,
  active: false,
  ringing: false,
  inboundTitle: undefined,
  outboundTitle: undefined,
  missedTitle: undefined,
};

function ClickToSmsButton({
  className,
  onClickToSms,
  disableLinks,
  phoneNumber,
  title,
}) {
  return (
    <Button
      className={classnames(styles.sms, className)}
      onClick={onClickToSms}
      disabled={disableLinks || !phoneNumber} >
      <span
        className={dynamicsFont.composeText}
        title={title}
      />
    </Button>
  );
}

ClickToSmsButton.propTypes = {
  className: PropTypes.string,
  onClickToSms: PropTypes.func,
  disableLinks: PropTypes.bool,
  phoneNumber: PropTypes.string,
};
ClickToSmsButton.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
};

function AddContactButton({
  className,
  onAddContact,
  disableLinks,
  phoneNumber,
  title,
}) {
  return (
    <Button
      className={classnames(styles.addContact, className)}
      onClick={onAddContact}
      disabled={disableLinks || !phoneNumber} >
      <span
        className={dynamicsFont.add2}
        title={title}
      />
    </Button>
  );
}

function ExtendIcon() {
  return (
    <div className={styles.extendIcon}>
      <div className={styles.extendInner} />
      <div className={styles.extendInnerIcon} />
    </div>
  );
}

export default class ActiveCallItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      isLogging: false,
      extended: false,
    };
    this._userSelection = false;

    this.toggleExtended = () => {
      console.log('clicked');
      this.setState(preState => ({
        extended: !preState.extended,
      }));
    };
  }

  onSelectContact = (value, idx) => {
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

  getWebphoneButtons() {
    const {
      call: {
        webphoneSession,
      },
      webphoneAnswer,
      webphoneReject,
      webphoneHangup,
      webphoneResume,
    } = this.props;
    if (!webphoneSession) {
      return null;
    }
    let hangupFunc = webphoneHangup;
    let resumeFunc = webphoneResume;
    if (
      webphoneSession.direction === callDirections.inbound &&
      webphoneSession.callStatus === sessionStatus.connecting
    ) {
      hangupFunc = webphoneReject;
      resumeFunc = webphoneAnswer;
    }
    const onHangupFunc = (e) => {
      e.stopPropagation();
      hangupFunc(webphoneSession.id);
    };
    const onResumeFunc = (e) => {
      e.stopPropagation();
      resumeFunc(webphoneSession.id);
    };
    return (
      <div className={styles.webphoneButtons}>
        <CircleButton
          className={styles.rejectButton}
          onClick={onHangupFunc}
          icon={EndIcon}
          showBorder={false}
        />
        <CircleButton
          className={styles.answerButton}
          onClick={onResumeFunc}
          icon={AnswerIcon}
          showBorder={false}
        />
      </div>
    );
  }

  getCallInfo() {
    const {
      call: {
        telephonyStatus,
        startTime,
        webphoneSession,
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
            <DurationCounter startTime={startTime} />
        }
        <span className={styles.split}>|</span>
        { i18n.getString(telephonyStatus, currentLocale) }
      </div>
    );
  }

  render() {
    const {
      call: {
        direction,
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
    } = this.props;
    const phoneNumber = this.getPhoneNumber();
    const contactMatches = this.getContactMatches();
    const fallbackContactName = this.getFallbackContactName();
    const ringing = isRinging(this.props.call);
    const webphoneEl = this.getWebphoneButtons();
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
            stopPropagation
          />
          {callDetail}
          {webphoneEl}
        </div>
        <div
          className={classnames(
            styles.actionMenu,
            this.state.extended ? styles.extended : null
          )}
        >
          <ClickToSmsButton
            className={styles.smsButton}
            disableLinks={disableLinks}
            phoneNumber={phoneNumber}
          />
          <AddContactButton
            className={styles.addContactButton}
            disableLinks={disableLinks}
            phoneNumber={phoneNumber}
          />
        </div>
        <ExtendIcon />
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
  isLoggedContact: PropTypes.func,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  isLogging: PropTypes.bool,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  autoLog: PropTypes.bool,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
};

ActiveCallItem.defaultProps = {
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  isLoggedContact: () => false,
  isLogging: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  disableLinks: false,
  webphoneAnswer: () => null,
  webphoneReject: () => null,
  webphoneHangup: () => null,
  webphoneResume: () => null,
  enableContactFallback: undefined,
  autoLog: false,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
};
