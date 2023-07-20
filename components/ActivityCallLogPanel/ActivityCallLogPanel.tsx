import type { FunctionComponent } from 'react';
import React, { useCallback, useRef, useState } from 'react';

import classNames from 'classnames';

import { BasicCallInfo } from '@ringcentral-integration/widgets/components/BasicCallInfo';
import type { CallLogPanelProps } from '@ringcentral-integration/widgets/components/CallLogPanel';
import CallLogPanel from '@ringcentral-integration/widgets/components/CallLogPanel';
import { RcButton, RcIconButton, RcMenu, RcMenuItem } from '@ringcentral/juno';
import { Transcription } from '@ringcentral/juno-icon';

import { transferTypes } from '../../enums';
import type {
  EvActivityCallUIFunctions,
  EvActivityCallUIProps,
} from '../../interfaces/EvActivityCallUI.interface';
import { EvSmallCallControl } from '../EvSmallCallControl';
import i18n from './i18n';
import { IvrInfo } from './IvrInfo';
import { KeypadCollapse } from './KeypadCollapse';
import styles from './styles.scss';
import { EditLogSection, getButtonText } from './utils';
import {
  StyledAgentScriptIcon,
  SubmitButtonWrapper,
} from './ActivityCallLogWrapper';

export type ActivityCallLogPanelProps = EvActivityCallUIProps &
  EvActivityCallUIFunctions &
  Pick<CallLogPanelProps, 'startAdornmentRender'>;

export const ActivityCallLogPanel: FunctionComponent<ActivityCallLogPanelProps> =
  ({
    currentLocale,
    currentLog,
    basicInfo,
    isInbound,
    disposeCall,
    status,
    saveStatus,
    goToRequeueCallPage,
    goToTransferCallPage,
    onMute,
    onUnmute,
    onHangup,
    onReject,
    onHold,
    onUnHold,
    isOnMute,
    isOnHold,
    smallCallControlSize,
    isInComingCall,
    currentCallControlPermission: { allowTransferCall, allowRequeueCall },
    disableDispose,
    disableTransfer,
    disableInternalTransfer,
    disableHold,
    disableHangup,
    disableMute,
    disableActive,
    isOnActive,
    onActive,
    isWide,
    showMuteButton,
    ivrAlertData,
    agentScriptData,
    onCopySuccess,
    scrollTo,
    referenceFieldOptions,
    showRecordCall,
    recordPauseCount,
    disableRecordControl,
    isRecording,
    onResumeRecord,
    timeStamp,
    onRecord,
    onPauseRecord,
    onRestartTimer,
    onStopRecord,
    disablePauseRecord,
    isKeypadOpen,
    keypadValue,
    setKeypadIsOpen,
    setKeypadValue,
    ...rest
  }) => {
    const transferRef = useRef(null);
    const rootRef = useRef<CallLogPanel>(null);
    const [transferEl, setTransferRef] = useState(null);
    const isActivity = status === 'active';
    const isCallEnd = status === 'callEnd';
    const isLoading = saveStatus === 'saving';

    const onTransfer = () => {
      setTransferRef(transferRef.current);
    };

    const handleTransferClose = () => {
      setTransferRef(null);
    };

    const callControlRef = useRef<HTMLElement>(null);

    const editLogSection = useCallback(
      (props) => (
        <EditLogSection
          isWide={isWide}
          {...props}
          scrollTo={scrollTo}
          rootRef={rootRef.current?.editSectionRef}
          referenceFieldOptions={referenceFieldOptions}
        />
      ),
      [isWide, scrollTo, referenceFieldOptions],
    );

    return (
      <CallLogPanel
        ref={rootRef}
        {...rest}
        currentLog={currentLog}
        currentLocale={currentLocale}
        classes={{
          root: styles.root,
          callLogCallControl: classNames(
            styles.callLogCallControl,
            isCallEnd ? styles.noneShadow : styles.smallCallControlRoot,
          ),
        }}
        refs={{
          root: rootRef,
          callLogCallControl: callControlRef,
        }}
        isWide={isWide}
        header={false}
        showSpinner={false}
        isInTransferPage={false}
        // TODO: that need refactor CallLogPanel and then can remove that
        currentIdentify="123"
        renderEditLogSection={editLogSection}
        renderBasicInfo={() => {
          return (
            <>
              <BasicCallInfo
                status={status}
                currentLocale={currentLocale}
                isInbound={isInbound}
                isRinging={isActivity}
                subject={basicInfo.subject}
                followInfos={basicInfo.followInfos}
                callInfos={basicInfo.callInfos}
                callControlRef={callControlRef}
                onCopySuccess={onCopySuccess}
                classes={{
                  panel: isCallEnd && styles.noneShadow,
                }}
              />
              {ivrAlertData?.length > 0 && (
                <IvrInfo
                  isCallEnd={isCallEnd}
                  ivrAlertData={ivrAlertData}
                  agentScriptData={agentScriptData}
                />
              )}
              {agentScriptData && (
                <StyledAgentScriptIcon
                  title={i18n.getString('engageScript', currentLocale)}
                  size="medium"
                  variant="contained"
                  color="neutral.f01"
                  symbol={Transcription}
                  onClick={agentScriptData.onClick}
                />
              )}
            </>
          );
        }}
        renderKeypadPanel={() => {
          return (
            !isCallEnd && (
              <>
                <KeypadCollapse
                  isKeypadOpen={isKeypadOpen}
                  currentLocale={currentLocale}
                  setKeypadIsOpen={setKeypadIsOpen}
                  keypadValue={keypadValue}
                  setKeypadValue={setKeypadValue}
                />
              </>
            )
          );
        }}
        renderCallLogCallControl={() => {
          const isOnTransfer = Boolean(transferEl);
          return (
            !isCallEnd && (
              <>
                <RcMenu
                  classes={{ paper: styles.paper }}
                  anchorEl={transferEl}
                  open={isOnTransfer}
                  onClose={handleTransferClose}
                  data-sign="transferMenu"
                >
                  <RcMenuItem
                    onClick={() => goToTransferCallPage(transferTypes.internal)}
                    disabled={!allowTransferCall || disableInternalTransfer}
                    data-sign="transferItem-internalTransfer"
                  >
                    {i18n.getString('internalTransfer', currentLocale)}
                  </RcMenuItem>
                  <RcMenuItem
                    onClick={() =>
                      goToTransferCallPage(transferTypes.phoneBook)
                    }
                    disabled={!allowTransferCall}
                    data-sign="transferItem-phoneBookTransfer"
                  >
                    {i18n.getString('phoneBookTransfer', currentLocale)}
                  </RcMenuItem>
                  <RcMenuItem
                    onClick={() => goToRequeueCallPage()}
                    disabled={!allowRequeueCall}
                    data-sign="transferItem-queueTransfer"
                  >
                    {i18n.getString('queueTransfer', currentLocale)}
                  </RcMenuItem>
                  <RcMenuItem
                    onClick={() =>
                      goToTransferCallPage(transferTypes.manualEntry)
                    }
                    disabled={!allowTransferCall}
                    data-sign="transferItem-enterANumber"
                  >
                    {i18n.getString('enterANumber', currentLocale)}
                  </RcMenuItem>
                </RcMenu>
                <EvSmallCallControl
                  onMute={onMute}
                  onUnmute={onUnmute}
                  onHangup={onHangup}
                  onReject={onReject}
                  onHold={onHold}
                  onTransfer={onTransfer}
                  onUnHold={onUnHold}
                  onActive={onActive}
                  isOnMute={isOnMute}
                  currentLocale={currentLocale}
                  isOnTransfer={isOnActive || isOnTransfer}
                  isOnHold={isOnHold}
                  transferRef={transferRef}
                  size={smallCallControlSize}
                  isInComingCall={isInComingCall}
                  disableTransfer={disableTransfer}
                  disableHold={disableHold}
                  disableHangup={disableHangup}
                  disableMute={disableMute}
                  disableActive={disableActive}
                  isOnActive={isOnActive}
                  showMuteButton={showMuteButton}
                  showRecordCall={showRecordCall}
                  recordPauseCount={recordPauseCount}
                  disableRecordControl={disableRecordControl}
                  disablePauseRecord={disablePauseRecord}
                  isRecording={isRecording}
                  onResumeRecord={onResumeRecord}
                  onRecord={onRecord}
                  onPauseRecord={onPauseRecord}
                  onRestartTimer={onRestartTimer}
                  onStopRecord={onStopRecord}
                  timeStamp={timeStamp}
                />
              </>
            )
          );
        }}
      >
        {isCallEnd && (
          <SubmitButtonWrapper>
            <RcButton
              data-sign="submit"
              size="large"
              fullWidth
              disabled={disableDispose}
              loading={isLoading}
              onClick={() => disposeCall()}
            >
              {getButtonText(saveStatus, currentLocale)}
            </RcButton>
          </SubmitButtonWrapper>
        )}
      </CallLogPanel>
    );
  };

ActivityCallLogPanel.defaultProps = {
  basicInfo: {},
};
