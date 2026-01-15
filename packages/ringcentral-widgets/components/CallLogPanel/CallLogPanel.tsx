/**
 * Call log enhancement
 */
import clsx from 'clsx';
import React, { Component } from 'react';

import { environment } from '../../lib';
import BackHeader from '../BackHeaderV2';
import { LeaveConferenceCall } from '../CallLogCallCtrlComponent/LeaveConferenceCall';
import { ConferenceCallParticipants } from '../ConferenceCallParticipants';
import LogBasicInfo from '../LogBasicInfoV2';
import NotificationSection from '../NotificationSection';
import NotificationSectionV2 from '../NotificationSectionV2';
import { SpinnerOverlay } from '../SpinnerOverlay';
import WebRTCNotificationSection from '../WebRTCNotificationSection';

import type { CallLog } from './CallLog.interface';
import type { CallLogPanelProps } from './CallLogPanel.interface';
import i18n from './i18n';
import styles from './styles.scss';

const getWarmTransferSession = ({
  mainLog,
  transferLog,
  activeTelephonySessionId,
}: {
  mainLog: CallLog;
  transferLog?: CallLog;
  activeTelephonySessionId: string;
}) => {
  if (
    !transferLog ||
    !transferLog?.call ||
    transferLog?.call?.telephonySessionId !== activeTelephonySessionId
  ) {
    return {
      activeLog: mainLog,
      subLog: transferLog,
    };
  }

  return {
    activeLog: transferLog,
    subLog: mainLog,
  };
};

export default class CallLogPanel extends Component<
  CallLogPanelProps,
  {
    showConferenceCallParticipants: boolean;
    showLeaveConferenceCallComponent: boolean;
  }
> {
  constructor(props: CallLogPanelProps) {
    super(props);
    this.state = {
      showConferenceCallParticipants: false,
      showLeaveConferenceCallComponent: false,
    };
  }

  toggleConference = (open: boolean) => {
    if (open) {
      this.props.clickParticipantsIconTrack?.();
    }
    this.setState({
      showConferenceCallParticipants: open,
    });
  };

  toggleLeaveConferenceCallComponent = (open: boolean) => {
    this.setState({
      showLeaveConferenceCallComponent: open,
    });
  };
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
    enableReply: false,
    showNotiLogButton: true,
    disableLinks: false,
    useNewNotification: false,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type '(({ searchS... Remove this comment to see the full error message
    contactSearch: null,
    showFoundFromServer: false,
    isSearching: false,
    logNotification: {
      showNotification: false,
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Call'.
      call: null,
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
      logName: null,
      notificationIsExpand: false,
      subContactNameDisplay: '',
      displayEntity: null,
      entityType: '',
      entityDetailLinkId: '',
    },
    showRecordingIndicator: false,
    // @ts-expect-error TS(2322): Type '() => null' is not assignable to type '(cont... Remove this comment to see the full error message
    renderCallNotificationAvatar: () => null,
    // @ts-expect-error TS(2322): Type '() => null' is not assignable to type '(cont... Remove this comment to see the full error message
    getAvatarUrl: () => null,
  };

  editSectionRef = React.createRef<HTMLDivElement>();

  // TODO: use react function component to refactor with react hook
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillMount() {
    const { pushLogPageStatus } = this.props;
    if (pushLogPageStatus) {
      pushLogPageStatus(true);
    }
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    const { pushLogPageStatus } = this.props;
    if (pushLogPageStatus) {
      pushLogPageStatus(false);
    }
  }

  editSectionScrollBy = (top: number) => {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    this.editSectionRef.current.scrollBy({
      top,
      behavior: 'smooth',
    });
  };

  renderLogSection() {
    const {
      currentLog,
      currentLocale,
      warmTransferLog,
      warmTransferActiveTelephonySessionId,
      renderEditLogSection,
      // @ts-expect-error TS(2339): Property 'editSection' does not exist on type 'Cal... Remove this comment to see the full error message
      classes: { editSection },
      renderKeypadPanel,
    } = this.props;

    if (!currentLog) return null;
    const { showSpinner } = this.props;
    if (currentLog.showSpinner || showSpinner) {
      return <SpinnerOverlay className={styles.spinner} />;
    }
    const { activeLog } = getWarmTransferSession({
      mainLog: currentLog,
      transferLog: warmTransferLog,
      activeTelephonySessionId: warmTransferActiveTelephonySessionId,
    });

    const { call } = activeLog;
    // @ts-expect-error TS(2339): Property 'telephonySessionId' does not exist on ty... Remove this comment to see the full error message
    const { telephonySessionId, webphoneSession } = call;
    return (
      <>
        {this.renderLogNotification()}
        {this.renderLogBasicInfo()}
        {this.renderConferenceCallParticipants()}
        <div
          ref={this.editSectionRef}
          className={clsx(styles.editSection, editSection)}
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
      // @ts-expect-error TS(2339): Property 'callLogCallControl' does not exist on ty... Remove this comment to see the full error message
      classes: { callLogCallControl = null },
      // @ts-expect-error TS(2339): Property 'callLogCallControl' does not exist on ty... Remove this comment to see the full error message
      refs: { callLogCallControl: callLogCallControlRef },
      renderCallLogCallControl,
      isWide,
      enableReply,
      showSmallCallControl,
      warmTransferLog,
      warmTransferActiveTelephonySessionId,
    } = this.props;

    const { activeLog } = getWarmTransferSession({
      mainLog: currentLog,
      transferLog: warmTransferLog,
      activeTelephonySessionId: warmTransferActiveTelephonySessionId,
    });

    const { call } = activeLog;
    // @ts-expect-error TS(2339): Property 'telephonySessionId' does not exist on ty... Remove this comment to see the full error message
    const { telephonySessionId, webphoneSession } = call;
    const isCurrentDeviceCall = !!webphoneSession;

    if (showSmallCallControl) {
      return (
        <div
          ref={callLogCallControlRef}
          className={clsx(styles.callControlRoot, callLogCallControl)}
          data-sign="smallCallControl"
        >
          {renderCallLogCallControl &&
            renderCallLogCallControl(
              telephonySessionId,
              // @ts-expect-error TS(2345): Argument of type 'boolean | undefined' is not assi... Remove this comment to see the full error message
              isWide,
              enableReply,
              isCurrentDeviceCall,
              warmTransferActiveTelephonySessionId,

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
      currentDelaySavingState,
      additionalInfo,
      subjectDropdownsTracker,
      contactSearch,
      showFoundFromServer,
      appName,
      isSearching,
      startAdornmentRender,
      objectTypeIconsMap,
    } = this.props;
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    return renderEditLogSection({
      currentLocale,
      onSaveCallLog,
      onUpdateCallLog,
      onSelectViewVisible,
      currentLog,
      currentDelaySavingState,
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
      warmTransferLog,
      currentLocale,
      formatPhone,
      dateTimeFormatter,
      renderBasicInfo,
      // @ts-expect-error TS(2339): Property 'logBasicInfo' does not exist on type 'Ca... Remove this comment to see the full error message
      classes: { logBasicInfo },
      showRecordingIndicator,
      openEntityDetailLinkTrack,
      openEntityDetailLink,
      warmTransferActiveTelephonySessionId,
      onSwitchWarmTransferSession,
    } = this.props;
    if (renderBasicInfo) {
      return renderBasicInfo({ formatPhone, dateTimeFormatter, currentLog });
    }

    const { activeLog, subLog } = getWarmTransferSession({
      mainLog: currentLog,
      transferLog: warmTransferLog,
      activeTelephonySessionId: warmTransferActiveTelephonySessionId,
    });

    return (
      <LogBasicInfo
        dataSign="leftSectionInfo"
        isWide={isWide}
        currentLog={activeLog}
        toggleConference={this.toggleConference}
        conferenceParticipantsIsOpen={this.state.showConferenceCallParticipants}
        subCallLog={subLog}
        currentLocale={currentLocale}
        formatPhone={formatPhone}
        // @ts-expect-error TS(2322): Type '(({ utcTimestamp, locale, type, }: DateTimeF... Remove this comment to see the full error message
        dateTimeFormatter={dateTimeFormatter}
        className={logBasicInfo}
        showRecordingIndicator={showRecordingIndicator}
        openEntityDetailLinkTrack={openEntityDetailLinkTrack}
        openEntityDetailLink={openEntityDetailLink}
        onSwitchWarmTransferSession={onSwitchWarmTransferSession}
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
      currentDelaySavingState,
    } = this.props;
    const loading = showSpinner || (currentLog && currentLog.showSpinner);
    return renderSaveLogButton({
      currentLocale,
      onSaveCallLog,
      currentLog,
      loading,
      isWide,
      disabled: currentLog?.disableSaveLog,
      currentDelaySavingState,
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
      openEntityDetailLinkTrack,
      openEntityDetailLink,
      enableReply,
      reply,
    } = this.props;
    const {
      // @ts-expect-error TS(2339): Property 'showNotification' does not exist on type... Remove this comment to see the full error message
      showNotification,
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'LogNotific... Remove this comment to see the full error message
      call,
      // @ts-expect-error TS(2339): Property 'logName' does not exist on type 'LogNoti... Remove this comment to see the full error message
      logName,
      // @ts-expect-error TS(2339): Property 'subContactNameDisplay' does not exist on... Remove this comment to see the full error message
      subContactNameDisplay,
      // @ts-expect-error TS(2339): Property 'displayEntity' does not exist on type 'L... Remove this comment to see the full error message
      displayEntity,
      // @ts-expect-error TS(2339): Property 'entityType' does not exist on type 'LogN... Remove this comment to see the full error message
      entityType,
      // @ts-expect-error TS(2339): Property 'entityDetailLinkId' does not exist on type... Remove this comment to see the full error message
      entityDetailLinkId,
      // @ts-expect-error TS(2339): Property 'showLogOptions' does not exist on type... Remove this comment to see the full error message
      showLogOptions,
    } = logNotification;
    if (!showNotification) {
      return null;
    }
    if (isWebRTC) {
      if (
        !call ||
        !call.webphoneSession ||
        call.webphoneSession.callStatus !== 'webphone-session-connecting'
      ) {
        return null;
      }
      const isCallQueueCall = !!call.webphoneSession.callQueueName;

      return (
        <WebRTCNotificationSection
          formatPhone={formatPhone}
          currentLocale={currentLocale}
          call={call}
          logName={logName}
          subContactNameDisplay={subContactNameDisplay}
          displayEntity={displayEntity}
          entityType={entityType}
          entityDetailLinkId={entityDetailLinkId}
          openEntityDetailLink={openEntityDetailLink}
          // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
          onCloseNotification={onCloseNotification}
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          currentNotificationIdentify={currentNotificationIdentify}
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          isWide={isWide}
          onIgnore={onIgnore}
          onForward={onForward}
          endAndAnswer={endAndAnswer}
          holdAndAnswer={holdAndAnswer}
          showToVoicemail={!isCallQueueCall}
          toVoicemail={toVoicemail}
          forwardingNumbers={forwardingNumbers}
          hasActiveSession={!!activeSession}
          answer={answer}
          clickForwardTrack={clickForwardTrack}
          // @ts-expect-error TS(2322): Type '((contact: IContact, entityType: string) => ... Remove this comment to see the full error message
          renderCallNotificationAvatar={renderCallNotificationAvatar}
          // @ts-expect-error TS(2322): Type '((contact: IContact) => Promise<string>) | u... Remove this comment to see the full error message
          getAvatarUrl={getAvatarUrl}
          openEntityDetailLinkTrack={openEntityDetailLinkTrack}
          enableReply={enableReply}
          disableLinks={disableLinks}
          reply={reply}
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
          showLogOptions={showLogOptions}
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
        openEntityDetailLinkTrack={openEntityDetailLinkTrack}
      />
    );
  }

  renderConferenceCallParticipants() {
    const isOpen = this.state.showConferenceCallParticipants;
    const {
      currentLocale,
      getConferenceCallParticipantName,
      currentLog,
      onRemoveParticipant,
      renderConferenceParticipantsAvatar,
      clickRemoveParticipantTrack,
      openEntityDetailLink,
    } = this.props;
    const call = currentLog.call;
    if (!call?.isConferenceCall || !isOpen) return null;

    return (
      <ConferenceCallParticipants
        openEntityDetailLink={openEntityDetailLink}
        isOpen={!call.result && isOpen}
        currentLocale={currentLocale}
        toggleConference={this.toggleConference}
        renderAvatar={renderConferenceParticipantsAvatar}
        getContactNameInfo={getConferenceCallParticipantName}
        participants={call.conferenceParticipants}
        currentTelephonySessionId={call.telephonySessionId}
        onRemoveParticipant={onRemoveParticipant}
        clickRemoveParticipantTrack={clickRemoveParticipantTrack}
      />
    );
  }

  goBack() {
    const { goBack } = this.props;
    goBack();
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      currentIdentify,
      currentLocale,
      // @ts-expect-error TS(2339): Property 'root' does not exist on type 'CallLogPan... Remove this comment to see the full error message
      classes: { root, backHeader },
      // @ts-expect-error TS(2339): Property 'root' does not exist on type 'CallLogPan... Remove this comment to see the full error message
      refs: { root: rootRef },
      backIcon,
      header,
      headerTitle,
      isInTransferPage,
      isWide,
      children,
      getRenderLogButton,
      // @ts-ignore
      rootLayout,
    } = this.props;
    if (!currentIdentify || isInTransferPage) return null;
    const _root =
      typeof rootLayout === 'boolean'
        ? rootLayout
          ? styles.callLogPanelClassLeftNav
          : styles.callLogPanelClass
        : undefined;
    return (
      <div
        ref={rootRef}
        className={clsx(
          styles.root,
          !isWide ? styles.classic : null,
          _root,
          root,
        )}
      >
        {header && (
          <BackHeader
            currentLocale={currentLocale}
            backIcon={backIcon}
            isWide={isWide}
            rightIcon={getRenderLogButton?.() || this.genSaveLogButtonV2()}
            // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
            title={i18n.getString(headerTitle, currentLocale)}
            className={clsx(styles.header, backHeader)}
            onBackClick={() => this.goBack()}
          />
        )}
        {this.renderLogSection()}
        {children}
      </div>
    );
  }
}
