import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';
import CallItem from '../CallItem';
import NoCalls from '../NoCalls';

export default class CallListV2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      extendedIndex: null,
    };
    this._list = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    const {
      extendedIndex
    } = this.state;
    if (
      extendedIndex !== null &&
      this.props.calls[extendedIndex] !== nextProps.calls[extendedIndex]
    ) {
      this._setExtendedIndex(null);
    }
  }

  _setExtendedIndex = (extendedIndex) => {
    this.setState({
      extendedIndex,
    }, () => {
      if (this._list && this._list.current) {
        this._list.current.recomputeRowHeights(0);
      }
    });
  }

  _onSizeChanged = (index) => {
    if (this.state.extendedIndex === index) {
      this._setExtendedIndex(null);
    } else {
      this._setExtendedIndex(index);
    }
  }

  _renderRowHeight = ({ index }) => {
    // If we don't add extra height for the last item
    // the toggle button will be cut off
    const margin = index === this.props.calls.length - 1 ?
      15 :
      0;
    const rowHeight = index === this.state.extendedIndex ?
      this.props.extendedRowHeight :
      this.props.rowHeight;
    return rowHeight + margin;
  }

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
          extended={this.state.extendedIndex === index}
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
          onSizeChanged={this._onSizeChanged}
          // disable animation when rendered with react-virtualized
          withAnimation={false}
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
    const {
      currentLocale,
      active
    } = this.props;
    return (
      <NoCalls currentLocale={currentLocale} active={active} />
    );
  }

  render() {
    const {
      width,
      height,
      calls,
      className,
    } = this.props;

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
  rowHeight: PropTypes.number,
  extendedRowHeight: PropTypes.number,
};

CallListV2.defaultProps = {
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
  rowHeight: 65,
  extendedRowHeight: 130,
};
