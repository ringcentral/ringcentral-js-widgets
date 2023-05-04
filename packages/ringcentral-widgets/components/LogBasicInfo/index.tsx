import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import { includes } from 'ramda';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import callResults from '@ringcentral-integration/commons/enums/callResults';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import { isMissed } from '@ringcentral-integration/commons/lib/callLogHelpers';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import i18n from './i18n';
import styles from './styles.scss';

const CallIcon = ({ title, iconClassName }: any) => (
  <div className={styles.callIcon} title={title}>
    <span className={iconClassName} />
  </div>
);

CallIcon.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string.isRequired,
};

CallIcon.defaultProps = {
  title: '',
};

const callIconMap = {
  [callResults.missed]: dynamicsFont.missed,
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
  [telephonyStatuses.ringing]: dynamicsFont.callHover,
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
    callResults.declined,
  ],
  orange: [telephonyStatuses.onHold, telephonyStatuses.parkedCall],
};

const LogBasicInfo = (props: any) => {
  const {
    currentLog: { call, logName },
    formatPhone,
    currentLocale,
    clickable,
    onClick,
    dataSign,
  } = props;
  if (!call) return null;
  const { direction, to, from, duration, result, telephonyStatus } = call;
  const number =
    direction === callDirections.outbound
      ? to && (to.phoneNumber || to.extensionNumber)
      : from && (from.phoneNumber || from.extensionNumber);
  const formatNumber = formatPhone(number);
  const status = result || telephonyStatus;
  const active = !duration && duration !== 0;
  const missed = isMissed(call);
  const green = includes(status, colorStatusMap.green);
  const red = includes(status, colorStatusMap.red);
  const orange = includes(status, colorStatusMap.orange);
  const isRinging = status === telephonyStatuses.ringing;
  const title = missed
    ? i18n.getString(callResults.missed, currentLocale)
    : i18n.getString(direction, currentLocale);
  const statusI18n = i18n.getString(status, currentLocale);
  const iconClassName = classnames(
    styles.icon,
    isRinging && styles.ringing,
    isRinging && dynamicsFont.callHover,
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    !isRinging && !missed && callIconMap[direction],
    missed && styles.missed,
    missed && callIconMap[callResults.missed],
    !isRinging && active && styles.active,
  );
  const statusClassName = classnames(
    styles.status,
    green && styles.green,
    red && styles.red,
    orange && styles.orange,
  );
  return (
    <div data-sign="logSection" className={styles.root}>
      <div
        data-sign={dataSign}
        className={classnames(styles.callInfo, clickable && styles.pointer)}
        onClick={clickable ? onClick : () => {}}
      >
        <CallIcon title={title} iconClassName={iconClassName} />
        <ul className={styles.callDisplay}>
          <li className={styles.contact} title={logName}>
            {logName}
          </li>
          <li className={styles.callDetail}>
            <span className={styles.number} title={formatNumber}>
              {formatNumber}
            </span>
            {formatNumber ? (
              <span className={styles.separator}>&nbsp;</span>
            ) : null}
            <span
              data-sign="callStatus"
              className={statusClassName}
              title={statusI18n}
            >
              {statusI18n}
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.extra}>{props.extraButton}</div>
    </div>
  );
};

LogBasicInfo.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func,
  currentLog: PropTypes.object,
  extraButton: PropTypes.object,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  dataSign: PropTypes.string,
};

LogBasicInfo.defaultProps = {
  formatPhone: (value: any) => value,
  currentLog: {},
  extraButton: undefined,
  clickable: false,
  onClick() {},
  dataSign: undefined,
};

export default LogBasicInfo;
