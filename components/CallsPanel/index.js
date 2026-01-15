"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.set-prototype-of.js");
var _debounce = _interopRequireDefault(require("@ringcentral-integration/commons/lib/debounce"));
var _react = _interopRequireDefault(require("react"));
var _CallList = _interopRequireDefault(require("../CallList"));
var _CallListV = _interopRequireDefault(require("../CallListV2"));
var _Header = require("../Header");
var _Panel = _interopRequireDefault(require("../Panel"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var HEADER_HEIGHT = 38;
var CallsPanel = /*#__PURE__*/function (_React$PureComponent) {
  function CallsPanel(props) {
    var _this;
    _classCallCheck(this, CallsPanel);
    _this = _callSuper(this, CallsPanel, [props]);
    _this._listWrapper = void 0;
    _this._mounted = void 0;
    _this._onResize = (0, _debounce["default"])(function () {
      if (_this._mounted) {
        _this._calculateContentSize();
      }
    }, 300);
    _this.state = {
      contentHeight: 0,
      contentWidth: 0
    };
    _this._mounted = false;
    _this._listWrapper = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _inherits(CallsPanel, _React$PureComponent);
  return _createClass(CallsPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
      this._calculateContentSize();
      window.addEventListener('resize', this._onResize);
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: "_calculateContentSize",
    value: function _calculateContentSize() {
      if (this._listWrapper && this._listWrapper.current && this._listWrapper.current.getBoundingClientRect) {
        var react = this._listWrapper.current.getBoundingClientRect();
        this.setState({
          contentHeight: react.bottom - react.top - HEADER_HEIGHT,
          contentWidth: react.right - react.left
        });
        return;
      }
      this.setState({
        contentHeight: 0,
        contentWidth: 0
      });
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        brand = _this$props.brand,
        currentLocale = _this$props.currentLocale,
        calls = _this$props.calls,
        areaCode = _this$props.areaCode,
        countryCode = _this$props.countryCode,
        onViewContact = _this$props.onViewContact,
        onCreateContact = _this$props.onCreateContact,
        onLogCall = _this$props.onLogCall,
        onClickToDial = _this$props.onClickToDial,
        onClickToSms = _this$props.onClickToSms,
        isLoggedContact = _this$props.isLoggedContact,
        disableLinks = _this$props.disableLinks,
        disableCallButton = _this$props.disableCallButton,
        disableClickToDial = _this$props.disableClickToDial,
        outboundSmsPermission = _this$props.outboundSmsPermission,
        internalSmsPermission = _this$props.internalSmsPermission,
        dateTimeFormatter = _this$props.dateTimeFormatter,
        showSpinner = _this$props.showSpinner,
        title = _this$props.title,
        active = _this$props.active,
        loggingMap = _this$props.loggingMap,
        webphoneAnswer = _this$props.webphoneAnswer,
        webphoneReject = _this$props.webphoneReject,
        webphoneHangup = _this$props.webphoneHangup,
        webphoneResume = _this$props.webphoneResume,
        enableContactFallback = _this$props.enableContactFallback,
        autoLog = _this$props.autoLog,
        showContactDisplayPlaceholder = _this$props.showContactDisplayPlaceholder,
        showCallerIdName = _this$props.showCallerIdName,
        sourceIcons = _this$props.sourceIcons,
        phoneTypeRenderer = _this$props.phoneTypeRenderer,
        phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
        useNewList = _this$props.useNewList,
        currentSiteCode = _this$props.currentSiteCode,
        isMultipleSiteEnabled = _this$props.isMultipleSiteEnabled,
        enableCDC = _this$props.enableCDC,
        maxExtensionNumberLength = _this$props.maxExtensionNumberLength,
        formatPhone = _this$props.formatPhone;
      var _this$state = this.state,
        contentWidth = _this$state.contentWidth,
        contentHeight = _this$state.contentHeight;
      var callsListView = useNewList ? /*#__PURE__*/_react["default"].createElement(_CallListV["default"], {
        formatPhone: formatPhone,
        currentSiteCode: currentSiteCode,
        isMultipleSiteEnabled: isMultipleSiteEnabled,
        brand: brand,
        currentLocale: currentLocale,
        calls: calls,
        areaCode: areaCode,
        countryCode: countryCode,
        onViewContact: onViewContact,
        onCreateContact: onCreateContact,
        onLogCall: onLogCall,
        onClickToDial: onClickToDial,
        onClickToSms: onClickToSms,
        isLoggedContact: isLoggedContact,
        disableLinks: disableLinks,
        disableCallButton: disableCallButton,
        disableClickToDial: disableClickToDial,
        outboundSmsPermission: outboundSmsPermission,
        internalSmsPermission: internalSmsPermission,
        dateTimeFormatter: dateTimeFormatter,
        active: active,
        loggingMap: loggingMap,
        webphoneAnswer: webphoneAnswer,
        webphoneReject: webphoneReject,
        webphoneHangup: webphoneHangup,
        webphoneResume: webphoneResume,
        enableContactFallback: enableContactFallback,
        showCallerIdName: showCallerIdName,
        autoLog: autoLog,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        width: contentWidth,
        height: contentHeight
        // @ts-expect-error TS(2322): Type '{ formatPhone: (phoneNumber: string) => stri... Remove this comment to see the full error message
        ,
        useNewList: useNewList,
        enableCDC: enableCDC,
        maxExtensionNumberLength: maxExtensionNumberLength
      }) : /*#__PURE__*/_react["default"].createElement(_CallList["default"], {
        currentSiteCode: currentSiteCode,
        isMultipleSiteEnabled: isMultipleSiteEnabled,
        brand: brand,
        currentLocale: currentLocale,
        calls: calls,
        areaCode: areaCode,
        countryCode: countryCode,
        onViewContact: onViewContact,
        onCreateContact: onCreateContact,
        onLogCall: onLogCall,
        onClickToDial: onClickToDial,
        onClickToSms: onClickToSms,
        isLoggedContact: isLoggedContact,
        disableLinks: disableLinks,
        disableCallButton: disableCallButton,
        disableClickToDial: disableClickToDial,
        outboundSmsPermission: outboundSmsPermission,
        internalSmsPermission: internalSmsPermission,
        dateTimeFormatter: dateTimeFormatter,
        active: active,
        loggingMap: loggingMap,
        enableContactFallback: enableContactFallback,
        autoLog: autoLog,
        showCallerIdName: showCallerIdName,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        maxExtensionNumberLength: maxExtensionNumberLength
      });
      var content = showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : callsListView;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        ref: this._listWrapper
      }, /*#__PURE__*/_react["default"].createElement(_Header.Header, null, title), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, content));
    }
  }]);
}(_react["default"].PureComponent); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
CallsPanel.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  onViewContact: undefined,
  onCreateContact: undefined,
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  disableCallButton: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  showSpinner: false,
  title: '',
  active: false,
  isLoggedContact: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  showContactDisplayPlaceholder: true,
  showCallerIdName: false,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  useNewList: false,
  enableCDC: false
};
var _default = exports["default"] = CallsPanel;
//# sourceMappingURL=index.js.map
