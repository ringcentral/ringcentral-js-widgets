import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import clsx from 'clsx';
import React from 'react';

import EndIcon from '../../assets/images/End.svg';
import { Button } from '../Button';
import CircleButton from '../CircleButton';
import LogBasicInfo from '../LogBasicInfo';
import callControlI18n from '../SmCallControl/i18n';

import i18n from './i18n';
import styles from './styles.scss';

type LogNotificationProps = {
  currentLocale: string;
  showLogButton?: boolean;
  currentLog?: object;
  formatPhone?: (...args: any[]) => any;
  isExpand?: boolean;
  onStay?: (...args: any[]) => any;
  onDiscard?: (...args: any[]) => any;
  onSave?: (...args: any[]) => any;
  onExpand?: (...args: any[]) => any;
  currentSession?: object;
  onReject?: (...args: any[]) => any;
  onHangup?: (...args: any[]) => any;
  showEndButton?: boolean;
  disableLinks?: boolean;
};
const LogNotification: React.FC<LogNotificationProps> = ({
  formatPhone,
  currentLog,
  currentLocale,
  showLogButton,
  isExpand,
  onStay,
  onDiscard,
  onSave,
  onExpand,
  currentSession,
  onReject,
  onHangup,
  showEndButton,
  disableLinks,
}) => {
  let extraButtons = null;
  if (showEndButton && showLogButton) {
    let endButton = null;
    if (currentSession) {
      // @ts-expect-error TS(2339): Property 'callStatus' does not exist on type '{}'.
      const { callStatus, direction } = currentSession;
      const isInComingCall =
        callDirections.inbound === direction &&
        telephonyStatuses.ringing === callStatus;
      const endTitle = isInComingCall ? 'reject' : 'hangup';
      const endAction = isInComingCall ? onReject : onHangup;
      endButton = (
        <span title={callControlI18n.getString(endTitle, currentLocale)}>
          <CircleButton
            dataSign={endTitle}
            showBorder={false}
            icon={EndIcon}
            onClick={endAction}
            className={clsx({
              [styles.hangup]: true,
              [styles.endButton]: true,
              [styles.buttonDisabled]: disableLinks,
            })}
            disabled={disableLinks}
          />
        </span>
      );
    }
    extraButtons = (
      <div className={styles.extraButtonBox}>
        {endButton}
        <Button
          tooltip={i18n.getString('log', currentLocale)}
          disabled={isExpand}
          className={clsx(
            styles.expandButtonWithEnd,
            isExpand && styles.expandDisableButton,
          )}
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onClick={() => onExpand()}
          dataSign="expandNotification"
        >
          {i18n.getString('log', currentLocale)}
        </Button>
      </div>
    );
  } else if (showLogButton) {
    extraButtons = (
      <Button
        disabled={isExpand}
        className={clsx(
          styles.expandButton,
          isExpand && styles.expandDisableButton,
        )}
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onClick={() => onExpand()}
      >
        {i18n.getString('log', currentLocale)}
      </Button>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.basicInfo}>
        <LogBasicInfo
          currentLog={currentLog}
          currentLocale={currentLocale}
          formatPhone={formatPhone}
        />
        {extraButtons}
      </div>
      {isExpand ? (
        <div className={styles.confirmationContainer}>
          <div
            className={styles.confirmationInfo}
            data-sign={'confirmationInfo'}
          >
            {i18n.getString('confirmationInfo', currentLocale)}
          </div>
          <div className={styles.confirmationButtons}>
            {onSave ? (
              <Button
                tooltip={i18n.getString('save', currentLocale)}
                dataSign="saveAndWorkOnNew"
                className={clsx(styles.saveButton, styles.selected)}
                onClick={() => onSave()}
              >
                {i18n.getString('save', currentLocale)}
              </Button>
            ) : null}
            {onDiscard ? (
              <Button
                tooltip={i18n.getString('discard', currentLocale)}
                className={styles.discardButton}
                dataSign="discardAndWorkOnNew"
                onClick={() => onDiscard()}
              >
                {i18n.getString('discard', currentLocale)}
              </Button>
            ) : null}
            {onStay ? (
              <Button
                tooltip={i18n.getString('stay', currentLocale)}
                className={styles.stayButton}
                onClick={() => onStay()}
                dataSign="stayOnPreviousWork"
              >
                {i18n.getString('stay', currentLocale)}
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
LogNotification.defaultProps = {
  showLogButton: true,
  currentLog: {},
  formatPhone: undefined,
  isExpand: undefined,
  onStay: undefined,
  onDiscard: undefined,
  onSave: undefined,
  onExpand: undefined,
  currentSession: undefined,
  onReject: () => null,
  onHangup: () => null,
  showEndButton: false,
  disableLinks: false,
};
export default LogNotification;
