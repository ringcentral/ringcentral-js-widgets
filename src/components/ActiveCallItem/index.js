import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import DurationCounter from '../DurationCounter';

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
}) {
  return (
    <div className={styles.callIcon}>
      <span
        className={classnames(
          missed ? callIconMap.missed : callIconMap[direction],
          active && styles.activeCall,
          ringing && styles.ringing,
          missed && styles.missed,
        )} />
    </div>
  );
}
CallIcon.propTypes = {
  direction: PropTypes.string.isRequired,
  missed: PropTypes.bool,
  active: PropTypes.bool,
  ringing: PropTypes.bool,
};
CallIcon.defaultProps = {
  missed: false,
  active: false,
  ringing: false,
};

export default class CallItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      call: {
        direction,
        telephonyStatus,
        result,
        startTime,
        duration,
        activityMatches,
        webphoneSession,
      },
      currentLocale,
      webphoneAnswer,
      webphoneReject,
      webphoneHangup,
      webphoneResume,
    } = this.props;

    const durationEl = disableLinks ?
        i18n.getString('unavailable', currentLocale) :
        <DurationCounter startTime={startTime} />;
    let dateEl;
    let statusEl;
    if (active) {
      statusEl = i18n.getString(result || telephonyStatus, currentLocale);
    }
    let webphoneEl;
    if (webphoneSession) {
      let hangupFunc = webphoneHangup;
      let resumeFunc = webphoneResume;
      if (
        webphoneSession.direction === callDirections.inbound &&
        webphoneSession.callStatus === sessionStatus.connecting
      ) {
        hangupFunc = webphoneReject;
        resumeFunc = webphoneAnswer;
      }
      webphoneEl = (
        <div className={styles.webphoneButtons}>
          <Button
            className={classnames(styles.webphoneButton, styles.rejectWebphoneButton)}
            onClick={() => hangupFunc(webphoneSession.id)}
          >
            <i className={dynamicsFont.missed} />
          </Button>
          <Button
            className={styles.webphoneButton}
            onClick={() => resumeFunc(webphoneSession.id)}
          >
            <i className={dynamicsFont.call} />
          </Button>
        </div>
      );
    }
    return (
      <div className={styles.root}>
        <CallIcon
          direction={direction}
          ringing={ringing}
          active={active}
          missed={missed}
        />
        <ContactDisplay
          className={classnames(
            styles.contactDisplay,
            missed && styles.missed,
            active && styles.active,
          )}
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
        />
        <div className={styles.details} >
          {durationEl} | {dateEl}{statusEl}
        </div>
        <ActionMenu
          currentLocale={currentLocale}
          onLog={onLogCall && this.logCall}
          onViewEntity={onViewContact && this.viewSelectedContact}
          onCreateEntity={onCreateContact && this.createSelectedContact}
          hasEntity={!!contactMatches.length}
          onClickToDial={onClickToDial && this.clickToDial}
          onClickToSms={
            showClickToSms ?
              () => this.clickToSms({ countryCode, areaCode })
              : undefined
          }
          phoneNumber={phoneNumber}
          disableLinks={disableLinks}
          disableClickToDial={disableClickToDial}
          isLogging={isLogging || this.state.isLogging}
          isLogged={activityMatches.length > 0}
          isCreating={this.state.isCreating}
        />
      </div>
    );
  }
}

CallItem.propTypes = {
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
  onLogCall: PropTypes.func,
  onViewContact: PropTypes.func,
  onCreateContact: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  isLoggedContact: PropTypes.func,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  active: PropTypes.bool.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  isLogging: PropTypes.bool,
  // webphoneAnswer: PropTypes.func,
  // webphoneReject: PropTypes.func,
  // webphoneHangup: PropTypes.func,
  // webphoneResume: PropTypes.func,
  enableContactFallback: PropTypes.bool,
};

CallItem.defaultProps = {
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
  // webphoneAnswer: () => null,
  // webphoneReject: () => null,
  // webphoneHangup: () => null,
  // webphoneResume: () => null,
  enableContactFallback: undefined,
};
