import { isRingingInboundCall } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { useEventListener } from '@ringcentral/juno';
import React, { useRef, useState } from 'react';
import { noop } from 'rxjs';

import LogBasicInfo from '../LogBasicInfo';
import { SpinnerOverlay } from '../SpinnerOverlay';

import { SaveButton } from './SaveButton';
import i18n from './i18n';
import styles from './styles.scss';

type LogSectionProps = {
  currentLog?: any;
  additionalInfo?: object;
  currentLocale: string;
  formatPhone?: (...args: any[]) => any;
  onUpdateCallLog?: (...args: any[]) => any;
  onSaveCallLog?: (...args: any[]) => any;
  renderEditLogSection?: (...args: any[]) => any;
  renderSaveLogButton?: (...args: any[]) => any;
  isInnerMask?: boolean;
  onLogBasicInfoClick?: (...args: any[]) => any;
  showSaveLogBtn?: boolean;
  showSmallCallControl?: boolean;
  renderSmallCallContrl?: (...args: any[]) => any;
  onCallLogSaved?: (...args: any[]) => any;
};

const LogSection: React.FC<LogSectionProps> = ({
  isInnerMask,
  currentLog = {},
  onLogBasicInfoClick = noop,
  renderSmallCallContrl = noop,
  showSaveLogBtn = true,
  renderSaveLogButton,
  currentLocale,
  formatPhone,
  onSaveCallLog,
  showSmallCallControl = true,
  renderEditLogSection,
  onUpdateCallLog,
  additionalInfo,
  onCallLogSaved,
}) => {
  const scrollRef = useRef(null);

  const { showSpinner } = currentLog;
  const [mainCtrlOverlapped, setMainCtrlOverlapped] = useState(false);

  const checkOverlap = (e: Event): void => {
    const { scrollHeight, clientHeight, scrollTop } =
      e.target as HTMLDivElement;
    const overlappedHeight = scrollHeight - clientHeight - scrollTop;
    const beOverlapped = overlappedHeight > 1;

    if (beOverlapped !== mainCtrlOverlapped) {
      setMainCtrlOverlapped(beOverlapped);
    }
  };

  useEventListener(window, 'resize', checkOverlap);
  useEventListener(scrollRef, 'scroll', checkOverlap);

  const getEditLogSection = () => {
    return renderEditLogSection?.({
      currentLocale,
      onSaveCallLog,
      onUpdateCallLog,
      currentLog,
      additionalInfo,
      onCallLogSaved,
    });
  };

  const genSaveLogButton = () => {
    const { call, currentLogCall } = currentLog;
    if (!showSaveLogBtn) {
      return null;
    }
    if (renderSaveLogButton) {
      return renderSaveLogButton({
        currentLocale,
        onSaveCallLog,
        currentLog,
        overlapped: mainCtrlOverlapped,
      });
    }

    return (
      <SaveButton
        isSaving={currentLogCall.isSaving}
        onClick={() => onSaveCallLog?.(call)}
        overlapped={mainCtrlOverlapped}
      >
        {i18n.getString('saveLog', currentLocale)}
      </SaveButton>
    );
  };

  const renderLogBasicInfo = () => {
    const { currentSessionId, call } = currentLog;
    const { telephonyStatus, result } = call;
    const status = telephonyStatus || result;
    const isActive = !result;
    const clickable = isActive && !isRingingInboundCall(call);
    let extraButton;
    if (showSmallCallControl && isActive) {
      extraButton = renderSmallCallContrl(status, currentSessionId);
    }
    return (
      <LogBasicInfo
        dataSign="leftSectionInfo"
        currentLog={currentLog}
        currentLocale={currentLocale}
        formatPhone={formatPhone}
        extraButton={extraButton}
        clickable={clickable}
        onClick={
          clickable
            ? onLogBasicInfoClick
            : () => {
                //
              }
        }
      />
    );
  };

  return (
    <div className={styles.root}>
      {showSpinner ? <SpinnerOverlay className={styles.spinner} /> : null}
      {renderLogBasicInfo()}
      <div ref={scrollRef} className={styles.editSection}>
        {getEditLogSection()}
      </div>
      {genSaveLogButton()}
      {isInnerMask ? <div className={styles.innerMask} /> : null}
    </div>
  );
};

export default LogSection;
