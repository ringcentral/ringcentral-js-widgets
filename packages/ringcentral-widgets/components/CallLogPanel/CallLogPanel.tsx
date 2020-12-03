/**
 * Call log enhancement
 */
import classnames from 'classnames';
import React, { Component } from 'react';

import { environment } from '../../lib';
import BackHeader from '../BackHeaderV2';
import LogBasicInfo from '../LogBasicInfoV2';
import NotificationSection from '../NotificationSection';
import NotificationSectionV2 from '../NotificationSectionV2';
import WebRTCNotificationSection from '../WebRTCNotificationSection';
import { SpinnerOverlay } from '../SpinnerOverlay';
import { CallLogPanelProps } from './CallLogPanel.interface';
import i18n from './i18n';
import styles from './styles.scss';

export default class CallLogPanel extends Component<CallLogPanelProps, {}> {
  static defaultProps: Partial<CallLogPanelProps> = {
    currentLog: {
      nameEntities: [],
      relatedToEntities: [],
      associatedEntities: [],
    },
    currentIdentify: '',
    currentLocale: environment.defaultLocale,
    classes: {},
    refs: {},
    // Notification
    currentNotificationIdentify: '',
    shrinkNotification: () => null,
    header: true,
    showSmallCallControl: false,
    isInTransferPage: false,
    showSpinner: true,
    isWide: true,
    showNotiLogButton: true,
    disableLinks: false,
    useNewNotification: false,
    contactSearch: null,
    showFoundFromServer: false,
    isSearching: false,
    logNotification: {
      showNotification: false,
      call: null,
      logName: null,
      notificationIsExpand: false,
    },
    showRecordingIndicator: false,
  };

  editSectionRef = React.createRef<HTMLDivElement>();

  // TODO: use react function component to refactor with react hook
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { pushLogPageStatus } = this.props;
    if (pushLogPageStatus) {
      pushLogPageStatus(true);
    }
  }

  componentWillUnmount() {
    const { pushLogPageStatus } = this.props;
    if (pushLogPageStatus) {
      pushLogPageStatus(false);
    }
  }

  editSectionScrollBy = (top: number) => {
    this.editSectionRef.current.scrollBy({
      top,
      behavior: 'smooth',
    });
  };

  renderLogSection() {
    const {
      currentLog,
      renderEditLogSection,
      classes: { editSection },
    } = this.props;
    if (!currentLog) return null;
    const { showSpinner } = this.props;
    if (currentLog.showSpinner || showSpinner) {
      return <SpinnerOverlay className={styles.spinner} />;
    }
    return (
      <>
        {this.renderLogNotification()}
        {this.renderLogBasicInfo()}
        <div
          ref={this.editSectionRef}
          className={classnames(styles.editSection, editSection)}
        >
          {renderEditLogSection && this.getEditLogSection()}
        </div>
        {this.getCallControlButtons()}
      </>
    );
  }

  getCallControlButtons() {
    const {
      currentLog,
      classes: { callLogCallControl = null },
      refs: { callLogCallControl: callLogCallControlRef },
      renderCallLogCallControl,
      isWide,
      showSmallCallControl,
    } = this.props;
    const { call } = currentLog;
    const { result, telephonySessionId, webphoneSession } = call;
    const isCurrentDeviceCall = !!webphoneSession;
    // if `result` is exist, call has been disconnect
    // 'showSmallCallControl || isActive' can be replaced with 'showSmallCallControl'
    // which include showSmallCallControl permission and isActive judgement(eg: canShowSmallCallControl && isActive) on UI module in the future
    // Then we can remove the logic from component to UI module like 'engage-voice-widget/modules/EvActivityCallUI/EvActivityCallUI'
    const isActive = !result;
    if (showSmallCallControl || isActive) {
      return (
        <div
          ref={callLogCallControlRef}
          className={classnames(styles.callControlRoot, callLogCallControl)}
        >
          {renderCallLogCallControl &&
            renderCallLogCallControl(
              telephonySessionId,
              isWide,
              isCurrentDeviceCall,
            )}
        </div>
      );
    }
    return null;
  }

  getEditLogSection() {
    const {
      renderEditLogSection,
      currentLocale,
      onSaveCallLog,
      onUpdateCallLog,
      onSelectViewVisible,
      currentLog,
      additionalInfo,
      subjectDropdownsTracker,
      contactSearch,
      onBackClick,
      showFoundFromServer,
      appName,
      isSearching,
      startAdornmentRender,
    } = this.props;
    return renderEditLogSection({
      currentLocale,
      onSaveCallLog,
      onUpdateCallLog,
      onSelectViewVisible,
      currentLog,
      additionalInfo,
      subjectDropdownsTracker,
      contactSearch,
      onBackClick,
      showFoundFromServer,
      appName,
      isSearching,
      editSectionScrollBy: this.editSectionScrollBy,
      startAdornmentRender,
    });
  }

  renderLogBasicInfo() {
    const {
      isWide,
      currentLog,
      currentLocale,
      formatPhone,
      dateTimeFormatter,
      renderBasicInfo,
      classes: { logBasicInfo },
      currentSession,
      showRecordingIndicator,
    } = this.props;
    if (renderBasicInfo) {
      return renderBasicInfo({ formatPhone, dateTimeFormatter, currentLog });
    }
    return (
      <LogBasicInfo
        dataSign="leftSectionInfo"
        isWide={isWide}
        currentLog={currentLog}
        currentLocale={currentLocale}
        formatPhone={formatPhone}
        dateTimeFormatter={dateTimeFormatter}
        className={logBasicInfo}
        recordStatus={currentSession?.recordStatus}
        showRecordingIndicator={showRecordingIndicator}
      />
    );
  }

  genSaveLogButtonV2() {
    const {
      renderSaveLogButton,
      currentLocale,
      onSaveCallLog,
      currentLog,
      isWide,
      showSpinner,
    } = this.props;
    const loading = showSpinner || (currentLog && currentLog.showSpinner);
    return renderSaveLogButton({
      currentLocale,
      onSaveCallLog,
      currentLog,
      loading,
      isWide,
    });
  }

  renderLogNotification() {
    const {
      formatPhone,
      currentLocale,
      logNotification,
      onCloseNotification,
      onSaveNotification,
      onExpandNotification,
      onDiscardNotification,
      currentNotificationIdentify,
      currentSession,
      activeSession,
      onReject,
      onHangup,
      shrinkNotification,
      disableLinks,
      useNewNotification,
      showNotiLogButton,
      isWebRTC,
      isWide,
      onIgnore,
      onForward,
      endAndAnswer,
      holdAndAnswer,
      toVoicemail,
      forwardingNumbers,
      answer,
    } = this.props;
    const { showNotification, call, logName } = logNotification;
    if (!showNotification) {
      return null;
    }
    if (isWebRTC) {
      if (!call || !call.webphoneSession) return null;
      return (
        <WebRTCNotificationSection
          formatPhone={formatPhone}
          currentLocale={currentLocale}
          call={call}
          logName={logName}
          onCloseNotification={onCloseNotification}
          currentNotificationIdentify={currentNotificationIdentify}
          isWide={isWide}
          onIgnore={onIgnore}
          onForward={onForward}
          endAndAnswer={endAndAnswer}
          holdAndAnswer={holdAndAnswer}
          toVoicemail={toVoicemail}
          forwardingNumbers={forwardingNumbers}
          hasActiveSession={!!activeSession}
          answer={answer}
        />
      );
    }
    if (useNewNotification) {
      return (
        <NotificationSectionV2
          formatPhone={formatPhone}
          currentLocale={currentLocale}
          logNotification={logNotification}
          showNotiLogButton={showNotiLogButton}
          onCloseNotification={onCloseNotification}
          onSaveNotification={onSaveNotification}
          onExpandNotification={onExpandNotification}
          onDiscardNotification={onDiscardNotification}
          currentNotificationIdentify={currentNotificationIdentify}
          currentSession={currentSession}
          onReject={onReject}
          onHangup={onHangup}
          shrinkNotification={shrinkNotification}
        />
      );
    }
    return (
      <NotificationSection
        formatPhone={formatPhone}
        currentLocale={currentLocale}
        logNotification={logNotification}
        showNotiLogButton={showNotiLogButton}
        onCloseNotification={onCloseNotification}
        onSaveNotification={onSaveNotification}
        onExpandNotification={onExpandNotification}
        onDiscardNotification={onDiscardNotification}
        currentNotificationIdentify={currentNotificationIdentify}
        currentSession={currentSession}
        onReject={onReject}
        onHangup={onHangup}
        disableLinks={disableLinks}
      />
    );
  }

  goBack() {
    const { goBack } = this.props;
    goBack();
  }

  render() {
    const {
      currentIdentify,
      currentLocale,
      classes: { root, backHeader },
      refs: { root: rootRef },
      backIcon,
      header,
      isInTransferPage,
      isWide,
    } = this.props;
    if (!currentIdentify || isInTransferPage) return null;
    // console.log(this.props.currentLog);
    return (
      <div
        ref={rootRef}
        className={classnames(
          styles.root,
          !isWide ? styles.classic : null,
          root,
        )}
      >
        {header && (
          <BackHeader
            currentLocale={currentLocale}
            backIcon={backIcon}
            isWide={isWide}
            rightIcon={this.genSaveLogButtonV2()}
            title={i18n.getString('createCallLog', currentLocale)}
            className={classnames(styles.header, backHeader)}
            onBackClick={() => this.goBack()}
          />
        )}
        {this.renderLogSection()}
      </div>
    );
  }
}
