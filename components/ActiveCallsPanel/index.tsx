import React, { Component } from 'react';

import classnames from 'classnames';

import ActiveCallList from '../ActiveCallList';
import InsideModal from '../InsideModal';
import LogNotification from '../LogNotification';
import LogSection from '../LogSection';
import { SpinnerOverlay } from '../SpinnerOverlay';
import i18n from './i18n';
import styles from './styles.scss';

type ActiveCallsPanelProps = {
  currentLocale: string;
  className?: string;
  activeRingCalls: any[];
  activeOnHoldCalls: any[];
  activeCurrentCalls: any[];
  otherDeviceCalls: any[];
  areaCode: string;
  countryCode: string;
  brand?: string;
  showContactDisplayPlaceholder?: boolean;
  formatPhone: (...args: any[]) => any;
  onClickToSms?: (...args: any[]) => any;
  onCreateContact?: (...args: any[]) => any;
  outboundSmsPermission?: boolean;
  internalSmsPermission?: boolean;
  isLoggedContact?: (...args: any[]) => any;
  onLogCall?: (...args: any[]) => any;
  webphoneAnswer?: (...args: any[]) => any;
  webphoneReject?: (...args: any[]) => any;
  webphoneHangup?: (...args: any[]) => any;
  webphoneResume?: (...args: any[]) => any;
  webphoneToVoicemail?: (...args: any[]) => any;
  webphoneSwitchCall?: (...args: any[]) => any;
  webphoneIgnore?: (...args: any[]) => any;
  modalConfirm?: (...args: any[]) => any;
  modalClose?: (...args: any[]) => any;
  autoLog?: boolean;
  onViewContact?: (...args: any[]) => any;
  enableContactFallback?: boolean;
  loggingMap?: object;
  onCallsEmpty?: (...args: any[]) => any;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  isWebRTC: boolean;
  showSpinner?: boolean;
  isSessionAConferenceCall?: (...args: any[]) => any;
  onCallItemClick?: (...args: any[]) => any;
  getAvatarUrl?: (...args: any[]) => any;
  conferenceCallParties?: object[];
  webphoneHold?: (...args: any[]) => any;
  useV2?: boolean;
  updateSessionMatchedContact?: (...args: any[]) => any;
  isOnHold: (...args: any[]) => any;
  currentLog?: object;
  renderEditLogSection?: (...args: any[]) => any;
  renderSaveLogButton?: (...args: any[]) => any;
  renderExtraButton?: (...args: any[]) => any;
  onSaveCallLog?: (...args: any[]) => any;
  onUpdateCallLog?: (...args: any[]) => any;
  onCloseLogSection?: (...args: any[]) => any;
  logNotification?: object;
  onCloseNotification?: (...args: any[]) => any;
  onDiscardNotification?: (...args: any[]) => any;
  onSaveNotification?: (...args: any[]) => any;
  onExpandNotification?: (...args: any[]) => any;
  showNotiLogButton?: boolean;
  notificationContainerStyles?: string;
  showAvatar?: boolean;
  renderContactName?: (...args: any[]) => any;
  renderSubContactName?:(...args: any[]) => any;
  showOtherDevice?: boolean;
  ringoutHangup?: (...args: any[]) => any;
  ringoutTransfer?: (...args: any[]) => any;
  ringoutReject?: (...args: any[]) => any;
  disableLinks?: boolean;
  showRingoutCallControl?: boolean;
  showMultipleMatch?: boolean;
  showSwitchCall?: boolean;
  showTransferCall?: boolean;
  showHoldOnOtherDevice?: boolean;
  onLogBasicInfoClick?: (...args: any[]) => any;
  renderSmallCallContrl?: (...args: any[]) => any;
  showCallDetail?: boolean;
  showIgnoreBtn?: boolean;
  showHoldAnswerBtn?: boolean;
  useCallDetailV2?: boolean;
  newCallIcon?: boolean;
  clickSwitchTrack?: (...args: any[]) => any;
  isWide?: boolean;
};
class ActiveCallsPanel extends Component<ActiveCallsPanelProps, {}> {
  componentDidMount() {
    if (
      !this.hasCalls(this.props) &&
      typeof this.props.onCallsEmpty === 'function'
    ) {
      this.props.onCallsEmpty();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
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
      // notification
      logNotification,
      showNotiLogButton,
      onCloseNotification,
      onSaveNotification,
      onExpandNotification,
      onDiscardNotification,
      notificationContainerStyles,
      onLogBasicInfoClick,
      renderSmallCallContrl,
    } = this.props;
    return (
      <div>
        <InsideModal
          title={currentLog.title}
          show={currentLog.showLog}
          onClose={onCloseLogSection}
          clickOutToClose={false}
          maskStyle={styles.maskStyle}
        >
          <LogSection
            currentLocale={currentLocale}
            currentLog={currentLog}
            formatPhone={formatPhone}
            // additionalInfo={additionalInfo}
            isInnerMask={
              logNotification && logNotification.notificationIsExpand
            }
            // save call log
            renderEditLogSection={renderEditLogSection}
            showSaveLogBtn
            onUpdateCallLog={onUpdateCallLog}
            onSaveCallLog={onSaveCallLog}
            renderSaveLogButton={renderSaveLogButton}
            // active call ctrl
            onLogBasicInfoClick={onLogBasicInfoClick}
            renderSmallCallContrl={renderSmallCallContrl}
          />
        </InsideModal>
        {logNotification ? (
          <InsideModal
            show={logNotification.showNotification}
            showTitle={false}
            containerStyles={classnames(
              styles.notificationContainer,
              notificationContainerStyles,
            )}
            modalStyles={styles.notificationModal}
            contentStyle={styles.notificationContent}
            onClose={onCloseNotification}
          >
            <LogNotification
              showLogButton={showNotiLogButton}
              currentLocale={currentLocale}
              formatPhone={formatPhone}
              currentLog={logNotification}
              isExpand={logNotification.notificationIsExpand}
              onSave={onSaveNotification}
              onExpand={onExpandNotification}
              onDiscard={onDiscardNotification}
              onStay={onCloseNotification}
            />
          </InsideModal>
        ) : null}
      </div>
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
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      activeCurrentCalls,
      isWebRTC,
      isSessionAConferenceCall,
      onCallItemClick,
      showAvatar,
      getAvatarUrl,
      conferenceCallParties,
      webphoneHold,
      webphoneSwitchCall,
      modalConfirm,
      modalClose,
      useV2,
      updateSessionMatchedContact,
      renderExtraButton,
      renderContactName,
      renderSubContactName,
      ringoutHangup,
      ringoutTransfer,
      ringoutReject,
      disableLinks,
      showRingoutCallControl,
      showMultipleMatch,
      showSwitchCall,
      showTransferCall,
      showHoldOnOtherDevice,
      isOnHold,
      // customization
      webphoneIgnore,
      showIgnoreBtn,
      showHoldAnswerBtn,
      useCallDetailV2,
      newCallIcon,
      clickSwitchTrack,
      isWide,
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
        webphoneSwitchCall={webphoneSwitchCall}
        webphoneIgnore={webphoneIgnore}
        modalConfirm={modalConfirm}
        modalClose={modalClose}
        webphoneToVoicemail={webphoneToVoicemail}
        renderExtraButton={renderExtraButton}
        renderContactName={renderContactName}
        renderSubContactName={renderSubContactName}
        enableContactFallback={enableContactFallback}
        sourceIcons={sourceIcons}
        phoneTypeRenderer={phoneTypeRenderer}
        phoneSourceNameRenderer={phoneSourceNameRenderer}
        isWebRTC={isWebRTC}
        currentCall={activeCurrentCalls[0]}
        isSessionAConferenceCall={isSessionAConferenceCall}
        useV2={useV2} // TODO: Maybe we should make all the call item consistent
        onCallItemClick={onCallItemClick}
        showAvatar={showAvatar}
        getAvatarUrl={getAvatarUrl}
        conferenceCallParties={conferenceCallParties}
        webphoneHold={webphoneHold}
        showCallDetail={showCallDetail}
        updateSessionMatchedContact={updateSessionMatchedContact}
        ringoutHangup={ringoutHangup}
        ringoutTransfer={ringoutTransfer}
        ringoutReject={ringoutReject}
        disableLinks={disableLinks}
        showRingoutCallControl={showRingoutCallControl}
        showMultipleMatch={showMultipleMatch}
        showSwitchCall={showSwitchCall}
        showTransferCall={showTransferCall}
        showHoldOnOtherDevice={showHoldOnOtherDevice}
        isOnHold={isOnHold}
        showIgnoreBtn={showIgnoreBtn}
        showHoldAnswerBtn={showHoldAnswerBtn}
        useCallDetailV2={useCallDetailV2}
        newCallIcon={newCallIcon}
        clickSwitchTrack={clickSwitchTrack}
        isWide={isWide}
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
      showCallDetail,
    } = this.props;
    const logSection = this.renderLogSection();
    if (!this.hasCalls()) {
      return (
        <div
          data-sign="activeCalls"
          className={classnames(styles.root, className)}
        >
          <p className={styles.noCalls}>
            {i18n.getString('noActiveCalls', currentLocale)}
          </p>
          {logSection}
          {showSpinner ? <SpinnerOverlay className={styles.spinner} /> : null}
        </div>
      );
    }
    const otherDevice = showOtherDevice
      ? this.getCallList(
          otherDeviceCalls,
          i18n.getString('otherDeviceCall', currentLocale),
          true,
        )
      : null;
    return (
      <div data-sign="activeCalls" className={styles.root}>
        <div
          className={classnames(styles.root, className)}
          ref={(target) => {
            this.container = target;
          }}
        >
          {this.getCallList(
            activeRingCalls,
            i18n.getString('ringCall', currentLocale),
            showCallDetail,
          )}
          {this.getCallList(
            activeCurrentCalls,
            i18n.getString('currentCall', currentLocale),
            showCallDetail,
          )}
          {this.getCallList(
            activeOnHoldCalls,
            i18n.getString('onHoldCall', currentLocale),
            showCallDetail,
          )}
          {otherDevice}
        </div>
        {logSection}
        {showSpinner ? <SpinnerOverlay className={styles.spinner} /> : null}
      </div>
    );
  }
}
ActiveCallsPanel.defaultProps = {
  isWide: true,
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
  webphoneSwitchCall: undefined,
  webphoneIgnore: undefined,
  modalConfirm: undefined,
  modalClose: undefined,
  enableContactFallback: undefined,
  loggingMap: {},
  autoLog: false,
  onCallsEmpty: undefined,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  showSpinner: false,
  isSessionAConferenceCall: () => false,
  onCallItemClick: false,
  getAvatarUrl: undefined,
  conferenceCallParties: [],
  webphoneHold: (i) => i,
  useV2: false,
  updateSessionMatchedContact: (i) => i,
  // CallLog related
  currentLog: undefined,
  renderEditLogSection: undefined,
  renderSaveLogButton: undefined,
  renderExtraButton: undefined,
  onSaveCallLog: undefined,
  onUpdateCallLog: undefined,
  onCloseLogSection: undefined,
  // Notification
  logNotification: undefined,
  onCloseNotification: undefined,
  onDiscardNotification: undefined,
  onSaveNotification: undefined,
  onExpandNotification: undefined,
  showNotiLogButton: true,
  notificationContainerStyles: undefined,
  // Contact
  showAvatar: true,
  renderContactName: undefined,
  renderSubContactName: undefined,
  showOtherDevice: true,
  ringoutHangup: undefined,
  ringoutTransfer: undefined,
  ringoutReject: undefined,
  disableLinks: false,
  showRingoutCallControl: false,
  showMultipleMatch: true,
  showSwitchCall: false,
  showTransferCall: true,
  showHoldOnOtherDevice: false,
  onLogBasicInfoClick() {},
  renderSmallCallContrl() {},
  // customization
  showCallDetail: false,
  showIgnoreBtn: false,
  showHoldAnswerBtn: false,
  useCallDetailV2: false,
  newCallIcon: false,
  clickSwitchTrack() {},
};
export default ActiveCallsPanel;
