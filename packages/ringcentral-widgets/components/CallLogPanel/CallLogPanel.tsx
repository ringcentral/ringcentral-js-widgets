/**
 * Call log enhancement
 */
import classnames from 'classnames';
import React, { Component } from 'react';

import { environment } from '../../lib';
import BackHeader from '../BackHeaderV2';
import LogBasicInfo from '../LogBasicInfoV2';
import NotificationSection from '../NotificationSection';
import SpinnerOverlay from '../SpinnerOverlay';
import { CallLogPanelProps } from './CallLogPanel.interface';
import NotificationSectionV2 from '../NotificationSectionV2';

import i18n from './i18n';
import styles from './styles.scss';

export default class CallLogPanel extends Component<CallLogPanelProps, {}> {
  static defaultProps: Partial<CallLogPanelProps> = {
    currentLog: {
      nameEntities: [],
      relatedToEntities: [],
    },
    currentIdentify: '',
    currentLocale: environment.defaultLocale,
    classes: {},
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
  };

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

  renderLogSection() {
    const { currentLog, renderEditLogSection } = this.props;
    if (!currentLog) return null;
    const { showSpinner } = this.props;
    if (currentLog.showSpinner || showSpinner) {
      return <SpinnerOverlay className={styles.spinner} />;
    }
    return (
      <React.Fragment>
        {this.renderLogNotification()}
        {this.renderLogBasicInfo()}
        <div className={classnames(styles.editSection)}>
          {renderEditLogSection && this.getEditLogSection()}
        </div>
        {this.genCallControlButtons()}
      </React.Fragment>
    );
  }

  genCallControlButtons() {
    const {
      currentLog,
      classes: { callLogCallControl = null },
      renderCallLogCallControl,
      isWide,
      showSmallCallControl,
    } = this.props;
    const { call } = currentLog;
    const { telephonyStatus, result, telephonySessionId } = call;
    const status = telephonyStatus || result;
    // if `result` is exist, call has been disconnect
    // 'showSmallCallControl || isActive' can be replaced with 'showSmallCallControl'
    // which include showSmallCallControl permission and isActive judgement(eg: canShowSmallCallControl && isActive) on UI module in the future
    // Then we can remove the logic from component to UI module like 'engage-voice-widget/modules/EvActivityCallUI/EvActivityCallUI'
    const isActive = !result;
    if (showSmallCallControl || isActive) {
      return (
        <div className={classnames(styles.callControlRoot, callLogCallControl)}>
          {renderCallLogCallControl &&
            renderCallLogCallControl(status, telephonySessionId, isWide)}
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
      currentLog,
      additionalInfo,
      subjectDropdownsTracker,
    } = this.props;
    return renderEditLogSection({
      currentLocale,
      onSaveCallLog,
      onUpdateCallLog,
      currentLog,
      additionalInfo,
      subjectDropdownsTracker,
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
      onReject,
      onHangup,
      shrinkNotification,
      disableLinks,
      useNewNotification,
      showNotiLogButton,
    } = this.props;
    if (!currentNotificationIdentify) {
      return null;
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
      classes: { root },
      backIcon,
      header,
      isInTransferPage,
      isWide,
    } = this.props;
    if (!currentIdentify || isInTransferPage) return null;
    // console.log(this.props.currentLog);
    return (
      <div
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
            className={styles.header}
            onBackClick={() => this.goBack()}
          />
        )}
        {this.renderLogSection()}
      </div>
    );
  }
}
