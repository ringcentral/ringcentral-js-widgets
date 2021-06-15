import React, { FunctionComponent, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { RcButton } from '@ringcentral/juno';

import { BasicCallInfo } from 'ringcentral-widgets/components/BasicCallInfo';
import { CallLogTitle } from 'ringcentral-widgets/components/CallLogPanel/CallLog.interface';
import CallLogPanel, {
  CallLogPanelProps,
} from 'ringcentral-widgets/components/CallLogPanel';

import {
  EvActivityCallUIFunctions,
  EvActivityCallUIProps,
  CallLogMethods,
  callLogMethods,
  saveStatus as saveStatusValue,
} from '../../interfaces/EvActivityCallUI.interface';
import { IvrInfo } from '../ActivityCallLogPanel/IvrInfo';
import { EditLogSection, getButtonText } from '../ActivityCallLogPanel/utils';
import styles from '../ActivityCallLogPanel/styles.scss';

export type CallHistoryCallLogPanelProps = EvActivityCallUIProps &
  EvActivityCallUIFunctions &
  Pick<CallLogPanelProps, 'startAdornmentRender'> & {
    method: CallLogMethods;
  };

export const CallHistoryCallLogPanel: FunctionComponent<CallHistoryCallLogPanelProps> = ({
  currentLocale,
  currentLog,
  basicInfo,
  isInbound,
  disposeCall,
  status,
  saveStatus,
  disableDispose,
  isWide,
  ivrAlertData,
  onCopySuccess,
  scrollTo,
  referenceFieldOptions,
  method,
  ...rest
}) => {
  const rootRef = useRef<CallLogPanel>(null);
  const isLoading = saveStatus === saveStatusValue.saving;
  const headerTitle = `${method}CallLog` as CallLogTitle;

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

  let buttonText;
  if (
    saveStatus === callLogMethods.create ||
    saveStatus === saveStatusValue.submit
  ) {
    buttonText = callLogMethods.create;
  } else {
    buttonText = saveStatus;
  }

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
          styles.noneShadow,
        ),
      }}
      refs={{
        root: rootRef,
      }}
      isWide={isWide}
      header
      headerTitle={headerTitle}
      renderSaveLogButton={() => null}
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
              isRinging={false}
              subject={basicInfo.subject}
              followInfos={basicInfo.followInfos}
              callInfos={basicInfo.callInfos}
              onCopySuccess={onCopySuccess}
              classes={{
                panel: styles.noneShadow,
              }}
            />
            {ivrAlertData?.length > 0 && (
              <IvrInfo isCallEnd ivrAlertData={ivrAlertData} />
            )}
          </>
        );
      }}
    >
      <div className={classNames(styles.submitButton)}>
        <RcButton
          data-sign={method}
          size="large"
          fullWidth
          disabled={disableDispose}
          loading={isLoading}
          onClick={disposeCall}
        >
          {getButtonText(buttonText, currentLocale)}
        </RcButton>
      </div>
    </CallLogPanel>
  );
};
