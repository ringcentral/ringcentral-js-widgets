import React from 'react';
import PropTypes from 'prop-types';
import CallItem from '../CallItem';
import styles from './styles.scss';
import i18n from './i18n';

function NoCalls({ currentLocale, active }) {
  return (
    <p className={styles.noCalls}>
      {i18n.getString(active ? 'noActiveCalls' : 'noRecords', currentLocale)}
    </p>
  );
}
NoCalls.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

function CallList({
  className,
  brand,
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
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  enableContactFallback,
  autoLog,
  showContactDisplayPlaceholder,
  sourceIcons,
  renderContactName,
  renderExtraButton,
  contactDisplayStyle,
  externalViewEntity,
  externalHasEntity,
}) {
  if (calls && calls.length) {
    return (
      <div className={className}>
        {calls.map(call => (
          <CallItem
            key={call.id}
            call={call}
            currentLocale={currentLocale}
            brand={brand}
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
            webphoneAnswer={webphoneAnswer}
            webphoneReject={webphoneReject}
            webphoneHangup={webphoneHangup}
            webphoneResume={webphoneResume}
            enableContactFallback={enableContactFallback}
            autoLog={autoLog}
            showContactDisplayPlaceholder={showContactDisplayPlaceholder}
            sourceIcons={sourceIcons}
            renderContactName={renderContactName}
            renderExtraButton={renderExtraButton}
            contactDisplayStyle={contactDisplayStyle}
            externalViewEntity={externalViewEntity}
            externalHasEntity={externalHasEntity}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={className}>
      <NoCalls currentLocale={currentLocale} active={active} />
    </div>
  );
}

CallList.propTypes = {
  className: PropTypes.string,
  brand: PropTypes.string.isRequired,
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
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  autoLog: PropTypes.bool,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  renderContactName: PropTypes.func,
  renderExtraButton: PropTypes.func,
  contactDisplayStyle: PropTypes.string,
  externalViewEntity: PropTypes.func,
  externalHasEntity: PropTypes.func,
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
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  autoLog: false,
  sourceIcons: undefined,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
};

export default CallList;
