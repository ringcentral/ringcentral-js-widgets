import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CallItem from '../CallItem';
import NoCalls from '../NoCalls';

export default class CallList extends PureComponent {
  render() {
    const {
      className,
      brand,
      currentLocale,
      currentSiteCode,
      isMultipleSiteEnabled,
      calls,
      areaCode,
      countryCode,
      onViewContact,
      onCreateContact,
      createEntityTypes,
      onLogCall,
      onClickToDial,
      onClickToSms,
      isLoggedContact,
      disableLinks,
      disableCallButton,
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
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      renderContactName,
      renderExtraButton,
      contactDisplayStyle,
      externalViewEntity,
      externalHasEntity,
      readTextPermission,
      enableCDC,
    } = this.props;

    if (calls && calls.length) {
      return (
        <div className={className}>
          {calls.map((call, index) => (
            <CallItem
              key={call.id}
              call={call}
              renderIndex={index}
              currentLocale={currentLocale}
              brand={brand}
              areaCode={areaCode}
              countryCode={countryCode}
              currentSiteCode={currentSiteCode}
              isMultipleSiteEnabled={isMultipleSiteEnabled}
              onViewContact={onViewContact}
              onCreateContact={onCreateContact}
              createEntityTypes={createEntityTypes}
              onLogCall={onLogCall}
              onClickToDial={onClickToDial}
              onClickToSms={onClickToSms}
              isLoggedContact={isLoggedContact}
              disableLinks={disableLinks}
              disableCallButton={disableCallButton}
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
              phoneTypeRenderer={phoneTypeRenderer}
              phoneSourceNameRenderer={phoneSourceNameRenderer}
              renderContactName={renderContactName}
              renderExtraButton={renderExtraButton}
              contactDisplayStyle={contactDisplayStyle}
              externalViewEntity={externalViewEntity}
              externalHasEntity={externalHasEntity}
              readTextPermission={readTextPermission}
              enableCDC={enableCDC}
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
}

CallList.propTypes = {
  className: PropTypes.string,
  brand: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  currentSiteCode: PropTypes.string,
  isMultipleSiteEnabled: PropTypes.bool,
  calls: PropTypes.arrayOf(CallItem.propTypes.call).isRequired,
  active: PropTypes.bool,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  onViewContact: PropTypes.func,
  onCreateContact: PropTypes.func,
  createEntityTypes: PropTypes.array,
  onLogCall: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  isLoggedContact: PropTypes.func,
  loggingMap: PropTypes.object,
  disableLinks: PropTypes.bool,
  disableCallButton: PropTypes.bool,
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
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  renderContactName: PropTypes.func,
  renderExtraButton: PropTypes.func,
  contactDisplayStyle: PropTypes.string,
  externalViewEntity: PropTypes.func,
  externalHasEntity: PropTypes.func,
  readTextPermission: PropTypes.bool,
  enableCDC: PropTypes.bool,
};

CallList.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  className: null,
  active: false,
  disableLinks: false,
  disableCallButton: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  onViewContact: undefined,
  onCreateContact: undefined,
  createEntityTypes: undefined,
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
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  enableCDC: false,
};
