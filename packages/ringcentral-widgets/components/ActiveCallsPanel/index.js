import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SpinnerOverlay from '../SpinnerOverlay';
import ActiveCallList from '../ActiveCallList';
import ConfirmMergeModal from '../ConfirmMergeModal';
import styles from './styles.scss';
import i18n from './i18n';

export default class ActiveCallsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      callOfModal: null,
    };

    this.showConfirmMergeModal = (call) => {
      this.setState({
        isModalOpen: true,
        callOfModal: call,
      });
    };

    this.hideConfirmMergeModal = () => {
      this.setState({
        isModalOpen: false,
        callOfModal: null,
      });
    };

    this.confirmMergeCall = () => {
      this.props.mergeToConference([this.state.callOfModal.webphoneSession]);
      this.hideConfirmMergeModal();
    };
  }

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

  getCallList(calls, title) {
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
      conferenceCallEquipped,
      hasConferenceCall,
      disableMerge,
      mergeToConference,
      isSessionAConferenceCall,
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
        enableContactFallback={enableContactFallback}
        sourceIcons={sourceIcons}
        isWebRTC={isWebRTC}
        conferenceCallEquipped={conferenceCallEquipped}
        hasConferenceCall={hasConferenceCall}
        disableMerge={disableMerge}
        currentCall={activeCurrentCalls[0]}
        mergeToConference={mergeToConference}
        isSessionAConferenceCall={isSessionAConferenceCall}
        onConfirmMergeCall={this.showConfirmMergeModal}
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
      conferenceCallEquipped,
      conferenceCallParties,
    } = this.props;

    if (!this.hasCalls()) {
      return (
        <div className={classnames(styles.root, className)}>
          <p className={styles.noCalls}>{i18n.getString('noActiveCalls', currentLocale)}</p>
          {showSpinner ? <SpinnerOverlay className={styles.spinner} /> : null}
        </div>
      );
    }

    return (
      <div className={styles.root}>
        <div
          className={classnames(styles.root, className)}
          ref={(target) => { this.container = target; }}
        >
          {this.getCallList(activeRingCalls, i18n.getString('ringCall', currentLocale))}
          {this.getCallList(activeCurrentCalls, i18n.getString('currentCall', currentLocale))}
          {this.getCallList(activeOnHoldCalls, i18n.getString('onHoldCall', currentLocale))}
          {this.getCallList(otherDeviceCalls, i18n.getString('otherDeviceCall', currentLocale))}
          {
            conferenceCallEquipped
              ? <ConfirmMergeModal
                currentLocale={currentLocale}
                show={this.state.isModalOpen}
                onMerge={this.confirmMergeCall}
                onCancel={this.hideConfirmMergeModal}
                partyProfiles={conferenceCallParties} />
              : null
          }
        </div>
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
  conferenceCallEquipped: PropTypes.bool,
  hasConferenceCall: PropTypes.bool,
  showSpinner: PropTypes.bool,
  disableMerge: PropTypes.bool,
  mergeToConference: PropTypes.func,
  isSessionAConferenceCall: PropTypes.func,
  conferenceCallParties: PropTypes.arrayOf(PropTypes.object),
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
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  showSpinner: false,
  disableMerge: false,
  mergeToConference: i => i,
  isSessionAConferenceCall: () => false,
  conferenceCallParties: [],
};
