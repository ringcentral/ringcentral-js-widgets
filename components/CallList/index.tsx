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
  loggingMap?: any;
  disableLinks?: boolean;
  disableCallButton?: boolean;
  disableClickToDial?: boolean;
  outboundSmsPermission?: boolean;
  internalSmsPermission?: boolean;
  dateTimeFormatter: (...args: any[]) => any;
  enableContactFallback?: boolean;
  autoLog?: boolean;
  showContactDisplayPlaceholder?: boolean;
  showCallerIdName?: boolean;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  renderContactName?: (...args: any[]) => any;
  renderExtraButton?: (...args: any[]) => any;
  contactDisplayStyle?: string;
  externalViewEntity?: (...args: any[]) => any;
  externalHasEntity?: (...args: any[]) => any;
  shouldHideEntityButton?: (...args: any[]) => boolean;
  readTextPermission?: boolean;
  enableCDC?: boolean;
  maxExtensionNumberLength?: number;
  callsDelaySavingState?: Record<string, any>;
};

const CallList: React.FC<CallListProps> = ({
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
  dateTimeFormatter,
  enableContactFallback,
  showCallerIdName,
  sourceIcons,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
  renderContactName,
  renderExtraButton,
  contactDisplayStyle,
  externalViewEntity,
  externalHasEntity,
  shouldHideEntityButton,
  maxExtensionNumberLength,
  currentSiteCode = '',
  isMultipleSiteEnabled = false,
  active = false,
  disableLinks = false,
  disableCallButton = false,
  disableClickToDial = false,
  outboundSmsPermission = false,
  internalSmsPermission = false,
  loggingMap = {},
  showContactDisplayPlaceholder = true,
  autoLog = false,
  readTextPermission = true,
  enableCDC = false,
  callsDelaySavingState,
}) => {
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
            showCallerIdName={showCallerIdName}
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
            active={!!active}
            dateTimeFormatter={dateTimeFormatter}
            isLogging={!!loggingMap[call.sessionId]}
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
            shouldHideEntityButton={shouldHideEntityButton}
            readTextPermission={readTextPermission}
            enableCDC={enableCDC}
            maxExtensionNumberLength={maxExtensionNumberLength}
            currentDelaySavingState={
              callsDelaySavingState && callsDelaySavingState[call.sessionId]
            }
          />
        ))}
      </div>
    );
  }
  return (
    <div className={className}>
      <NoCalls currentLocale={currentLocale} active={!!active} />
    </div>
  );
};

export default CallList;
