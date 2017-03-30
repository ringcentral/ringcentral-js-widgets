import React, { PropTypes } from 'react';
import CallItem from '../CallItem';
import styles from './styles.scss';
import i18n from './i18n';

function NoCalls({ currentLocale }) {
  return (
    <p className={styles.noCalls}>{i18n.getString('noActiveCalls', currentLocale)}</p>
  );
}
NoCalls.propTypes = {
  currentLocale: PropTypes.string.isRequired,
};

function CallList({
  className,
  currentLocale,
  calls,
  areaCode,
  countryCode,
  onViewContact,
  onLogCall,
  isLoggedContact,
  disableLinks,
  active,
  dateTimeFormatter,
  loggingMap,
}) {
  if (calls && calls.length) {
    return (
      <div className={className}>
        {calls.map(call => (
          <CallItem
            key={call.id}
            call={call}
            currentLocale={currentLocale}
            areaCode={areaCode}
            countryCode={countryCode}
            onViewContact={onViewContact}
            onLogCall={onLogCall}
            isLoggedContact={isLoggedContact}
            disableLinks={disableLinks}
            active={active}
            dateTimeFormatter={dateTimeFormatter}
            isLogging={!!loggingMap[call.sessionId]}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={className}>
      <NoCalls currentLocale={currentLocale} />
    </div>
  );
}

CallList.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  calls: PropTypes.arrayOf(CallItem.propTypes.call).isRequired,
  active: PropTypes.bool,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  onViewContact: PropTypes.func,
  onLogCall: PropTypes.func,
  isLoggedContact: PropTypes.func,
  loggingMap: PropTypes.object,
  disableLinks: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
};
CallList.defaultProps = {
  className: null,
  active: false,
  disableLinks: false,
  onViewContact: undefined,
  onLogCall: undefined,
  loggingMap: {},
};

export default CallList;
