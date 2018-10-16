import React from 'react';
import PropTypes from 'prop-types';
import CallItem from '../CallItem';
import NoCalls from '../NoCalls';
import { List } from 'react-virtualized';

export class CallListV2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this._rowHeight = 65;
    this._list = React.createRef();

    this._mostRecentWidth = 0;
    this._resizeAllFlag = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.calls !== prevProps.calls) {
      if (this._list && this._list.current) {
        this._list.current.forceUpdateGrid();
      }
    }

    if (this._resizeAllFlag) {
      this._resizeAllFlag = false;

      if (this._list) {
        this._list.current.recomputeRowHeights();
      }
    } else if (this.props.calls !== prevProps.calls) {
      const index = prevProps.calls.length;
      if (this._list) {
        this._list.current.recomputeRowHeights(index);
      }
    }
  }

  _resizeAll = (index, extended) => {
    this._resizeAllFlag = false;
    this._renderIndex = index;
    this._cellExtended = extended;
    if (this._list && this._list.current) {
      this._list.current.recomputeRowHeights();
      this._list.current.forceUpdateGrid();
    }
  };

  _renderRowHeight = (params) => {
    if (
      this._renderIndex !== undefined &&
      this._renderIndex === params.index &&
      this._cellExtended
    ) {
      return this._rowHeight * 2;
    }
    return this._rowHeight;
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
          extended={
            (this._renderIndex === index && this._cellExtended) || false
          }
          style={style}
          call={call}
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
          onSizeChanged={this._resizeAll}
        />
      );
    }

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };

  render() {
    const { calls, className, width = 300, height = 315 } = this.props;

    return (
      <List
        style={{ outline: 'none' }}
        ref={this._list}
        width={width}
        height={height}
        overscanRowCount={15}
        className={className}
        rowCount={calls.length}
        rowHeight={this._renderRowHeight}
        rowRenderer={this._rowRender}
      />
    );
  }
}

CallListV2.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
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

CallListV2.defaultProps = {
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
