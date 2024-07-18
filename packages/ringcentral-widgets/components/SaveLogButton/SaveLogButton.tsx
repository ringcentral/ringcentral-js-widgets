import { RcButton, RcCircularProgress, RcIcon } from '@ringcentral/juno';
import { Check } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import React from 'react';

import { CountdownTimer } from '../CountdownTimer';

import { getButtonStatus } from './getButtonStatus';
import i18n from './i18n';
import styles from './styles.scss';

type SaveLogButtonProps = {
  currentLog?: object;
  currentLocale: string;
  onSaveCallLog?: (...args: any[]) => any;
  loading?: boolean;
  isWide?: boolean;
  disabled?: boolean;
  currentDelaySavingState?: {
    delayUpdatingStartTime: number;
    delayUpdatingMinutes: number;
  };
};
const SaveLogButton: React.FC<SaveLogButtonProps> = ({
  onSaveCallLog,
  currentLocale,
  currentLog,
  loading,
  isWide,
  disabled,
  currentDelaySavingState,
}) => {
  const { buttonDisabled, buttonContent } = getButtonStatus(
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    currentLog.currentLogCall,
  );
  const getContent = (buttonContent: any) => (
    <span>
      {buttonContent === 'saved' && (
        <RcIcon color="interactive.f01" symbol={Check} size="small" />
      )}
      {buttonContent === 'saving' && <RcCircularProgress size={20} />}
      {buttonContent === 'save' && i18n.getString('save', currentLocale)}
    </span>
  );
  const content = getContent(buttonContent);
  const SaveButton = (
    <RcButton
      className={clsx(styles.button, !isWide && styles.classic)}
      variant="text"
      size="medium"
      disabled={buttonDisabled || loading || disabled}
      data-sign="saveCall"
      data-state={buttonContent}
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onClick={() => onSaveCallLog(currentLog.call)}
    >
      {content}
    </RcButton>
  );
  if (currentDelaySavingState) {
    return (
      <CountdownTimer
        variant="tooltip"
        creationTime={currentDelaySavingState.delayUpdatingStartTime}
        duration={currentDelaySavingState.delayUpdatingMinutes}
        currentLocale={currentLocale}
      >
        {SaveButton}
      </CountdownTimer>
    );
  }

  return SaveButton;
};
SaveLogButton.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'object | un... Remove this comment to see the full error message
  currentLog: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  currentLocale: null,
  onSaveCallLog() {},
  loading: false,
  isWide: true,
  disabled: false,
};
export default SaveLogButton;
