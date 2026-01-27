import { Form } from '@ringcentral-integration/rjsf-juno';
import BackHeader from '@ringcentral-integration/widgets/components/BackHeaderV2';
import type { CallLog } from '@ringcentral-integration/widgets/components/CallLogPanel/CallLog.interface';
import type { CallLogPanelProps } from '@ringcentral-integration/widgets/components/CallLogPanel/CallLogPanel.interface';
import { t } from '@ringcentral-integration/widgets/components/CallLogPanel/i18n';
import styles from '@ringcentral-integration/widgets/components/CallLogPanel/styles.scss';
import LogBasicInfo from '@ringcentral-integration/widgets/components/LogBasicInfoV2';
import { SpinnerOverlay } from '@ringcentral-integration/widgets/components/SpinnerOverlay';
import { environment } from '@ringcentral-integration/widgets/lib';
import validator from '@rjsf/validator-ajv8';

/**
 * Call log enhancement
 */
import clsx from 'clsx';
import React, { Component } from 'react';

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
  { showConferenceCallParticipants: boolean }
> {
  constructor(props: CallLogPanelProps) {
    super(props);
    this.state = {
      showConferenceCallParticipants: false,
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
      entityDetailLink: '',
    },
    showRecordingIndicator: false,
    // @ts-expect-error TS(2322): Type '() => null' is not assignable to type '(cont... Remove this comment to see the full error message
    renderCallNotificationAvatar: () => null,
    // @ts-expect-error TS(2322): Type '() => null' is not assignable to type '(cont... Remove this comment to see the full error message
    getAvatarUrl: () => null,
  };

  editSectionRef = React.createRef<HTMLDivElement>();

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
      // @ts-expect-error TS(2339): Property 'editSection' does not exist on type 'Cal... Remove this comment to see the full error message
      classes: { editSection },
    } = this.props;

    if (!currentLog) return null;
    const { showSpinner } = this.props;
    if (currentLog.showSpinner || showSpinner) {
      return <SpinnerOverlay className={styles.spinner} />;
    }
    const log = (type: string) => console.log.bind(console, type);

    return (
      <>
        {this.renderLogBasicInfo()}
        <div
          ref={this.editSectionRef}
          className={clsx(styles.editSection, editSection)}
        >
          <Form
            //@ts-ignore
            schema={this.props.schema}
            validator={validator}
            // @ts-ignore
            onChange={this.props.onUpdateCallLog}
            // @ts-ignore
            onSubmit={this.props.onSubmitCallLog}
            onError={log('errors')}
            //@ts-ignore
            ref={this.props.formRef}
            uiSchema={{
              'ui:submitButtonOptions': {
                norender: true,
              },
            }}
          />
        </div>
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
    const _root =
      root ?? typeof rootLayout === 'boolean'
        ? rootLayout
          ? styles.callLogPanelClassLeftNav
          : styles.callLogPanelClass
        : undefined;

    return (
      <div
        ref={rootRef}
        className={clsx(styles.root, !isWide ? styles.classic : null, _root)}
      >
        {header && (
          <BackHeader
            currentLocale={currentLocale}
            backIcon={backIcon}
            isWide={isWide}
            rightIcon={getRenderLogButton?.() || this.genSaveLogButtonV2()}
            title={t(headerTitle as any)}
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
