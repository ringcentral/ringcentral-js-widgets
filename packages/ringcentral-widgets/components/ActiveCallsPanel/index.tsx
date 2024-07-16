import clsx from 'clsx';
import React, { useEffect } from 'react';

import type { Call } from '../ActiveCallItemV2';
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
  onMergeCall?: (webphoneSessionId: string, telephonySessionId: string) => any;
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
  currentLog?: any;
  renderEditLogSection?: (...args: any[]) => any;
  renderSaveLogButton?: (...args: any[]) => any;
  renderExtraButton?: (...args: any[]) => any;
  onSaveCallLog?: (...args: any[]) => any;
  onUpdateCallLog?: (...args: any[]) => any;
  onCloseLogSection?: (...args: any[]) => any;
  logNotification?: any;
  onCloseNotification?: (...args: any[]) => any;
  onDiscardNotification?: (...args: any[]) => any;
  onSaveNotification?: (...args: any[]) => any;
  onExpandNotification?: (...args: any[]) => any;
  showNotiLogButton?: boolean;
  notificationContainerStyles?: string;
  showAvatar?: boolean;
  renderContactName?: (...args: any[]) => any;
  renderSubContactName?: (...args: any[]) => any;
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
  onSwitchCall?: (call: Call) => any;
  isWide?: boolean;
  allCalls: any[];
  showMergeCall?: boolean;
};

export const ActiveCallsPanel: React.FC<ActiveCallsPanelProps> = ({
  activeRingCalls,
  activeOnHoldCalls,
  activeCurrentCalls,
  otherDeviceCalls,
  className,
  currentLocale,
  areaCode,
  countryCode,
  showMergeCall,
  showCallDetail,
  allCalls,
  onCreateContact,
  onClickToSms,
  isLoggedContact,
  onLogCall,
  onViewContact,
  webphoneAnswer,
  onMergeCall,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  webphoneToVoicemail,
  webphoneSwitchCall,
  webphoneIgnore,
  modalConfirm,
  modalClose,
  enableContactFallback,
  onCallsEmpty,
  sourceIcons,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
  isWebRTC,
  getAvatarUrl,
  currentLog,
  renderEditLogSection,
  renderSaveLogButton,
  renderExtraButton,
  onSaveCallLog,
  onUpdateCallLog,
  onCloseLogSection,
  logNotification,
  onCloseNotification,
  onDiscardNotification,
  onSaveNotification,
  onExpandNotification,
  notificationContainerStyles,
  renderContactName,
  renderSubContactName,
  ringoutHangup,
  ringoutTransfer,
  ringoutReject,
  isOnHold,
  isWide = true,
  brand = 'RingCentral',
  showContactDisplayPlaceholder = true,
  outboundSmsPermission = true,
  internalSmsPermission = true,
  loggingMap = {},
  autoLog = false,
  showSpinner = false,
  isSessionAConferenceCall = () => false,
  onCallItemClick,
  conferenceCallParties = [],
  webphoneHold = (i: any) => i,
  useV2 = false,
  updateSessionMatchedContact = (i: any) => i,
  showNotiLogButton = true,
  showAvatar = true,
  showOtherDevice = true,
  disableLinks = false,
  showRingoutCallControl = false,
  showMultipleMatch = true,
  showSwitchCall = false,
  showTransferCall = true,
  showHoldOnOtherDevice = false,
  onLogBasicInfoClick = () => {
    //
  },
  renderSmallCallContrl = () => {
    //
  },
  showIgnoreBtn = false,
  showHoldAnswerBtn = false,
  useCallDetailV2 = false,
  newCallIcon = false,
  clickSwitchTrack = () => {
    //
  },
  onSwitchCall,
  formatPhone,
}) => {
  const hasCalls =
    activeRingCalls.length > 0 ||
    activeOnHoldCalls.length > 0 ||
    activeCurrentCalls.length > 0 ||
    otherDeviceCalls.length > 0;

  useEffect(() => {
    if (!hasCalls) {
      onCallsEmpty?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCalls]);

  const renderLogSection = () => {
    if (!currentLog) return null;

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
            currentLocale={currentLocale!}
            currentLog={currentLog}
            formatPhone={formatPhone}
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
            containerStyles={clsx(
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
  };

  const getCallList = (
    calls: any,
    title: any,
    showCallDetail = false,
    allCalls: any,
    showMergeCallBtn?: boolean,
  ) => {
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
        showMergeCall={showMergeCall && showMergeCallBtn}
        onMergeCall={onMergeCall}
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
        isSessionAConferenceCall={isSessionAConferenceCall}
        useV2={useV2}
        // TODO: Maybe we should make all the call item consistent
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
        onSwitchCall={onSwitchCall}
        isWide={isWide}
        allCalls={allCalls}
      />
    );
  };

  if (!hasCalls) {
    return (
      <div data-sign="activeCalls" className={clsx(styles.root, className)}>
        <p className={styles.noCalls}>
          {i18n.getString('noActiveCalls', currentLocale)}
        </p>
        {renderLogSection()}
        {showSpinner ? <SpinnerOverlay className={styles.spinner} /> : null}
      </div>
    );
  }

  return (
    <div data-sign="activeCalls" className={styles.root}>
      <div className={clsx(styles.root, className)}>
        {getCallList(
          activeRingCalls,
          i18n.getString('ringCall', currentLocale),
          showCallDetail,
          allCalls,
        )}
        {getCallList(
          activeCurrentCalls,
          i18n.getString('currentCall', currentLocale),
          showCallDetail,
          allCalls,
        )}
        {getCallList(
          activeOnHoldCalls,
          i18n.getString('onHoldCall', currentLocale),
          showCallDetail,
          allCalls,
          true,
        )}
        {showOtherDevice
          ? getCallList(
              otherDeviceCalls,
              i18n.getString('otherDeviceCall', currentLocale),
              true,
              allCalls,
            )
          : null}
      </div>
      {renderLogSection()}
      {showSpinner ? <SpinnerOverlay className={styles.spinner} /> : null}
    </div>
  );
};

export default ActiveCallsPanel;
