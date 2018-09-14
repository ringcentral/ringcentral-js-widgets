import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SpinnerOverlay from '../SpinnerOverlay';
import ActiveCallList from '../ActiveCallList';
import styles from './styles.scss';
import i18n from './i18n';
import InsideModal from '../InsideModal';
import LogSection from '../LogSection';

export default class ActiveCallsPanel extends Component {
  componentDidMount() {
    if (
      !this.hasCalls(this.props) &&
      typeof this.props.onCallsEmpty === 'function'
    ) {
      this.props.onCallsEmpty();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.hasCalls(this.props) &&
      !this.hasCalls(nextProps) &&
      typeof this.props.onCallsEmpty === 'function'
    ) {
      this.props.onCallsEmpty();
    }
  }

  hasCalls(props = this.props) {
    return (
      props.activeRingCalls.length > 0 ||
      props.activeOnHoldCalls.length > 0 ||
      props.activeCurrentCalls.length > 0 ||
      props.otherDeviceCalls.length > 0
    );
  }

  renderLogSection() {
    if (!this.props.currentLog) return null;

    const {
      formatPhone,
      currentLocale,
      currentLog,
      // - styles
      // sectionContainerStyles,
      // sectionModalStyles,
      // - aditional
      // additionalInfo,
      // showSaveLogBtn,
      renderEditLogSection,
      renderSaveLogButton,
      onSaveCallLog,
      onUpdateCallLog,
      onCloseLogSection,
    } = this.props;

    return (
      <InsideModal
        title={currentLog.title}
        show={currentLog.showLog}
        onClose={onCloseLogSection}
        // containerStyles={sectionContainerStyles}
        // modalStyles={sectionModalStyles}
        >
        <LogSection
          currentLocale={currentLocale}
          currentLog={currentLog}
          // additionalInfo={additionalInfo}
          isInnerMask={false}
          renderEditLogSection={renderEditLogSection}
          renderSaveLogButton={renderSaveLogButton}
          formatPhone={formatPhone}
          onUpdateCallLog={onUpdateCallLog}
          onSaveCallLog={onSaveCallLog}
          showSaveLogBtn
        />
      </InsideModal>
    );
  }

  getCallList(calls, title, showCallDetail = false) {
    const {
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
      enableContactFallback,
      webphoneToVoicemail,
      sourceIcons,
      activeCurrentCalls,
      isWebRTC,
      isSessionAConferenceCall,
      onCallItemClick,
      showAvatar,
      getAvatarUrl,
      conferenceCallParties,
      webphoneHold,
      useV2,
      updateSessionMatchedContact,
      renderExtraButton,
      renderContactName
    } = this.props;

    return (
      <ActiveCallList
        title={title}
        calls={calls}
        currentLocale={currentLocale}
        areaCode={areaCode}
        countryCode={countryCode}
        brand={brand}
        showContactDisplayPlaceholder={showContactDisplayPlaceholder}
        formatPhone={formatPhone}
        onClickToSms={onClickToSms}
        onCreateContact={onCreateContact}
        onViewContact={onViewContact}
        outboundSmsPermission={outboundSmsPermission}
        internalSmsPermission={internalSmsPermission}
        isLoggedContact={isLoggedContact}
        onLogCall={onLogCall}
        autoLog={autoLog}
        loggingMap={loggingMap}
        webphoneAnswer={webphoneAnswer}
        webphoneReject={webphoneReject}
        webphoneHangup={webphoneHangup}
        webphoneResume={webphoneResume}
        webphoneToVoicemail={webphoneToVoicemail}
        renderExtraButton={renderExtraButton}
        renderContactName={renderContactName}
        enableContactFallback={enableContactFallback}
        sourceIcons={sourceIcons}
        isWebRTC={isWebRTC}
        currentCall={activeCurrentCalls[0]}
        isSessionAConferenceCall={isSessionAConferenceCall}
        useV2={useV2}// TODO: Maybe we should make all the call item consistent
        onCallItemClick={onCallItemClick}
        showAvatar={showAvatar}
        getAvatarUrl={getAvatarUrl}
        conferenceCallParties={conferenceCallParties}
        webphoneHold={webphoneHold}
        showCallDetail={showCallDetail}
        updateSessionMatchedContact={updateSessionMatchedContact}
      />
    );
  }

  render() {
    const {
      activeRingCalls,
      activeOnHoldCalls,
      activeCurrentCalls,
      otherDeviceCalls,
      className,
      currentLocale,
      showSpinner,
      showOtherDevice,
    } = this.props;
    const logSection = this.renderLogSection();

    if (!this.hasCalls()) {
      return (
        <div className={classnames(styles.root, className)}>
          <p className={styles.noCalls}>{i18n.getString('noActiveCalls', currentLocale)}</p>
          {logSection}
          {showSpinner ? <SpinnerOverlay className={styles.spinner} /> : null}
        </div>
      );
    }
    const otherDevice = showOtherDevice ? this.getCallList(otherDeviceCalls, i18n.getString('otherDeviceCall', currentLocale), true) : null;
    return (
      <div className={styles.root}>
        <div
          className={classnames(styles.root, className)}
          ref={(target) => { this.container = target; }}
        >
          {this.getCallList(activeRingCalls, i18n.getString('ringCall', currentLocale))}
          {this.getCallList(activeCurrentCalls, i18n.getString('currentCall', currentLocale))}
          {this.getCallList(activeOnHoldCalls, i18n.getString('onHoldCall', currentLocale))}
          {otherDevice}
        </div>
        {logSection}
        {showSpinner ? <SpinnerOverlay className={styles.spinner} /> : null}
      </div>
    );
  }
}

ActiveCallsPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeRingCalls: PropTypes.array.isRequired,
  activeOnHoldCalls: PropTypes.array.isRequired,
  activeCurrentCalls: PropTypes.array.isRequired,
  otherDeviceCalls: PropTypes.array.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
  onClickToSms: PropTypes.func,
  onCreateContact: PropTypes.func,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  isLoggedContact: PropTypes.func,
  onLogCall: PropTypes.func,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneToVoicemail: PropTypes.func,
  autoLog: PropTypes.bool,
  onViewContact: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  loggingMap: PropTypes.object,
  onCallsEmpty: PropTypes.func,
  sourceIcons: PropTypes.object,
  isWebRTC: PropTypes.bool.isRequired,
  showSpinner: PropTypes.bool,
  isSessionAConferenceCall: PropTypes.func,
  onCallItemClick: PropTypes.func,
  getAvatarUrl: PropTypes.func,
  conferenceCallParties: PropTypes.arrayOf(PropTypes.object),
  webphoneHold: PropTypes.func,
  useV2: PropTypes.bool,
  updateSessionMatchedContact: PropTypes.func,
  // CallLog related
  currentLog: PropTypes.object,
  renderEditLogSection: PropTypes.func,
  renderSaveLogButton: PropTypes.func,
  renderExtraButton: PropTypes.func,
  onSaveCallLog: PropTypes.func,
  onUpdateCallLog: PropTypes.func,
  onCloseLogSection: PropTypes.func,
  // Contact
  showAvatar: PropTypes.bool,
  renderContactName: PropTypes.func,
  showOtherDevice: PropTypes.bool,
};

ActiveCallsPanel.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  onViewContact: undefined,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  enableContactFallback: undefined,
  loggingMap: {},
  autoLog: false,
  onCallsEmpty: undefined,
  sourceIcons: undefined,
  showSpinner: false,
  isSessionAConferenceCall: () => false,
  onCallItemClick: false,
  getAvatarUrl: i => i,
  conferenceCallParties: [],
  webphoneHold: i => i,
  useV2: false,
  updateSessionMatchedContact: i => i,
  // CallLog related
  currentLog: undefined,
  renderEditLogSection: undefined,
  renderSaveLogButton: undefined,
  renderExtraButton: undefined,
  onSaveCallLog: undefined,
  onUpdateCallLog: undefined,
  onCloseLogSection: undefined,
  // Contact
  showAvatar: true,
  renderContactName: undefined,
  showOtherDevice: true
};
