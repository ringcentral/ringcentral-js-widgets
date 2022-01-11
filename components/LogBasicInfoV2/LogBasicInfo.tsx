import React from 'react';
import classnames from 'classnames';
import { isEmpty } from 'ramda';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import callResults from '@ringcentral-integration/commons/enums/callResults';
import telephonyStatuses, {
  TelephonyStatus,
} from '@ringcentral-integration/commons/enums/telephonyStatus';
import { isMissed } from '@ringcentral-integration/commons/lib/callLogHelpers';
import recordStatusEnum from '@ringcentral-integration/commons/modules/Webphone/recordStatus';
import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import formatDuration from '../../lib/formatDuration';
import DurationCounter from '../DurationCounter';
import { RecordingIndicator } from '../RecordingIndicator';
import { CallIcon } from './CallIcon';
import i18n from './i18n';
import { ShinyBar } from './ShinyBar';
import styles from './styles.scss';

const callIconMap = {
  [callResults.missed]: dynamicsFont.missed,
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
  [telephonyStatuses.ringing]: dynamicsFont.callHover,
};
function getInfoStatus(status: TelephonyStatus) {
  switch (status) {
    case telephonyStatuses.onHold:
      return 'onHold';
    case telephonyStatuses.callConnected:
    case telephonyStatuses.ringing:
      return 'active';
    default:
      return 'callEnd';
  }
}
type LogBasicInfoProps = {
  currentLocale?: string;
  formatPhone?: (...args: any[]) => any;
  currentLog?: {
    call?: Call;
    logName?: string;
    logNameAndMoreDisplay?: string;
    basicURL?: string;
    task?: any;
    isShowEntity?: boolean;
  };
  dataSign?: string;
  disableLinks?: boolean;
  dateTimeFormatter: (...args: any[]) => any;
  isWide?: boolean;
  className?: string;
  recordStatus?: string;
  showRecordingIndicator?: boolean;
};
const LogBasicInfo: React.SFC<LogBasicInfoProps> = React.memo(
  (props) => {
    const {
      currentLog: {
        call,
        logName,
        logNameAndMoreDisplay,
        isShowEntity,
        basicURL,
        task,
      },
      formatPhone,
      currentLocale,
      dataSign,
      disableLinks,
      dateTimeFormatter,
      isWide,
      className,
      recordStatus,
      showRecordingIndicator,
    } = props;
    if (!call) return null;
    const {
      direction,
      to,
      from,
      startTime,
      offset,
      duration,
      result,
      telephonyStatus,
    } = call;

    function getDurationElm() {
      let durationElement = null;
      if (typeof duration === 'undefined') {
        durationElement = disableLinks ? (
          i18n.getString('unavailable', currentLocale)
        ) : (
          <DurationCounter startTime={startTime} offset={offset} />
        );
      } else {
        durationElement = formatDuration(duration);
      }
      return durationElement;
    }
    const number =
      direction === callDirections.outbound
        ? to && (to.phoneNumber || to.extensionNumber)
        : from && (from.phoneNumber || from.extensionNumber);
    const formatNumber = formatPhone(number);
    const missed = isMissed(call);
    const durationElement = getDurationElm();
    const status = result || telephonyStatus;
    const statusI18n = i18n.getString(status, currentLocale);
    const isRinging = status === telephonyStatuses.ringing;
    const infoStatus = getInfoStatus(status);
    const isRecording = recordStatus === recordStatusEnum.recording;
    return (
      <div
        data-sign="logSection"
        className={classnames(
          styles.root,
          !isWide && styles.classic,
          styles[infoStatus],
          className,
          styles.logBasicInfo,
        )}
      >
        <ShinyBar
          className={styles.top}
          isRinging={isRinging}
          status={infoStatus}
        />
        <div data-sign={dataSign} className={styles.leftSectionInfo}>
          <CallIcon
            title={
              missed
                ? i18n.getString(callResults.missed, currentLocale)
                : i18n.getString(direction, currentLocale)
            }
            iconClassName={classnames(
              styles.icon,
              callIconMap[missed ? callResults.missed : direction],
            )}
          />
          {showRecordingIndicator && isRecording && (
            <RecordingIndicator
              customClass={styles.recordingIndicator}
              dataSign="recordingIndicator"
            />
          )}
          <ul className={styles.callDisplay}>
            <li className={styles.info}>
              {isShowEntity &&
              (task?.whatid || task?.whoid || logNameAndMoreDisplay) ? (
                <p
                  className={styles.logName}
                  title={`${
                    logNameAndMoreDisplay
                      ? `${logName}\xa0$${logNameAndMoreDisplay}`
                      : logName
                  }`}
                  data-sign="logName"
                >
                  <a
                    className={styles.SFrecordLink}
                    onClick={() =>
                      window.open(
                        `${basicURL}/${task.whatid || task.whoid}`,
                        '_blank',
                      )
                    }
                  >
                    {logNameAndMoreDisplay ? (
                      <span>
                        {logName}
                        <span className={styles.logNameAndMore}>
                          {logNameAndMoreDisplay}
                        </span>
                      </span>
                    ) : (
                      logName
                    )}
                  </a>
                </p>
              ) : (
                <p
                  className={styles.logName}
                  title={logName}
                  data-sign="logName"
                >
                  {logName}
                </p>
              )}

              <p className={classnames(styles.follow, styles['text-ellipsis'])}>
                <span title={formatNumber} data-sign="phoneNumber">
                  {formatNumber}
                </span>
                <span data-sign="callStatus" title={statusI18n}>
                  {statusI18n}
                </span>
              </p>
            </li>
            <li className={styles['flex-fill']} />
            <li className={classnames(styles.follow, styles.time)}>
              <p>{durationElement}</p>
              <p>
                {dateTimeFormatter({
                  utcTimestamp: startTime,
                  locale: currentLocale,
                })}
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // current call will be {} temporally when the call is ended
    // will not update log info component at that time
    if (
      nextProps.currentLog?.call !== prevProps.currentLog?.call &&
      isEmpty(nextProps.currentLog?.call)
    ) {
      return true;
    }
    return false;
  },
);

LogBasicInfo.defaultProps = {
  formatPhone: (value) => value,
  currentLog: {},
  dataSign: undefined,
  disableLinks: false,
  isWide: true,
  currentLocale: 'en',
  className: null,
  recordStatus: '',
  showRecordingIndicator: false,
};
export default LogBasicInfo;
