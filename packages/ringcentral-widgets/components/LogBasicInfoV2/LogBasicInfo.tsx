import React, { FunctionComponent } from 'react';

import classnames from 'classnames';
import { isEmpty } from 'ramda';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import callResults from '@ringcentral-integration/commons/enums/callResults';
import telephonyStatuses, {
  TelephonyStatus,
} from '@ringcentral-integration/commons/enums/telephonyStatus';
import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { isMissed } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { RcIcon, RcLink, RcText } from '@ringcentral/juno';
import { Hold, ResendFax } from '@ringcentral/juno-icon';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import formatDuration from '../../lib/formatDuration';
import DurationCounter from '../DurationCounter';
import { RecordingIndicator } from '../RecordingIndicator';
import { CallIcon } from './CallIcon';
import i18n from './i18n';
import { ShinyBar } from './ShinyBar';
import {
  StyledSide,
  StyledSubRecordingIndicator,
  StyledSubSide,
  StyledTransferSwitchButton,
  StyleSubBox,
  SubInfoName,
  SubInfoWrapper,
} from './styles';
import styles from './styles.scss';

const callIconMap = {
  [callResults.missed]: dynamicsFont.missed,
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
  [telephonyStatuses.ringing]: dynamicsFont.callHover,
};
function getInfoStatus(status?: TelephonyStatus) {
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

interface ILogInfo {
  call?: Call;
  logName?: string;
  subContactNameDisplay?: string;
  entityDetailLink?: string;
}

type LogBasicInfoProps = {
  currentLocale?: string;
  formatPhone?: (...args: any[]) => string;
  currentLog?: ILogInfo;
  subCallLog?: ILogInfo;
  dataSign?: string;
  disableLinks?: boolean;
  dateTimeFormatter: (...args: any[]) => any;
  isWide?: boolean;
  className?: string;
  showRecordingIndicator?: boolean;
  openEntityDetailLinkTrack?: (...args: any[]) => any;
  onSwitchWarmTransferSession?: () => any;
  disabledSwitchButton: boolean;
};

type CallInfoProps = Omit<LogBasicInfoProps, 'currentLog'> & {
  displayCallLog: ILogInfo;
};

const SubCallInfoSection: FunctionComponent<CallInfoProps> = ({
  displayCallLog: { call, logName, subContactNameDisplay, entityDetailLink },
  disabledSwitchButton,
  currentLocale,
  disableLinks,
  isWide,
  showRecordingIndicator,
  openEntityDetailLinkTrack,
  onSwitchWarmTransferSession,
}) => {
  if (!call) return null;
  // @ts-expect-error TS(2339): Property 'offset' does not exist on type 'Call'.
  const { startTime, offset, duration, telephonyStatus, isRecording } = call;

  function getDurationElm() {
    let durationElement = null;
    if (typeof duration === 'undefined') {
      durationElement = disableLinks ? (
        i18n.getString('unavailable', currentLocale)
      ) : (
        // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
        <DurationCounter startTime={startTime} offset={offset} />
      );
    } else {
      durationElement = formatDuration(duration);
    }
    return durationElement;
  }
  const durationElement = getDurationElm();
  const infoStatus = getInfoStatus(telephonyStatus);
  return (
    <StyleSubBox>
      <div
        data-sign="subLogSection"
        className={classnames(
          styles.root,
          !isWide && styles.classic,
          styles[infoStatus],
        )}
      >
        <ShinyBar className={styles.top} status={infoStatus} />
        <SubInfoWrapper>
          <RcIcon
            data-sign="subInfoHoldIcon"
            symbol={Hold}
            size="small"
            color="nav.f02"
          />
          <SubInfoName
            $isWide={isWide}
            className={styles.logName}
            title={`${
              subContactNameDisplay
                ? `${logName} ${subContactNameDisplay}`
                : logName
            }`}
            data-sign="subLogName"
          >
            {entityDetailLink ? (
              <RcLink
                variant="inherit"
                onClick={() => {
                  window.open(entityDetailLink, '_blank');
                  openEntityDetailLinkTrack?.('call log page');
                }}
              >
                {logName}
              </RcLink>
            ) : (
              logName
            )}
            {subContactNameDisplay && (
              <RcText
                color="neutral.f04"
                component="span"
                align="center"
                variant="caption1"
              >
                {` ${subContactNameDisplay}`}
              </RcText>
            )}
          </SubInfoName>
          <StyledSubSide>
            <p data-sign="subCallDuration">{durationElement}</p>
            {showRecordingIndicator && isRecording && (
              <StyledSubRecordingIndicator>
                <RecordingIndicator
                  customClass={styles.subRecordingIndicator}
                  dataSign="subRecordingIndicator"
                />
              </StyledSubRecordingIndicator>
            )}
          </StyledSubSide>
        </SubInfoWrapper>
      </div>
      <StyledTransferSwitchButton
        data-sign="warmTransferSwitchCallButton"
        variant="contained"
        color="neutral.b01"
        size="small"
        onClick={onSwitchWarmTransferSession}
        title={i18n.getString('warmTransferSwitchCall', currentLocale)}
        disabled={disableLinks || disabledSwitchButton}
      >
        <RcIcon color="interactive.b02" size="inherit" symbol={ResendFax} />
      </StyledTransferSwitchButton>
    </StyleSubBox>
  );
};

const ActiveCallInfoSection: FunctionComponent<CallInfoProps> = ({
  displayCallLog: { call, logName, subContactNameDisplay, entityDetailLink },
  formatPhone,
  currentLocale,
  dataSign,
  disableLinks,
  dateTimeFormatter,
  isWide,
  className,
  showRecordingIndicator,
  openEntityDetailLinkTrack,
}) => {
  if (!call) return null;

  const {
    direction,
    to,
    from,
    startTime,
    // @ts-expect-error TS(2339): Property 'offset' does not exist on type 'Call'.
    offset,
    duration,
    result,
    telephonyStatus,
    isRecording,
  } = call;

  function getDurationElm() {
    let durationElement = null;
    if (typeof duration === 'undefined') {
      durationElement = disableLinks ? (
        i18n.getString('unavailable', currentLocale)
      ) : (
        // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
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
  const formatNumber = formatPhone?.(number);
  // @ts-expect-error TS(2345): Argument of type 'Call' is not assignable to param... Remove this comment to see the full error message
  const missed = isMissed(call);
  const durationElement = getDurationElm();
  const status = result || telephonyStatus;
  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  const statusI18n = i18n.getString(status, currentLocale);
  const isRinging = status === telephonyStatuses.ringing;
  // @ts-expect-error TS(2345): Argument of type '"NoCall" | "OnHold" | "Ringing" ... Remove this comment to see the full error message
  const infoStatus = getInfoStatus(status);
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
              : // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
                i18n.getString(direction, currentLocale)
          }
          iconClassName={classnames(
            styles.icon,
            // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
            callIconMap[missed ? callResults.missed : direction],
          )}
        />
        <ul className={styles.callDisplay}>
          <li className={styles.info}>
            <RcText
              className={styles.logName}
              title={`${
                subContactNameDisplay
                  ? `${logName} ${subContactNameDisplay}`
                  : logName
              }`}
              data-sign="logName"
            >
              {entityDetailLink ? (
                <RcLink
                  variant="inherit"
                  onClick={() => {
                    window.open(entityDetailLink, '_blank');
                    openEntityDetailLinkTrack?.('call log page');
                  }}
                >
                  {logName}
                </RcLink>
              ) : (
                logName
              )}
              {subContactNameDisplay && (
                <RcText
                  color="neutral.f04"
                  component="span"
                  align="center"
                  variant="caption1"
                >
                  {` ${subContactNameDisplay}`}
                </RcText>
              )}
            </RcText>

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
          {isWide ? (
            <li className={styles.time}>
              <StyledSide>
                {durationElement}
                {showRecordingIndicator && isRecording && (
                  <RecordingIndicator
                    customClass={styles.recordingIndicator}
                    dataSign="recordingIndicator"
                  />
                )}
              </StyledSide>
              <p>
                {dateTimeFormatter({
                  utcTimestamp: startTime,
                  locale: currentLocale,
                })}
              </p>
            </li>
          ) : (
            <li className={classnames(styles.follow, styles.time)}>
              <p>{durationElement}</p>
              <p>
                {dateTimeFormatter({
                  utcTimestamp: startTime,
                  locale: currentLocale,
                })}
              </p>
              {showRecordingIndicator && isRecording && (
                <RecordingIndicator
                  customClass={styles.recordingIndicator}
                  dataSign="recordingIndicator"
                />
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const LogBasicInfo: React.SFC<LogBasicInfoProps> = React.memo(
  (props) => {
    const { currentLog, subCallLog, ...rest } = props;

    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const status = currentLog?.call.result || currentLog?.call.telephonyStatus;
    const disabledCtrl = status === telephonyStatuses.ringing;
    return (
      <>
        {subCallLog && (
          <SubCallInfoSection
            displayCallLog={subCallLog}
            // @ts-expect-error TS(2783): 'disabledSwitchButton' is specified more than once... Remove this comment to see the full error message
            disabledSwitchButton={disabledCtrl}
            {...rest}
          />
        )}
        {/* @ts-expect-error TS(2322): Type 'ILogInfo | undefined' is not */}
        <ActiveCallInfoSection displayCallLog={currentLog} {...rest} />
      </>
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
  className: undefined,
  showRecordingIndicator: false,
};
export default LogBasicInfo;
