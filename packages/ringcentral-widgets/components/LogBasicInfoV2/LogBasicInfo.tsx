import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { callResults } from '@ringcentral-integration/commons/enums/callResults';
import type { TelephonyStatus } from '@ringcentral-integration/commons/enums/telephonyStatus';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { isMissed } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { formatDuration } from '@ringcentral-integration/commons/lib/formatDuration';
import { RcIcon, RcLink, RcText, RcTooltip } from '@ringcentral/juno';
import { Hold, ResendFax, Team } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import { isEmpty } from 'ramda';
import type { FunctionComponent } from 'react';
import React from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { DurationCounter } from '../DurationCounter';
import { RecordingIndicator } from '../RecordingIndicator';

import { CallIcon } from './CallIcon';
import { ShinyBar } from './ShinyBar';
import i18n from './i18n';
import {
  StyledSide,
  StyledSubRecordingIndicator,
  StyledSubSide,
  StyledTransferSwitchButton,
  StyleSubBox,
  SubInfoName,
  SubInfoWrapper,
  StyledParticipantsButton,
} from './styles';
import styles from './styles.scss';

const callIconMap = {
  [callResults.missed]: dynamicsFont.missed,
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
  [telephonyStatuses.ringing]: dynamicsFont.callHover,
  conferenceCall: dynamicsFont.conference,
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
  entityDetailLinkId?: string;
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
  openEntityDetailLink: (entityDetailLinkId: string) => any;
  onSwitchWarmTransferSession?: () => any;
  disabledSwitchButton: boolean;
  toggleConference: (open: boolean) => any;
  conferenceParticipantsIsOpen: boolean;
};

type CallInfoProps = Omit<LogBasicInfoProps, 'currentLog'> & {
  displayCallLog: ILogInfo;
};

const SubCallInfoSection: FunctionComponent<CallInfoProps> = ({
  displayCallLog: { call, logName, subContactNameDisplay, entityDetailLinkId },
  disabledSwitchButton,
  currentLocale,
  disableLinks,
  isWide,
  showRecordingIndicator,
  openEntityDetailLink,
  openEntityDetailLinkTrack,
  onSwitchWarmTransferSession,
}) => {
  if (!call) return null;
  const { startTime, offset, duration, telephonyStatus, isRecording } = call;

  function getDurationElm() {
    let durationElement = null;
    if (typeof duration === 'undefined') {
      durationElement = disableLinks ? (
        // TODO: should find what is that key, this unavailable is not exist
        // i18n.getString('unavailable', currentLocale)
        'unavailable'
      ) : (
        <DurationCounter startTime={startTime} offset={offset} />
      );
    } else {
      durationElement = formatDuration(duration);
    }
    return durationElement;
  }
  const durationElement = getDurationElm();
  const infoStatus = getInfoStatus(telephonyStatus);
  const switchButtonDisabled = disableLinks || disabledSwitchButton;
  return (
    <StyleSubBox>
      <div
        data-sign="subLogSection"
        className={clsx(
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
            {entityDetailLinkId ? (
              <RcLink
                variant="inherit"
                onClick={() => {
                  openEntityDetailLink?.(entityDetailLinkId);
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
                  className={styles.subRecordingIndicator}
                  data-sign="subRecordingIndicator"
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
        title={
          switchButtonDisabled
            ? undefined
            : i18n.getString('warmTransferSwitchCall', currentLocale)
        }
        disabled={switchButtonDisabled}
      >
        <RcIcon color="interactive.b02" size="inherit" symbol={ResendFax} />
      </StyledTransferSwitchButton>
    </StyleSubBox>
  );
};

const ActiveCallInfoSection: FunctionComponent<CallInfoProps> = ({
  displayCallLog: { call, logName, subContactNameDisplay, entityDetailLinkId },
  formatPhone,
  currentLocale,
  dataSign,
  disableLinks,
  dateTimeFormatter,
  isWide,
  className,
  showRecordingIndicator,
  openEntityDetailLinkTrack,
  openEntityDetailLink,
  toggleConference,
  conferenceParticipantsIsOpen,
}) => {
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
    isRecording,
    isConferenceCall,
    conferenceParticipants,
  } = call;

  function getDurationElm() {
    let durationElement = null;
    if (typeof duration === 'undefined') {
      durationElement = disableLinks ? (
        // TODO: should find what is that key, this unavailable is not exist
        // i18n.getString('unavailable', currentLocale)
        'unavailable'
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
  const formatNumber = formatPhone?.(number);
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
      className={clsx(
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
              : isConferenceCall
              ? i18n.getString('conferenceCall', currentLocale)
              : i18n.getString(direction!, currentLocale)
          }
          iconClassName={clsx(
            styles.icon,
            callIconMap[
              missed
                ? callResults.missed
                : isConferenceCall
                ? 'conferenceCall'
                : direction!
            ],
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
              {entityDetailLinkId ? (
                <RcLink
                  variant="inherit"
                  onClick={() => {
                    openEntityDetailLink?.(entityDetailLinkId);
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

            <p className={clsx(styles.follow, styles['text-ellipsis'])}>
              {isConferenceCall ? null : (
                <span title={formatNumber} data-sign="phoneNumber">
                  {formatNumber}
                </span>
              )}
              <span data-sign="callStatus" title={statusI18n}>
                {statusI18n}
              </span>
            </p>
          </li>
          {!call.result && isConferenceCall && (
            <li>
              <RcTooltip
                title={`${i18n.getString('participants', currentLocale)} (${
                  conferenceParticipants?.length
                })`}
              >
                <StyledParticipantsButton
                  data-sign="conferenceCallParticipantsIcon"
                  size="xsmall"
                  radius="round"
                  variant="outlined"
                  color={
                    conferenceParticipantsIsOpen
                      ? 'action.primary'
                      : 'action.grayLight'
                  }
                  onClick={() => toggleConference(true)}
                >
                  <RcIcon size="xsmall" symbol={Team} />
                  {conferenceParticipants?.length}
                </StyledParticipantsButton>
              </RcTooltip>
            </li>
          )}

          <li className={styles['flex-fill']} />
          {isWide ? (
            <li className={styles.time}>
              <StyledSide>
                {durationElement}
                {showRecordingIndicator && isRecording && (
                  <RecordingIndicator
                    className={styles.recordingIndicator}
                    data-sign="recordingIndicator"
                  />
                )}
              </StyledSide>
              <p data-sign="startTime">
                {dateTimeFormatter({
                  utcTimestamp: startTime,
                  locale: currentLocale,
                })}
              </p>
            </li>
          ) : (
            <li className={clsx(styles.follow, styles.time)}>
              <p>{durationElement}</p>
              <p>
                {dateTimeFormatter({
                  utcTimestamp: startTime,
                  locale: currentLocale,
                })}
              </p>
              {showRecordingIndicator && isRecording && (
                <RecordingIndicator
                  className={styles.recordingIndicator}
                  data-sign="recordingIndicator"
                />
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const LogBasicInfo: React.FC<LogBasicInfoProps> = React.memo(
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
