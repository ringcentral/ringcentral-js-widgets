import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import callDirections from 'ringcentral-integration/enums/callDirections';
import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import { isMissed } from 'ringcentral-integration/lib/callLogHelpers';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import DurationCounter from '../DurationCounter';
import formatDuration from '../../lib/formatDuration';

import i18n from './i18n';
import styles from './styles.scss';
import { CallIcon } from './CallIcon';
import { ShinyBar } from './ShinyBar';

const callIconMap = {
  [callResults.missed]: dynamicsFont.missed,
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
  [telephonyStatuses.ringing]: dynamicsFont.callHover,
};

function getInfoStatus(status) {
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

export default function LogBasicInfo(props) {
  const {
    currentLog: { call, logName },
    formatPhone,
    currentLocale,
    dataSign,
    disableLinks,
    dateTimeFormatter,
    isWide,
    className,
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

  return (
    <div
      data-sign="logSection"
      className={classnames(
        styles.root,
        !isWide && styles.classic,
        styles[infoStatus],
        className,
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
        <ul className={styles.callDisplay}>
          <li className={styles.info}>
            <p className={styles.logName} title={logName}>
              {logName}
            </p>
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
}

LogBasicInfo.propTypes = {
  currentLocale: PropTypes.string,
  formatPhone: PropTypes.func,
  currentLog: PropTypes.object,
  dataSign: PropTypes.string,
  disableLinks: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  isWide: PropTypes.bool,
  className: PropTypes.string,
};

LogBasicInfo.defaultProps = {
  formatPhone: (value) => value,
  currentLog: {},
  dataSign: undefined,
  disableLinks: false,
  isWide: true,
  currentLocale: 'en',
  className: null,
};
