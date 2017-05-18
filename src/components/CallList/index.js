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
  onCreateContact,
  onLogCall,
  onClickToDial,
  onClickToSms,
  isLoggedContact,
  disableLinks,
  disableClickToDial,
  outboundSmsPermission,
  internalSmsPermission,
  active,
  dateTimeFormatter,
  loggingMap,
  enableContactFallback,
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
            onCreateContact={onCreateContact}
            onLogCall={onLogCall}
            onClickToDial={onClickToDial}
            onClickToSms={onClickToSms}
            isLoggedContact={isLoggedContact}
            disableLinks={disableLinks}
            disableClickToDial={disableClickToDial}
            outboundSmsPermission={outboundSmsPermission}
            internalSmsPermission={internalSmsPermission}
            active={active}
            dateTimeFormatter={dateTimeFormatter}
            isLogging={!!loggingMap[call.sessionId]}
            enableContactFallback={enableContactFallback}
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
  onCreateContact: PropTypes.func,
  onLogCall: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  isLoggedContact: PropTypes.func,
  loggingMap: PropTypes.object,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  enableContactFallback: PropTypes.bool,
};
CallList.defaultProps = {
  className: null,
  active: false,
  disableLinks: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  onViewContact: undefined,
  onCreateContact: undefined,
  onLogCall: undefined,
  isLoggedContact: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  loggingMap: {},
  enableContactFallback: undefined,
};

export default CallList;
