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
  onClickToDial,
  onClickToSms,
  isLoggedContact,
  disableLinks,
  disableClickToDial,
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
            onClickToDial={onClickToDial}
            onClickToSms={onClickToSms}
            isLoggedContact={isLoggedContact}
            disableLinks={disableLinks}
            disableClickToDial={disableClickToDial}
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
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  isLoggedContact: PropTypes.func,
  loggingMap: PropTypes.object,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
};
CallList.defaultProps = {
  className: null,
  active: false,
  disableLinks: false,
  disableClickToDial: false,
  onViewContact: undefined,
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  loggingMap: {},
};

export default CallList;
