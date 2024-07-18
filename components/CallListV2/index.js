"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactVirtualized = require("react-virtualized");
var _CallItem = _interopRequireDefault(require("../CallItem"));
var _NoCalls = _interopRequireDefault(require("../NoCalls"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var CallListV2 = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(CallListV2, _React$PureComponent);
  var _super = _createSuper(CallListV2);
  function CallListV2(props) {
    var _this;
    _classCallCheck(this, CallListV2);
    _this = _super.call(this, props);
    _this._list = void 0;
    _this._recomputeRowHeight = function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (_this._list && _this._list.current) {
        _this._list.current.recomputeRowHeights(index);
      }
    };
    _this._setExtendedIndex = function (extendedIndex) {
      _this.setState({
        extendedIndex: extendedIndex
      }, function () {
        _this._recomputeRowHeight(0);
      });
    };
    _this._onSizeChanged = function (index) {
      var extendedIndex = _this.state.extendedIndex;
      if (extendedIndex === index) {
        _this._setExtendedIndex(null);
      } else {
        _this._setExtendedIndex(index);
      }
    };
    _this._renderRowHeight = function (_ref) {
      var index = _ref.index;
      // If we don't add extra height for the last item
      // the toggle button will be cut off
      var _this$props = _this.props,
        calls = _this$props.calls,
        _this$props$extendedR = _this$props.extendedRowHeight,
        extendedRowHeight = _this$props$extendedR === void 0 ? 130 : _this$props$extendedR,
        _this$props$rowHeight = _this$props.rowHeight,
        rowHeight = _this$props$rowHeight === void 0 ? 65 : _this$props$rowHeight,
        callsDelaySavingState = _this$props.callsDelaySavingState;
      var call = calls[index];
      var isDelaySavingState = callsDelaySavingState && callsDelaySavingState[call.sessionId];
      var extendedIndex = _this.state.extendedIndex;
      var margin = index === calls.length - 1 ? 15 : 0;
      var delaySavingStateHeight = isDelaySavingState ? 13 : 0;
      var height = index === extendedIndex ? extendedRowHeight : rowHeight + delaySavingStateHeight;
      return height + margin;
    };
    _this._rowRender = function (_ref2) {
      var index = _ref2.index,
        key = _ref2.key,
        style = _ref2.style;
      var _this$props2 = _this.props,
        className = _this$props2.className,
        brand = _this$props2.brand,
        currentLocale = _this$props2.currentLocale,
        calls = _this$props2.calls,
        areaCode = _this$props2.areaCode,
        countryCode = _this$props2.countryCode,
        onViewContact = _this$props2.onViewContact,
        onCreateContact = _this$props2.onCreateContact,
        createEntityTypes = _this$props2.createEntityTypes,
        onLogCall = _this$props2.onLogCall,
        onClickToDial = _this$props2.onClickToDial,
        onClickToSms = _this$props2.onClickToSms,
        isLoggedContact = _this$props2.isLoggedContact,
        disableLinks = _this$props2.disableLinks,
        disableCallButton = _this$props2.disableCallButton,
        disableClickToDial = _this$props2.disableClickToDial,
        outboundSmsPermission = _this$props2.outboundSmsPermission,
        internalSmsPermission = _this$props2.internalSmsPermission,
        active = _this$props2.active,
        dateTimeFormatter = _this$props2.dateTimeFormatter,
        loggingMap = _this$props2.loggingMap,
        webphoneAnswer = _this$props2.webphoneAnswer,
        webphoneReject = _this$props2.webphoneReject,
        webphoneHangup = _this$props2.webphoneHangup,
        webphoneResume = _this$props2.webphoneResume,
        enableContactFallback = _this$props2.enableContactFallback,
        autoLog = _this$props2.autoLog,
        showContactDisplayPlaceholder = _this$props2.showContactDisplayPlaceholder,
        showCallerIdName = _this$props2.showCallerIdName,
        sourceIcons = _this$props2.sourceIcons,
        phoneTypeRenderer = _this$props2.phoneTypeRenderer,
        phoneSourceNameRenderer = _this$props2.phoneSourceNameRenderer,
        renderContactName = _this$props2.renderContactName,
        renderSubContactName = _this$props2.renderSubContactName,
        renderExtraButton = _this$props2.renderExtraButton,
        contactDisplayStyle = _this$props2.contactDisplayStyle,
        externalViewEntity = _this$props2.externalViewEntity,
        externalHasEntity = _this$props2.externalHasEntity,
        shouldHideEntityButton = _this$props2.shouldHideEntityButton,
        readTextPermission = _this$props2.readTextPermission,
        currentSiteCode = _this$props2.currentSiteCode,
        isMultipleSiteEnabled = _this$props2.isMultipleSiteEnabled,
        showChooseEntityModal = _this$props2.showChooseEntityModal,
        enableCDC = _this$props2.enableCDC,
        maxExtensionNumberLength = _this$props2.maxExtensionNumberLength,
        formatPhone = _this$props2.formatPhone,
        callsDelaySavingState = _this$props2.callsDelaySavingState;
      var extendedIndex = _this.state.extendedIndex;
      var content;
      if (index >= calls.length) {
        content = /*#__PURE__*/_react["default"].createElement("div", {
          className: className
        }, /*#__PURE__*/_react["default"].createElement(_NoCalls["default"], {
          currentLocale: currentLocale,
          active: active
        }));
      } else {
        var call = calls[index];
        content = /*#__PURE__*/_react["default"].createElement(_CallItem["default"], {
          key: call.id,
          renderIndex: index,
          extended: extendedIndex === index,
          call: call,
          currentLocale: currentLocale,
          currentSiteCode: currentSiteCode,
          isMultipleSiteEnabled: isMultipleSiteEnabled,
          brand: brand,
          areaCode: areaCode,
          countryCode: countryCode,
          onViewContact: onViewContact,
          onCreateContact: onCreateContact,
          shouldHideEntityButton: shouldHideEntityButton,
          createEntityTypes: createEntityTypes,
          onLogCall: onLogCall,
          onClickToDial: onClickToDial,
          onClickToSms: onClickToSms,
          isLoggedContact: isLoggedContact,
          disableLinks: disableLinks,
          disableCallButton: disableCallButton,
          disableClickToDial: disableClickToDial,
          outboundSmsPermission: outboundSmsPermission,
          internalSmsPermission: internalSmsPermission,
          active: !!active,
          dateTimeFormatter: dateTimeFormatter,
          isLogging: !!loggingMap[call.sessionId],
          enableContactFallback: enableContactFallback,
          autoLog: autoLog,
          showContactDisplayPlaceholder: showContactDisplayPlaceholder,
          showCallerIdName: showCallerIdName,
          sourceIcons: sourceIcons,
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer,
          renderContactName: renderContactName,
          renderSubContactName: renderSubContactName,
          renderExtraButton: renderExtraButton,
          contactDisplayStyle: contactDisplayStyle,
          externalViewEntity: externalViewEntity,
          externalHasEntity: externalHasEntity,
          readTextPermission: readTextPermission,
          onSizeChanged: _this._onSizeChanged,
          onItemHeightChanged: _this._recomputeRowHeight
          // disable animation when rendered with react-virtualized
          ,
          withAnimation: false,
          showChooseEntityModal: showChooseEntityModal,
          enableCDC: enableCDC,
          maxExtensionNumberLength: maxExtensionNumberLength,
          formatPhone: formatPhone,
          currentDelaySavingState: callsDelaySavingState && callsDelaySavingState[call.sessionId]
        });
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: key,
        style: style
      }, content);
    };
    _this.noRowsRender = function () {
      var _this$props3 = _this.props,
        currentLocale = _this$props3.currentLocale,
        active = _this$props3.active; // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      return /*#__PURE__*/_react["default"].createElement(_NoCalls["default"], {
        currentLocale: currentLocale,
        active: active
      });
    };
    _this.state = {
      extendedIndex: null
    };
    _this._list = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(CallListV2, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var extendedIndex = this.state.extendedIndex;
      var calls = this.props.calls;
      if (extendedIndex !== null && calls[extendedIndex].sessionId !== nextProps.calls[extendedIndex].sessionId) {
        this._setExtendedIndex(null);
      }
    }
  }, {
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this$props4 = this.props,
        width = _this$props4.width,
        height = _this$props4.height,
        calls = _this$props4.calls,
        className = _this$props4.className;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_reactVirtualized.List, {
        style: {
          outline: 'none',
          overflowY: 'auto'
        },
        containerStyle: {
          overflow: 'visible'
        },
        ref: this._list,
        width: width,
        height: height,
        overscanRowCount: 15,
        className: className,
        rowCount: calls.length,
        rowHeight: this._renderRowHeight,
        rowRenderer: this._rowRender,
        noRowsRenderer: this.noRowsRender
      }));
    }
  }]);
  return CallListV2;
}(_react["default"].PureComponent); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  rowHeight: 65,
  extendedRowHeight: 130,
  showChooseEntityModal: true,
  enableCDC: false
};
var _default = CallListV2;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
