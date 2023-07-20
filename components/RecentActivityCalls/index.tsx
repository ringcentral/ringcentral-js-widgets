import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { formatDuration } from '@ringcentral-integration/commons/lib/formatDuration';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import Spinner from '../Spinner';
import i18n from './i18n';
import styles from './styles.scss';

function getCurrentStatus({ direction, result }: any, currentLocale: any) {
  if (direction === 'Inbound') {
    if (result === 'Missed') {
      return {
        status: i18n.getString('missed', currentLocale),
        icon: dynamicsFont.missed,
        isMissedCall: true,
      };
    }
    return {
      status: i18n.getString('inBound', currentLocale),
      icon: dynamicsFont.inbound,
    };
  }
  return {
    status: i18n.getString('outBound', currentLocale),
    icon: dynamicsFont.outbound,
  };
}

const CallItem = ({ call, dateTimeFormatter, currentLocale }: any) => {
  let { duration, startTime } = call;
  const { status, icon, isMissedCall } = getCurrentStatus(call, currentLocale);
  startTime = dateTimeFormatter({
    utcTimestamp: new Date(startTime).getTime(),
  });
  duration = formatDuration(duration);
  return (
    <div className={styles.callItem}>
      <dl
        className={classnames(styles.dl, isMissedCall ? styles.missedCall : '')}
      >
        <dt className={styles.status} title={status}>
          <span className={styles.iconWrapper}>
            <i className={classnames(icon, styles.callIcon)} title={status} />
          </span>
          <span title={status}>{status}</span>
          <small className={styles.duration} title={duration}>
            {duration}
          </small>
        </dt>
        <dd className={styles.time} title={startTime}>
          {startTime}
        </dd>
      </dl>
    </div>
  );
};

CallItem.propTypes = {
  call: PropTypes.object.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

class RecentActivityCalls extends Component {
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  shouldComponentUpdate(nextProps: any) {
    return (
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      nextProps.currentLocale !== this.props.currentLocale ||
      // @ts-expect-error TS(2339): Property 'calls' does not exist on type 'Readonly<... Remove this comment to see the full error message
      nextProps.calls !== this.props.calls ||
      // @ts-expect-error TS(2339): Property 'isCallsLoaded' does not exist on type 'R... Remove this comment to see the full error message
      nextProps.isCallsLoaded !== this.props.isCallsLoaded
    );
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
    const { currentLocale, calls, isCallsLoaded, dateTimeFormatter } =
      this.props;
    let callListView = null;
    if (!isCallsLoaded) {
      callListView = <Spinner className={styles.spinner} ringWidth={4} />;
    } else if (calls.length > 0) {
      callListView = calls.map((call: any) => (
        <CallItem
          key={call.id}
          call={call}
          currentLocale={currentLocale}
          dateTimeFormatter={dateTimeFormatter}
        />
      ));
    } else {
      callListView = (
        <p className={styles.noRecords}>
          {i18n.getString('noRecords', currentLocale)}
        </p>
      );
    }
    return <div className={styles.calls}>{callListView}</div>;
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
RecentActivityCalls.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  calls: PropTypes.array.isRequired,
  isCallsLoaded: PropTypes.bool.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
};

export default RecentActivityCalls;
