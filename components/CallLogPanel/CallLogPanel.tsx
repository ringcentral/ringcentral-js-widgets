import React, { Component } from 'react';

/**
 * Call log enhancement
 */
import classnames from 'classnames';

import { environment } from '../../lib';
import BackHeader from '../BackHeaderV2';
import LogBasicInfo from '../LogBasicInfoV2';
import NotificationSection from '../NotificationSection';
import NotificationSectionV2 from '../NotificationSectionV2';
import { SpinnerOverlay } from '../SpinnerOverlay';
import WebRTCNotificationSection from '../WebRTCNotificationSection';
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
    headerTitle: 'createCallLog',
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
      subContactNameDisplay: '',
      displayEntity: null,
      entityType: '',
      entityDetailLink: '',
    },
    showRecordingIndicator: false,
    renderCallNotificationAvatar: () => null,
    getAvatarUrl: () => null,
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
      renderKeypadPanel,
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
        {renderKeypadPanel && renderKeypadPanel()}
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
    const { telephonySessionId, webphoneSession } = call;
    const isCurrentDeviceCall = !!webphoneSession;
    if (showSmallCallControl) {
      return (
        <div
          ref={callLogCallControlRef}
          className={classnames(styles.callControlRoot, callLogCallControl)}
          data-sign="smallCallControl"
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
      showFoundFromServer,
      appName,
      isSearching,
      startAdornmentRender,
      objectTypeIconsMap,
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
      showFoundFromServer,
      appName,
      isSearching,
      editSectionScrollBy: this.editSectionScrollBy,
      startAdornmentRender,
      objectTypeIconsMap,
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
      disabled: currentLog?.disableSaveLog,
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
      clickForwardTrack,
      renderCallNotificationAvatar,
      getAvatarUrl,
    } = this.props;
    const {
      showNotification,
      call,
      logName,
      subContactNameDisplay,
      displayEntity,
      entityType,
      entityDetailLink,
    } = logNotification;
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
          subContactNameDisplay={subContactNameDisplay}
          displayEntity={displayEntity}
          entityType={entityType}
          entityDetailLink={entityDetailLink}
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
          clickForwardTrack={clickForwardTrack}
          renderCallNotificationAvatar={renderCallNotificationAvatar}
          getAvatarUrl={getAvatarUrl}
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
      headerTitle,
      isInTransferPage,
      isWide,
      children,
      getRenderLogButton,
    } = this.props;
    if (!currentIdentify || isInTransferPage) return null;

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
            rightIcon={getRenderLogButton?.() || this.genSaveLogButtonV2()}
            title={i18n.getString(headerTitle, currentLocale)}
            className={classnames(styles.header, backHeader)}
            onBackClick={() => this.goBack()}
          />
        )}
        {this.renderLogSection()}
        {children}
      </div>
    );
  }
}
