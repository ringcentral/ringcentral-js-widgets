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
  renderSubContactName?: (...args: any[]) => any;
  renderExtraButton?: (...args: any[]) => any;
  contactDisplayStyle?: string;
  externalViewEntity?: (...args: any[]) => any;
  externalHasEntity?: (...args: any[]) => any;
  readTextPermission?: boolean;
  rowHeight?: number;
  extendedRowHeight?: number;
  showChooseEntityModal?: boolean;
  enableCDC?: boolean;
};
type CallListV2State = {
  extendedIndex: null;
};
class CallListV2 extends React.PureComponent<CallListV2Props, CallListV2State> {
  constructor(props) {
    super(props);
    this.state = {
      extendedIndex: null,
    };
    this._list = React.createRef();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { extendedIndex } = this.state;
    const { calls } = this.props;
    if (
      extendedIndex !== null &&
      calls[extendedIndex] !== nextProps.calls[extendedIndex]
    ) {
      this._setExtendedIndex(null);
    }
  }
  _setExtendedIndex = (extendedIndex) => {
    this.setState(
      {
        extendedIndex,
      },
      () => {
        if (this._list && this._list.current) {
          this._list.current.recomputeRowHeights(0);
        }
      },
    );
  };
  _onSizeChanged = (index) => {
    const { extendedIndex } = this.state;
    if (extendedIndex === index) {
      this._setExtendedIndex(null);
    } else {
      this._setExtendedIndex(index);
    }
  };
  _renderRowHeight = ({ index }) => {
    // If we don't add extra height for the last item
    // the toggle button will be cut off
    const { calls, extendedRowHeight, rowHeight } = this.props;
    const { extendedIndex } = this.state;
    const margin = index === calls.length - 1 ? 15 : 0;
    const height = index === extendedIndex ? extendedRowHeight : rowHeight;
    return height + margin;
  };
  _rowRender = ({ index, key, style }) => {
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
      sourceIcons,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      renderContactName,
      renderSubContactName,
      renderExtraButton,
      contactDisplayStyle,
      externalViewEntity,
      externalHasEntity,
      readTextPermission,
      currentSiteCode,
      isMultipleSiteEnabled,
      showChooseEntityModal,
      enableCDC,
    } = this.props;
    const { extendedIndex } = this.state;
    let content;
    if (index >= calls.length) {
      content = (
        <div className={className}>
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
          style={style}
          call={call}
          currentLocale={currentLocale}
          currentSiteCode={currentSiteCode}
          isMultipleSiteEnabled={isMultipleSiteEnabled}
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
          renderSubContactName={renderSubContactName}
          renderExtraButton={renderExtraButton}
          contactDisplayStyle={contactDisplayStyle}
          externalViewEntity={externalViewEntity}
          externalHasEntity={externalHasEntity}
          readTextPermission={readTextPermission}
          onSizeChanged={this._onSizeChanged}
          // disable animation when rendered with react-virtualized
          withAnimation={false}
          showChooseEntityModal={showChooseEntityModal}
          enableCDC={enableCDC}
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
    return <NoCalls currentLocale={currentLocale} active={active} />;
  };
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
  autoLog: false,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderSubContactName: undefined,
  renderExtraButton: undefined,
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
