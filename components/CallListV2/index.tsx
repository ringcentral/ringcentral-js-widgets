import React from 'react';
import { List } from 'react-virtualized';

import CallItem from '../CallItem';
import NoCalls from '../NoCalls';

type CallListV2Props = {
  currentSiteCode?: string;
  isMultipleSiteEnabled?: boolean;
  className?: string;
  width: number;
  height: number;
  brand: string;
  currentLocale: string;
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
  webphoneAnswer?: (...args: any[]) => any;
  webphoneReject?: (...args: any[]) => any;
  webphoneHangup?: (...args: any[]) => any;
  webphoneResume?: (...args: any[]) => any;
  enableContactFallback?: boolean;
  autoLog?: boolean;
  showContactDisplayPlaceholder?: boolean;
  showCallerIdName?: boolean;
  isSyncingActivityMatcher?: boolean;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  renderContactName?: (...args: any[]) => any;
  renderSubContactName?: (...args: any[]) => any;
  renderExtraButton?: (...args: any[]) => any;
  contactDisplayStyle?: string;
  externalViewEntity?: (...args: any[]) => any;
  externalHasEntity?: (...args: any[]) => any;
  shouldHideEntityButton?: (...args: any[]) => boolean;
  readTextPermission?: boolean;
  rowHeight?: number;
  extendedRowHeight?: number;
  showChooseEntityModal?: boolean;
  enableCDC?: boolean;
  maxExtensionNumberLength: number;
  formatPhone?: (phoneNumber: string) => string | undefined;
  callsDelaySavingState: Record<string, any>;
};

type CallListV2State = {
  extendedIndex: number | null;
};

class CallListV2 extends React.PureComponent<CallListV2Props, CallListV2State> {
  _list: any;
  constructor(props: any) {
    super(props);
    this.state = {
      extendedIndex: null,
    };
    this._list = React.createRef();
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    const { extendedIndex } = this.state;
    const { calls } = this.props;
    if (
      extendedIndex !== null &&
      calls[extendedIndex].sessionId !==
        nextProps.calls[extendedIndex].sessionId
    ) {
      this._setExtendedIndex(null);
    }
  }
  _recomputeRowHeight = (index = 0) => {
    if (this._list && this._list.current) {
      this._list.current.recomputeRowHeights(index);
    }
  };
  _setExtendedIndex = (extendedIndex: any) => {
    this.setState(
      {
        extendedIndex,
      },
      () => {
        this._recomputeRowHeight(0);
      },
    );
  };
  _onSizeChanged = (index: any) => {
    const { extendedIndex } = this.state;
    if (extendedIndex === index) {
      this._setExtendedIndex(null);
    } else {
      this._setExtendedIndex(index);
    }
  };
  _renderRowHeight = ({ index }: any) => {
    // If we don't add extra height for the last item
    // the toggle button will be cut off
    const {
      calls,
      extendedRowHeight = 130,
      rowHeight = 65,
      callsDelaySavingState,
    } = this.props;
    const call = calls[index];

    const heightForAnsweredBy =
      call.result === 'Answered Elsewhere' &&
      call.delegationType === 'QueueForwarding'
        ? 15
        : 0;

    const isDelaySavingState =
      callsDelaySavingState && callsDelaySavingState[call.sessionId];
    const { extendedIndex } = this.state;

    const margin = index === calls.length - 1 ? 15 : 0;
    const delaySavingStateHeight = isDelaySavingState ? 13 : 0;
    const height =
      index === extendedIndex
        ? extendedRowHeight
        : rowHeight + delaySavingStateHeight + heightForAnsweredBy;
    return height + margin;
  };
  _rowRender = ({ index, key, style }: any) => {
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
      showCallerIdName,
      sourceIcons,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      renderContactName,
      renderSubContactName,
      renderExtraButton,
      isSyncingActivityMatcher,
      contactDisplayStyle,
      externalViewEntity,
      externalHasEntity,
      shouldHideEntityButton,
      readTextPermission,
      currentSiteCode,
      isMultipleSiteEnabled,
      showChooseEntityModal,
      enableCDC,
      maxExtensionNumberLength,
      formatPhone,
      callsDelaySavingState,
    } = this.props;
    const { extendedIndex } = this.state;
    let content;

    if (index >= calls.length) {
      content = (
        <div className={className}>
          {/* @ts-expect-error TS(2322): Type 'boolean | undefined' is not */}
          <NoCalls currentLocale={currentLocale} active={active} />
        </div>
      );
    } else {
      const call = calls[index];
      content = (
        <CallItem
          key={call.id}
          renderIndex={index}
          extended={extendedIndex === index}
          call={call}
          currentLocale={currentLocale}
          currentSiteCode={currentSiteCode}
          isMultipleSiteEnabled={isMultipleSiteEnabled}
          brand={brand}
          areaCode={areaCode}
          countryCode={countryCode}
          onViewContact={onViewContact}
          onCreateContact={onCreateContact}
          shouldHideEntityButton={shouldHideEntityButton}
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
          showCallerIdName={showCallerIdName}
          sourceIcons={sourceIcons}
          phoneTypeRenderer={phoneTypeRenderer}
          phoneSourceNameRenderer={phoneSourceNameRenderer}
          renderContactName={renderContactName}
          renderSubContactName={renderSubContactName}
          renderExtraButton={renderExtraButton}
          isSyncingActivityMatcher={isSyncingActivityMatcher}
          contactDisplayStyle={contactDisplayStyle}
          externalViewEntity={externalViewEntity}
          externalHasEntity={externalHasEntity}
          readTextPermission={readTextPermission}
          onSizeChanged={this._onSizeChanged}
          onItemHeightChanged={this._recomputeRowHeight}
          // disable animation when rendered with react-virtualized
          withAnimation={false}
          showChooseEntityModal={showChooseEntityModal}
          enableCDC={enableCDC}
          maxExtensionNumberLength={maxExtensionNumberLength}
          formatPhone={formatPhone}
          currentDelaySavingState={
            callsDelaySavingState && callsDelaySavingState[call.sessionId]
          }
        />
      );
    }
    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };
  noRowsRender = () => {
    const { currentLocale, active } = this.props;
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    return <NoCalls currentLocale={currentLocale} active={active} />;
  };
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { width, height, calls, className } = this.props;
    return (
      <div>
        <List
          style={{ outline: 'none', overflowY: 'auto' }}
          containerStyle={{ overflow: 'visible' }}
          ref={this._list}
          width={width}
          height={height}
          overscanRowCount={15}
          className={className}
          rowCount={calls.length}
          rowHeight={this._renderRowHeight}
          rowRenderer={this._rowRender}
          noRowsRenderer={this.noRowsRender}
        />
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
CallListV2.defaultProps = {
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
  showCallerIdName: false,
  autoLog: false,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderSubContactName: undefined,
  renderExtraButton: undefined,
  isSyncingActivityMatcher: false,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  rowHeight: 65,
  extendedRowHeight: 130,
  showChooseEntityModal: true,
  enableCDC: false,
};
export default CallListV2;
