import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import formatDuration from '../../lib/formatDuration';
import Spinner from '../Spinner';
import styles from './styles.scss';
import i18n from './i18n';

function getCurrentStatus({ direction, result }, currentLocale) {
  if (direction === 'Inbound') {
    if (result === 'Missed') {
      return {
        status: i18n.getString('missed', currentLocale),
        icon: dynamicsFont.missed,
        isMissedCall: true
      };
    }
    return {
      status: i18n.getString('inBound', currentLocale),
      icon: dynamicsFont.inbound
    };
  }
  return {
    status: i18n.getString('outBound', currentLocale),
    icon: dynamicsFont.outbound
  };
}

function CallItem({ call, dateTimeFormatter, currentLocale }) {
  let { duration, startTime } = call;
  const { status, icon, isMissedCall } = getCurrentStatus(call, currentLocale);
  startTime = dateTimeFormatter({ utcTimestamp: new Date(startTime).getTime() });
  duration = formatDuration(duration);
  return (
    <div
      className={styles.callItem}
    >
      <dl className={classnames(styles.dl, isMissedCall ? styles.missedCall : '')}>
        <dt className={styles.status} title={status}>
          <i className={classnames(icon, styles.callIcon)} title={status} />
          <span title={status}>{status}</span>
          <small className={styles.duration} title={duration}>{duration}</small>
        </dt>
        <dd className={styles.time} title={startTime}>{startTime}</dd>
      </dl>
    </div>
  );
}

CallItem.propTypes = {
  call: PropTypes.object.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired
};

export default function RecentActivityMessages({
  currentLocale,
  calls,
  isCallsLoaded,
  dateTimeFormatter
}) {
  let callListView = null;
  if (!isCallsLoaded) {
    callListView = (<Spinner className={styles.spinner} ringWidth={4} />);
  } else if (calls.length > 0) {
    callListView = calls.map(call => (
      <CallItem
        key={call.id}
        call={call}
        currentLocale={currentLocale}
        dateTimeFormatter={dateTimeFormatter}
      />
    ));
  } else {
    callListView = (<p className={styles.noRecords}>{i18n.getString('noRecords', currentLocale)}</p>);
  }
  return (
    <div className={styles.calls}>
      { callListView }
    </div>
  );
}

RecentActivityMessages.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  calls: PropTypes.array.isRequired,
  isCallsLoaded: PropTypes.bool.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired
};
