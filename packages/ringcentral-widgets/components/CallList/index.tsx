import React, { PureComponent } from 'react';

import CallItem from '../CallItem';
import NoCalls from '../NoCalls';

type CallListProps = {
  className?: string;
  brand: string;
  currentLocale: string;
  currentSiteCode?: string;
  isMultipleSiteEnabled?: boolean;
  calls: any[];
  active?: boolean;
  areaCode: string;
  countryCode: string;
  onViewContact?: (...args: any[]) => any;
  onCreateContact?: (...args: any[]) => any;
  createEntityTypes?: any[];
  onLogCall?: (...args: any[]) => any;
  onClickToDial?: (...args: any[]) => any;
  onClickToSms?: (...args: any[]) => any;
  isLoggedContact?: (...args: any[]) => any;
  loggingMap?: object;
  disableLinks?: boolean;
  disableCallButton?: boolean;
  disableClickToDial?: boolean;
  outboundSmsPermission?: boolean;
  internalSmsPermission?: boolean;
  dateTimeFormatter: (...args: any[]) => any;
  webphoneAnswer?: (...args: any[]) => any;
  webphoneReject?: (...args: any[]) => any;
  webphoneHangup?: (...args: any[]) => any;
  webphoneResume?: (...args: any[]) => any;
  enableContactFallback?: boolean;
  autoLog?: boolean;
  showContactDisplayPlaceholder?: boolean;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  renderContactName?: (...args: any[]) => any;
  renderExtraButton?: (...args: any[]) => any;
  contactDisplayStyle?: string;
  externalViewEntity?: (...args: any[]) => any;
  externalHasEntity?: (...args: any[]) => any;
  readTextPermission?: boolean;
  enableCDC?: boolean;
  maxExtensionNumberLength: number;
};
class CallList extends PureComponent<CallListProps, {}> {
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
      maxExtensionNumberLength,
    } = this.props;
    if (calls && calls.length) {
      return (
        <div className={className}>
          {calls.map((call, index) => (
            <CallItem
              key={call.id}
              // @ts-expect-error TS(2322): Type '{ key: any; call: any; renderIndex: number; ... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
              maxExtensionNumberLength={maxExtensionNumberLength}
            />
          ))}
        </div>
      );
    }
    return (
      <div className={className}>
        {/* @ts-expect-error TS(2322): Type 'boolean | undefined' is not */}
        <NoCalls currentLocale={currentLocale} active={active} />
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
export default CallList;
