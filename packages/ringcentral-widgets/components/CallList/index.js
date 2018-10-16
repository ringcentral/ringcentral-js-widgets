import React from 'react';
import PropTypes from 'prop-types';
import CallItem from '../CallItem';
import NoCalls from '../NoCalls';

export class CallList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      className,
      brand,
      currentLocale,
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
      readTextPermission,
    } = this.props;

    if (calls && calls.length) {
      return (
        <div className={className}>
          {calls.map((call, index) => (
            <CallItem
              key={call.id}
              call={call}
              renderIndex={index}
              extended={
                (this._renderIndex === index && this._cellExtended) || false
              }
              currentLocale={currentLocale}
              brand={brand}
              areaCode={areaCode}
              countryCode={countryCode}
              onViewContact={onViewContact}
              onCreateContact={onCreateContact}
              createEntityTypes={createEntityTypes}
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
              readTextPermission={readTextPermission}
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
  renderIndex: PropTypes.number,
  extended: PropTypes.bool,
  className: PropTypes.string,
  brand: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
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
  readTextPermission: PropTypes.bool,
};

CallList.defaultProps = {
  renderIndex: undefined,
  extended: undefined,
  className: null,
  active: false,
  disableLinks: false,
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
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
};
