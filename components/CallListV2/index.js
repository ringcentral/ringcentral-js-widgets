'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CallItem = require('../CallItem');

var _CallItem2 = _interopRequireDefault(_CallItem);

var _NoCalls = require('../NoCalls');

var _NoCalls2 = _interopRequireDefault(_NoCalls);

var _reactVirtualized = require('react-virtualized');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallListV2 = function (_React$PureComponent) {
  (0, _inherits3.default)(CallListV2, _React$PureComponent);

  function CallListV2(props) {
    (0, _classCallCheck3.default)(this, CallListV2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallListV2.__proto__ || (0, _getPrototypeOf2.default)(CallListV2)).call(this, props));

    _this._resizeAll = function (index, extended) {
      _this._resizeAllFlag = false;
      _this._renderIndex = index;
      _this._cellExtended = extended;
      if (_this._list && _this._list.current) {
        _this._list.current.recomputeRowHeights();
        _this._list.current.forceUpdateGrid();
      }
    };

    _this._renderRowHeight = function (params) {
      if (_this._renderIndex !== undefined && _this._renderIndex === params.index && _this._cellExtended) {
        return _this._rowHeight * 2;
      }
      return _this._rowHeight;
    };

    _this._rowRender = function (_ref) {
      var index = _ref.index,
          key = _ref.key,
          style = _ref.style;
      var _this$props = _this.props,
          className = _this$props.className,
          brand = _this$props.brand,
          currentLocale = _this$props.currentLocale,
          calls = _this$props.calls,
          areaCode = _this$props.areaCode,
          countryCode = _this$props.countryCode,
          onViewContact = _this$props.onViewContact,
          onCreateContact = _this$props.onCreateContact,
          createEntityTypes = _this$props.createEntityTypes,
          onLogCall = _this$props.onLogCall,
          onClickToDial = _this$props.onClickToDial,
          onClickToSms = _this$props.onClickToSms,
          isLoggedContact = _this$props.isLoggedContact,
          disableLinks = _this$props.disableLinks,
          disableClickToDial = _this$props.disableClickToDial,
          outboundSmsPermission = _this$props.outboundSmsPermission,
          internalSmsPermission = _this$props.internalSmsPermission,
          active = _this$props.active,
          dateTimeFormatter = _this$props.dateTimeFormatter,
          loggingMap = _this$props.loggingMap,
          webphoneAnswer = _this$props.webphoneAnswer,
          webphoneReject = _this$props.webphoneReject,
          webphoneHangup = _this$props.webphoneHangup,
          webphoneResume = _this$props.webphoneResume,
          enableContactFallback = _this$props.enableContactFallback,
          autoLog = _this$props.autoLog,
          showContactDisplayPlaceholder = _this$props.showContactDisplayPlaceholder,
          sourceIcons = _this$props.sourceIcons,
          phoneTypeRenderer = _this$props.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
          renderContactName = _this$props.renderContactName,
          renderExtraButton = _this$props.renderExtraButton,
          contactDisplayStyle = _this$props.contactDisplayStyle,
          externalViewEntity = _this$props.externalViewEntity,
          externalHasEntity = _this$props.externalHasEntity,
          readTextPermission = _this$props.readTextPermission;


      var content = void 0;
      if (index >= calls.length) {
        content = _react2.default.createElement(
          'div',
          { className: className },
          _react2.default.createElement(_NoCalls2.default, { currentLocale: currentLocale, active: active })
        );
      } else {
        var call = calls[index];
        content = _react2.default.createElement(_CallItem2.default, {
          key: call.id,
          renderIndex: index,
          extended: _this._renderIndex === index && _this._cellExtended || false,
          style: style,
          call: call,
          currentLocale: currentLocale,
          brand: brand,
          areaCode: areaCode,
          countryCode: countryCode,
          onViewContact: onViewContact,
          onCreateContact: onCreateContact,
          createEntityTypes: createEntityTypes,
          onLogCall: onLogCall,
          onClickToDial: onClickToDial,
          onClickToSms: onClickToSms,
          isLoggedContact: isLoggedContact,
          disableLinks: disableLinks,
          disableClickToDial: disableClickToDial,
          outboundSmsPermission: outboundSmsPermission,
          internalSmsPermission: internalSmsPermission,
          active: active,
          dateTimeFormatter: dateTimeFormatter,
          isLogging: !!loggingMap[call.sessionId],
          webphoneAnswer: webphoneAnswer,
          webphoneReject: webphoneReject,
          webphoneHangup: webphoneHangup,
          webphoneResume: webphoneResume,
          enableContactFallback: enableContactFallback,
          autoLog: autoLog,
          showContactDisplayPlaceholder: showContactDisplayPlaceholder,
          sourceIcons: sourceIcons,
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer,
          renderContactName: renderContactName,
          renderExtraButton: renderExtraButton,
          contactDisplayStyle: contactDisplayStyle,
          externalViewEntity: externalViewEntity,
          externalHasEntity: externalHasEntity,
          readTextPermission: readTextPermission,
          onSizeChanged: _this._resizeAll
        });
      }

      return _react2.default.createElement(
        'div',
        { key: key, style: style },
        content
      );
    };

    _this._rowHeight = 65;
    _this._list = _react2.default.createRef();

    _this._mostRecentWidth = 0;
    _this._resizeAllFlag = false;
    return _this;
  }

  (0, _createClass3.default)(CallListV2, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
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
        var index = prevProps.calls.length;
        if (this._list) {
          this._list.current.recomputeRowHeights(index);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          calls = _props.calls,
          className = _props.className,
          _props$width = _props.width,
          width = _props$width === undefined ? 300 : _props$width,
          _props$height = _props.height,
          height = _props$height === undefined ? 315 : _props$height;


      return _react2.default.createElement(_reactVirtualized.List, {
        style: { outline: 'none' },
        ref: this._list,
        width: width,
        height: height,
        overscanRowCount: 15,
        className: className,
        rowCount: calls.length,
        rowHeight: this._renderRowHeight,
        rowRenderer: this._rowRender
      });
    }
  }]);
  return CallListV2;
}(_react2.default.PureComponent);

exports.default = CallListV2;


CallListV2.propTypes = {
  className: _propTypes2.default.string,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  brand: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  calls: _propTypes2.default.arrayOf(_CallItem2.default.propTypes.call).isRequired,
  active: _propTypes2.default.bool,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  onViewContact: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  createEntityTypes: _propTypes2.default.array,
  onLogCall: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  isLoggedContact: _propTypes2.default.func,
  loggingMap: _propTypes2.default.object,
  disableLinks: _propTypes2.default.bool,
  disableClickToDial: _propTypes2.default.bool,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  webphoneAnswer: _propTypes2.default.func,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  autoLog: _propTypes2.default.bool,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  phoneTypeRenderer: _propTypes2.default.func,
  phoneSourceNameRenderer: _propTypes2.default.func,
  renderContactName: _propTypes2.default.func,
  renderExtraButton: _propTypes2.default.func,
  contactDisplayStyle: _propTypes2.default.string,
  externalViewEntity: _propTypes2.default.func,
  externalHasEntity: _propTypes2.default.func,
  readTextPermission: _propTypes2.default.bool
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
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true
};
//# sourceMappingURL=index.js.map
