import React from 'react';
import callDirections from 'ringcentral-integration/enums/callDirections';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ActiveCallItem from '../ActiveCallItem';
import styles from './styles.scss';

function isConferenceCall(normalizedCall) {
  return normalizedCall.to.phoneNumber.length === 0 && normalizedCall.toName === 'Conference';
}

function ActiveCallList({
  calls,
  className,
  currentLocale,
  areaCode,
  countryCode,
  brand,
  showContactDisplayPlaceholder,
  formatPhone,
  onClickToSms,
  onCreateContact,
  onViewContact,
  outboundSmsPermission,
  internalSmsPermission,
  isLoggedContact,
  onLogCall,
  autoLog,
  loggingMap,
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  webphoneToVoicemail,
  enableContactFallback,
  title,
  sourceIcons,
  isWebRTC,
  currentCall,
  conferenceCallEquipped,
  hasConferenceCall,
  disableMerge,
  mergeToConference,
  isSessionAConferenceCall,
  onConfirmMergeCall,
}) {
  if (!calls.length) {
    return null;
  }

  return (
    <div className={classnames(styles.list, className)}>
      <div className={styles.listTitle}>
        {title}
      </div>
      {
        calls.map((call) => {
          let showMergeCall = false;
          let isOnConferenceCall = false;
          let onMergeCall = null;
          if (conferenceCallEquipped) {
            isOnConferenceCall = call.webphoneSession
              ? isSessionAConferenceCall(call.webphoneSession.id)
              : isConferenceCall(call);// in case it's an other device call
            const isCurrentCallAConf = currentCall
              ? isSessionAConferenceCall(currentCall.webphoneSession.id)
              : false;

            if (!isWebRTC) {
              showMergeCall = false;
            } else if (currentCall) {
              if (call === currentCall) {
                showMergeCall = false;
              } else if (call.direction === callDirections.inbound) {
                showMergeCall = false;
              } else if (currentCall.direction === callDirections.outbound) {
                if (hasConferenceCall) {
                  showMergeCall = true;
                  if (isOnConferenceCall) {
                    onMergeCall = () => mergeToConference([currentCall.webphoneSession]);
                  } else if (isCurrentCallAConf) {
                    onMergeCall = () => mergeToConference([call.webphoneSession]);
                  } else {
                    onMergeCall = () => onConfirmMergeCall(call);
                  }
                } else {
                  showMergeCall = true;
                  const partyCalls = [
                    call.webphoneSession,
                    currentCall.webphoneSession
                  ];
                  onMergeCall = () => mergeToConference(partyCalls);
                }
              } else if (hasConferenceCall) {
                if (isOnConferenceCall) {
                  showMergeCall = false;
                } else {
                  showMergeCall = true;
                  onMergeCall = () => {
                    onConfirmMergeCall(call);
                  };
                }
              } else {
                showMergeCall = false;
              }
            } else {
              showMergeCall = false;
            }
          }

          return (
            <ActiveCallItem
              call={call}
              key={call.id}
              showMergeCall={showMergeCall}
              isOnConferenceCall={isOnConferenceCall}
              currentLocale={currentLocale}
              areaCode={areaCode}
              countryCode={countryCode}
              brand={brand}
              showContactDisplayPlaceholder={showContactDisplayPlaceholder}
              formatPhone={formatPhone}
              onClickToSms={onClickToSms}
              internalSmsPermission={internalSmsPermission}
              outboundSmsPermission={outboundSmsPermission}
              isLoggedContact={isLoggedContact}
              onLogCall={onLogCall}
              onViewContact={onViewContact}
              onCreateContact={onCreateContact}
              onMergeCall={onMergeCall}
              loggingMap={loggingMap}
              webphoneAnswer={webphoneAnswer}
              webphoneReject={webphoneReject}
              webphoneHangup={webphoneHangup}
              webphoneResume={webphoneResume}
              webphoneToVoicemail={webphoneToVoicemail}
              enableContactFallback={enableContactFallback}
              autoLog={autoLog}
              sourceIcons={sourceIcons}
              disableMerge={disableMerge}
              hasActionMenu={!isOnConferenceCall}
            />
          );
        })
      }
    </div>
  );
}

ActiveCallList.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  calls: PropTypes.array.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
  onClickToSms: PropTypes.func,
  onCreateContact: PropTypes.func,
  onViewContact: PropTypes.func,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  isLoggedContact: PropTypes.func,
  onLogCall: PropTypes.func,
  loggingMap: PropTypes.object,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneToVoicemail: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  autoLog: PropTypes.bool,
  sourceIcons: PropTypes.object,
  isWebRTC: PropTypes.bool.isRequired,
  conferenceCallEquipped: PropTypes.bool,
  hasConferenceCall: PropTypes.bool,
  currentCall: PropTypes.object,
  disableMerge: PropTypes.bool,
  mergeToConference: PropTypes.func,
  isSessionAConferenceCall: PropTypes.func,
  onConfirmMergeCall: PropTypes.func,
};

ActiveCallList.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  onViewContact: undefined,
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  currentCall: undefined,
  disableMerge: false,
  mergeToConference: i => i,
  isSessionAConferenceCall: () => false,
  onConfirmMergeCall: i => i,
};

export default ActiveCallList;
