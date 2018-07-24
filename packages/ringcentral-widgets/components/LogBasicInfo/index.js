import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import callDirections from 'ringcentral-integration/enums/callDirections';
import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import { isMissed } from 'ringcentral-integration/lib/callLogHelpers';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import i18n from './i18n';
import styles from './styles.scss';

const callIconMap = {
  [callResults.missed]: dynamicsFont.missed,
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
  [telephonyStatuses.ringing]: dynamicsFont.callHover
};
const colorStatusMap = {
  green: [
    telephonyStatuses.callConnected,
    telephonyStatuses.ringing,
    callResults.callAccepted,
    callResults.accepted,
  ],
  red: [
    callResults.missed,
    callResults.voicemail,
    callResults.rejected,
    callResults.blocked,
    callResults.noAnswer,
    callResults.busy,
    callResults.hangUp,
    callResults.HangUp,
    callResults.declined
  ],
  orange: [
    telephonyStatuses.onHold,
    telephonyStatuses.parkedCall
  ],
};

export default function LogBasicInfo(props) {
  const {
    currentLog: {
      call,
      logName,
    },
    formatPhone,
    currentLocale,
  } = props;
  if (!call) return null;
  const {
    direction,
    to,
    from,
    duration,
    result,
    telephonyStatus
  } = call;
  const number = direction === callDirections.outbound ?
    (to && (to.phoneNumber || to.extensionNumber)) :
    (from && (from.phoneNumber || from.extensionNumber));
  const formatNumber = formatPhone(number);
  const status = result || telephonyStatus;
  const active = (!duration && duration !== 0);
  const missed = isMissed(call);
  const green = colorStatusMap.green.includes(status);
  const red = colorStatusMap.red.includes(status);
  const orange = colorStatusMap.orange.includes(status);
  const isRinging = status === telephonyStatuses.ringing;
  const title = missed ? i18n.getString(callResults.missed, currentLocale) :
    i18n.getString(direction, currentLocale);
  const statusI18n = i18n.getString(status, currentLocale);
  const iconClassName = classnames(
    styles.icon,
    isRinging && styles.ringing,
    isRinging && dynamicsFont.callHover,
    !isRinging && !missed && callIconMap[direction],
    missed && styles.missed,
    missed && callIconMap[callResults.missed],
    !isRinging && active && styles.active
  );
  const statusClassName = classnames(
    styles.status,
    green && styles.green,
    red && styles.red,
    orange && styles.orange
  );
  return (
    <div className={styles.callInfo}>
      <div
        className={styles.callIcon}
        title={title}>
        <span
          className={iconClassName}
        />
      </div>
      <ul className={styles.callDisplay}>
        <li
          className={styles.contact}
          title={logName}>
          {logName}
        </li>
        <li>
          <span
            className={styles.number}
            title={formatNumber}>
            {formatNumber}
          </span>
          {
            formatNumber ? (
              <span className={styles.separator}>|</span>
            ) : null
          }
          <span
            className={statusClassName}
            title={statusI18n}>
            {statusI18n}
          </span>
        </li>
      </ul>
    </div>
  );
}

LogBasicInfo.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func,
  currentLog: PropTypes.object,
};

LogBasicInfo.defaultProps = {
  formatPhone: value => value,
  currentLog: {},
};
