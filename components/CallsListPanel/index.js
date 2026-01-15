"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _debounce = _interopRequireDefault(require("@ringcentral-integration/commons/lib/debounce"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _ActiveCallItem = _interopRequireDefault(require("../ActiveCallItem"));
var _CallList = _interopRequireDefault(require("../CallList"));
var _CallListV = _interopRequireDefault(require("../CallListV2"));
var _InsideModal = _interopRequireDefault(require("../InsideModal"));
var _LogNotification = _interopRequireDefault(require("../LogNotification"));
var _LogSection = _interopRequireDefault(require("../LogSection"));
var _SearchInput = require("../SearchInput");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
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
// TODO: it is ActiveCallsPanel's function is the same, and remove ActiveCallsPanel after migration.

var SEARCH_BAR_HEIGHT = 51;
var ActiveCallList = function ActiveCallList(_ref) {
  var calls = _ref.calls,
    className = _ref.className,
    currentLocale = _ref.currentLocale,
    areaCode = _ref.areaCode,
    countryCode = _ref.countryCode,
    brand = _ref.brand,
    showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
    formatPhone = _ref.formatPhone,
    onClickToSms = _ref.onClickToSms,
    onCreateContact = _ref.onCreateContact,
    onViewContact = _ref.onViewContact,
    createEntityTypes = _ref.createEntityTypes,
    outboundSmsPermission = _ref.outboundSmsPermission,
    internalSmsPermission = _ref.internalSmsPermission,
    isLoggedContact = _ref.isLoggedContact,
    onLogCall = _ref.onLogCall,
    autoLog = _ref.autoLog,
    loggingMap = _ref.loggingMap,
    webphoneAnswer = _ref.webphoneAnswer,
    webphoneReject = _ref.webphoneReject,
    webphoneHangup = _ref.webphoneHangup,
    webphoneResume = _ref.webphoneResume,
    webphoneToVoicemail = _ref.webphoneToVoicemail,
    enableContactFallback = _ref.enableContactFallback,
    title = _ref.title,
    sourceIcons = _ref.sourceIcons,
    phoneTypeRenderer = _ref.phoneTypeRenderer,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    disableLinks = _ref.disableLinks,
    renderContactName = _ref.renderContactName,
    renderSubContactName = _ref.renderSubContactName,
    renderExtraButton = _ref.renderExtraButton,
    contactDisplayStyle = _ref.contactDisplayStyle,
    externalViewEntity = _ref.externalViewEntity,
    externalHasEntity = _ref.externalHasEntity,
    readTextPermission = _ref.readTextPermission;
  if (calls.length === 0) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].list, className),
    "data-sign": "callList"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].listTitle,
    "data-sign": "callListTitle"
  }, title), calls.map(function (call) {
    return /*#__PURE__*/_react["default"].createElement(_ActiveCallItem["default"]
    // @ts-expect-error TS(2322): Type '{ call: any; key: any; currentLocale: any; a... Remove this comment to see the full error message
    , {
      call: call,
      key: call.id,
      currentLocale: currentLocale,
      areaCode: areaCode,
      countryCode: countryCode,
      brand: brand,
      showContactDisplayPlaceholder: showContactDisplayPlaceholder,
      formatPhone: formatPhone,
      onClickToSms: onClickToSms,
      internalSmsPermission: internalSmsPermission,
      outboundSmsPermission: outboundSmsPermission,
      isLoggedContact: isLoggedContact,
      onLogCall: onLogCall,
      onViewContact: onViewContact,
      createEntityTypes: createEntityTypes,
      onCreateContact: onCreateContact,
      loggingMap: loggingMap,
      webphoneAnswer: webphoneAnswer,
      webphoneReject: webphoneReject,
      webphoneHangup: webphoneHangup,
      webphoneResume: webphoneResume,
      webphoneToVoicemail: webphoneToVoicemail,
      enableContactFallback: enableContactFallback,
      autoLog: autoLog,
      sourceIcons: sourceIcons,
      phoneTypeRenderer: phoneTypeRenderer,
      phoneSourceNameRenderer: phoneSourceNameRenderer,
      disableLinks: disableLinks,
      renderContactName: renderContactName,
      renderSubContactName: renderSubContactName,
      renderExtraButton: renderExtraButton,
      contactDisplayStyle: contactDisplayStyle,
      externalViewEntity: externalViewEntity,
      externalHasEntity: externalHasEntity,
      readTextPermission: readTextPermission
    });
  }));
};
ActiveCallList.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  title: _propTypes["default"].string.isRequired,
  calls: _propTypes["default"].array.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  formatPhone: _propTypes["default"].func.isRequired,
  onClickToSms: _propTypes["default"].func,
  onCreateContact: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  onViewContact: _propTypes["default"].func,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  isLoggedContact: _propTypes["default"].func,
  onLogCall: _propTypes["default"].func,
  loggingMap: _propTypes["default"].object,
  webphoneAnswer: _propTypes["default"].func,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  webphoneToVoicemail: _propTypes["default"].func,
  enableContactFallback: _propTypes["default"].bool,
  autoLog: _propTypes["default"].bool,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  renderContactName: _propTypes["default"].func,
  renderSubContactName: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  contactDisplayStyle: _propTypes["default"].string,
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].func,
  readTextPermission: _propTypes["default"].bool
};
ActiveCallList.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  onViewContact: undefined,
  createEntityTypes: undefined,
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  disableLinks: false,
  renderContactName: undefined,
  renderSubContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true
};
var CallsListPanel = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(CallsListPanel, _React$PureComponent);
  var _super = _createSuper(CallsListPanel);
  function CallsListPanel(props) {
    var _this;
    _classCallCheck(this, CallsListPanel);
    _this = _super.call(this, props);
    _this._listWrapper = void 0;
    _this._mounted = void 0;
    _this._root = void 0;
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
  _createClass(CallsListPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // @ts-expect-error TS(2339): Property 'adaptive' does not exist on type 'Readon... Remove this comment to see the full error message
      if (this.props.adaptive) {
        this._mounted = true;
        this._calculateContentSize();
        window.addEventListener('resize', this._onResize);
      }
      if (!this.hasCalls(this.props) &&
      // @ts-expect-error TS(2339): Property 'onCallsEmpty' does not exist on type 'Re... Remove this comment to see the full error message
      typeof this.props.onCallsEmpty === 'function') {
        // @ts-expect-error TS(2339): Property 'onCallsEmpty' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.onCallsEmpty();
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // @ts-expect-error TS(2339): Property 'adaptive' does not exist on type 'Readon... Remove this comment to see the full error message
      if (this.props.adaptive) {
        this._mounted = false;
        window.removeEventListener('resize', this._onResize);
      }
    }
  }, {
    key: "_calculateContentSize",
    value: function _calculateContentSize() {
      if (this._listWrapper && this._listWrapper.current && this._listWrapper.current.getBoundingClientRect) {
        var react = this._listWrapper.current.getBoundingClientRect();
        // @ts-expect-error TS(2339): Property 'onSearchInputChange' does not exist on t... Remove this comment to see the full error message
        var onSearchInputChange = this.props.onSearchInputChange;
        this.setState({
          contentHeight: react.bottom - react.top - (onSearchInputChange ? SEARCH_BAR_HEIGHT : 0),
          contentWidth: react.right - react.left
        });
        return;
      }
      this.setState({
        contentHeight: 0,
        contentWidth: 0
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.hasCalls(this.props) && !this.hasCalls(nextProps) &&
      // @ts-expect-error TS(2339): Property 'onCallsEmpty' does not exist on type 'Re... Remove this comment to see the full error message
      typeof this.props.onCallsEmpty === 'function') {
        // @ts-expect-error TS(2339): Property 'onCallsEmpty' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.onCallsEmpty();
      }
    }
  }, {
    key: "hasCalls",
    value: function hasCalls() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      return (
        // @ts-expect-error TS(2339): Property 'activeRingCalls' does not exist on type ... Remove this comment to see the full error message
        props.activeRingCalls.length > 0 ||
        // @ts-expect-error TS(2339): Property 'activeOnHoldCalls' does not exist on typ... Remove this comment to see the full error message
        props.activeOnHoldCalls.length > 0 ||
        // @ts-expect-error TS(2339): Property 'activeCurrentCalls' does not exist on ty... Remove this comment to see the full error message
        props.activeCurrentCalls.length > 0 ||
        // @ts-expect-error TS(2339): Property 'otherDeviceCalls' does not exist on type... Remove this comment to see the full error message
        props.otherDeviceCalls.length > 0 ||
        // @ts-expect-error TS(2339): Property 'calls' does not exist on type 'Readonly<... Remove this comment to see the full error message
        props.calls.length > 0
      );
    }
  }, {
    key: "renderLogSection",
    value: function renderLogSection() {
      // @ts-expect-error TS(2339): Property 'currentLog' does not exist on type 'Read... Remove this comment to see the full error message
      if (!this.props.currentLog) return null;
      var _this$props = this.props,
        formatPhone = _this$props.formatPhone,
        currentLocale = _this$props.currentLocale,
        currentLog = _this$props.currentLog,
        sectionContainerStyles = _this$props.sectionContainerStyles,
        sectionModalStyles = _this$props.sectionModalStyles,
        additionalInfo = _this$props.additionalInfo,
        showSaveLogBtn = _this$props.showSaveLogBtn,
        renderEditLogSection = _this$props.renderEditLogSection,
        renderSaveLogButton = _this$props.renderSaveLogButton,
        onSaveCallLog = _this$props.onSaveCallLog,
        onUpdateCallLog = _this$props.onUpdateCallLog,
        onCloseLogSection = _this$props.onCloseLogSection,
        logNotification = _this$props.logNotification,
        showNotiLogButton = _this$props.showNotiLogButton,
        onCloseNotification = _this$props.onCloseNotification,
        onSaveNotification = _this$props.onSaveNotification,
        onExpandNotification = _this$props.onExpandNotification,
        onDiscardNotification = _this$props.onDiscardNotification,
        notificationContainerStyles = _this$props.notificationContainerStyles;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_InsideModal["default"], {
        title: currentLog.title,
        show: currentLog.showLog,
        onClose: onCloseLogSection,
        clickOutToClose: false,
        containerStyles: sectionContainerStyles,
        modalStyles: sectionModalStyles,
        maskStyle: _styles["default"].maskStyle
      }, /*#__PURE__*/_react["default"].createElement(_LogSection["default"], {
        currentLocale: currentLocale,
        currentLog: currentLog,
        additionalInfo: additionalInfo,
        isInnerMask: logNotification && logNotification.notificationIsExpand,
        renderEditLogSection: renderEditLogSection,
        renderSaveLogButton: renderSaveLogButton,
        formatPhone: formatPhone,
        onUpdateCallLog: onUpdateCallLog,
        onSaveCallLog: onSaveCallLog,
        showSaveLogBtn: showSaveLogBtn
      })), logNotification ? /*#__PURE__*/_react["default"].createElement(_InsideModal["default"], {
        show: logNotification.showNotification,
        showTitle: false,
        containerStyles: (0, _clsx["default"])(_styles["default"].notificationContainer, notificationContainerStyles),
        modalStyles: _styles["default"].notificationModal,
        contentStyle: _styles["default"].notificationContent,
        onClose: onCloseNotification
      }, /*#__PURE__*/_react["default"].createElement(_LogNotification["default"], {
        showLogButton: showNotiLogButton,
        currentLocale: currentLocale,
        formatPhone: formatPhone,
        currentLog: logNotification,
        isExpand: logNotification.notificationIsExpand,
        onSave: onSaveNotification,
        onExpand: onExpandNotification,
        onDiscard: onDiscardNotification,
        onStay: onCloseNotification
      })) : null);
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        useNewList = _this$props2.useNewList,
        width = _this$props2.width,
        height = _this$props2.height,
        onlyHistory = _this$props2.onlyHistory,
        activeRingCalls = _this$props2.activeRingCalls,
        activeOnHoldCalls = _this$props2.activeOnHoldCalls,
        activeCurrentCalls = _this$props2.activeCurrentCalls,
        otherDeviceCalls = _this$props2.otherDeviceCalls,
        showSpinner = _this$props2.showSpinner,
        searchInput = _this$props2.searchInput,
        onSearchInputChange = _this$props2.onSearchInputChange,
        className = _this$props2.className,
        currentLocale = _this$props2.currentLocale,
        areaCode = _this$props2.areaCode,
        countryCode = _this$props2.countryCode,
        brand = _this$props2.brand,
        showContactDisplayPlaceholder = _this$props2.showContactDisplayPlaceholder,
        formatPhone = _this$props2.formatPhone,
        onClickToSms = _this$props2.onClickToSms,
        onCreateContact = _this$props2.onCreateContact,
        createEntityTypes = _this$props2.createEntityTypes,
        onViewContact = _this$props2.onViewContact,
        outboundSmsPermission = _this$props2.outboundSmsPermission,
        internalSmsPermission = _this$props2.internalSmsPermission,
        isLoggedContact = _this$props2.isLoggedContact,
        onLogCall = _this$props2.onLogCall,
        autoLog = _this$props2.autoLog,
        loggingMap = _this$props2.loggingMap,
        webphoneAnswer = _this$props2.webphoneAnswer,
        webphoneReject = _this$props2.webphoneReject,
        webphoneHangup = _this$props2.webphoneHangup,
        webphoneResume = _this$props2.webphoneResume,
        enableContactFallback = _this$props2.enableContactFallback,
        webphoneToVoicemail = _this$props2.webphoneToVoicemail,
        sourceIcons = _this$props2.sourceIcons,
        phoneTypeRenderer = _this$props2.phoneTypeRenderer,
        phoneSourceNameRenderer = _this$props2.phoneSourceNameRenderer,
        onClickToDial = _this$props2.onClickToDial,
        disableLinks = _this$props2.disableLinks,
        disableClickToDial = _this$props2.disableClickToDial,
        dateTimeFormatter = _this$props2.dateTimeFormatter,
        calls = _this$props2.calls,
        active = _this$props2.active,
        renderContactName = _this$props2.renderContactName,
        renderSubContactName = _this$props2.renderSubContactName,
        renderExtraButton = _this$props2.renderExtraButton,
        isSyncingActivityMatcher = _this$props2.isSyncingActivityMatcher,
        contactDisplayStyle = _this$props2.contactDisplayStyle,
        activeContactDisplayStyle = _this$props2.activeContactDisplayStyle,
        currentLog = _this$props2.currentLog,
        additionalInfo = _this$props2.additionalInfo,
        onCloseLogSection = _this$props2.onCloseLogSection,
        onUpdateCallLog = _this$props2.onUpdateCallLog,
        onSaveCallLog = _this$props2.onSaveCallLog,
        renderEditLogSection = _this$props2.renderEditLogSection,
        renderSaveLogButton = _this$props2.renderSaveLogButton,
        logNotification = _this$props2.logNotification,
        onCloseNotification = _this$props2.onCloseNotification,
        onDiscardNotification = _this$props2.onDiscardNotification,
        onSaveNotification = _this$props2.onSaveNotification,
        onExpandNotification = _this$props2.onExpandNotification,
        showSaveLogBtn = _this$props2.showSaveLogBtn,
        showNotiLogButton = _this$props2.showNotiLogButton,
        sectionContainerStyles = _this$props2.sectionContainerStyles,
        sectionModalStyles = _this$props2.sectionModalStyles,
        notificationContainerStyles = _this$props2.notificationContainerStyles,
        externalViewEntity = _this$props2.externalViewEntity,
        shouldHideEntityButton = _this$props2.shouldHideEntityButton,
        externalHasEntity = _this$props2.externalHasEntity,
        readTextPermission = _this$props2.readTextPermission,
        children = _this$props2.children,
        adaptive = _this$props2.adaptive,
        showChooseEntityModal = _this$props2.showChooseEntityModal,
        enableCDC = _this$props2.enableCDC,
        maxExtensionLength = _this$props2.maxExtensionLength,
        callsDelaySavingState = _this$props2.callsDelaySavingState; // @ts-expect-error TS(2339): Property 'contentWidth' does not exist on type 'Re... Remove this comment to see the full error message
      var _this$state = this.state,
        contentWidth = _this$state.contentWidth,
        contentHeight = _this$state.contentHeight;
      if (showSpinner) {
        return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null);
      }
      var isShowMessageIcon = readTextPermission && !!onClickToSms;
      var CallsListView = useNewList ? /*#__PURE__*/_react["default"].createElement(_CallListV["default"], {
        width: adaptive ? contentWidth : width,
        height: adaptive ? contentHeight : height,
        brand: brand,
        currentLocale: currentLocale,
        calls: calls,
        areaCode: areaCode,
        countryCode: countryCode,
        onViewContact: onViewContact,
        shouldHideEntityButton: shouldHideEntityButton,
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
        dateTimeFormatter: dateTimeFormatter,
        maxExtensionNumberLength: maxExtensionLength,
        active: active,
        loggingMap: loggingMap,
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
        renderSubContactName: renderSubContactName,
        renderExtraButton: renderExtraButton,
        isSyncingActivityMatcher: isSyncingActivityMatcher,
        contactDisplayStyle: contactDisplayStyle,
        externalViewEntity: externalViewEntity,
        externalHasEntity: externalHasEntity,
        readTextPermission: isShowMessageIcon,
        showChooseEntityModal: showChooseEntityModal,
        enableCDC: enableCDC,
        callsDelaySavingState: callsDelaySavingState
      }) : /*#__PURE__*/_react["default"].createElement(_CallList["default"], {
        brand: brand,
        currentLocale: currentLocale,
        calls: calls,
        areaCode: areaCode,
        countryCode: countryCode,
        onViewContact: onViewContact,
        shouldHideEntityButton: shouldHideEntityButton,
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
        dateTimeFormatter: dateTimeFormatter,
        active: active,
        loggingMap: loggingMap,
        enableContactFallback: enableContactFallback,
        autoLog: autoLog,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        renderContactName: renderContactName,
        renderExtraButton: renderExtraButton,
        isSyncingActivityMatcher: isSyncingActivityMatcher,
        contactDisplayStyle: contactDisplayStyle,
        externalViewEntity: externalViewEntity,
        externalHasEntity: externalHasEntity,
        readTextPermission: isShowMessageIcon,
        enableCDC: enableCDC
      });
      var search = onSearchInputChange ? /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].searchContainer)
      }, /*#__PURE__*/_react["default"].createElement(_SearchInput.SearchInput, {
        key: "100",
        className: _styles["default"].searchInput,
        value: searchInput,
        onChange: onSearchInputChange,
        placeholder: _i18n["default"].getString('searchPlaceholder', currentLocale),
        disabled: disableLinks
      })) : null;
      var getCallList = function getCallList(calls, title) {
        return /*#__PURE__*/_react["default"].createElement(ActiveCallList, {
          title: title,
          calls: calls,
          currentLocale: currentLocale,
          areaCode: areaCode,
          countryCode: countryCode,
          brand: brand,
          showContactDisplayPlaceholder: showContactDisplayPlaceholder,
          formatPhone: formatPhone,
          onClickToSms: onClickToSms,
          onCreateContact: onCreateContact,
          createEntityTypes: createEntityTypes,
          onViewContact: onViewContact,
          outboundSmsPermission: outboundSmsPermission,
          internalSmsPermission: internalSmsPermission,
          isLoggedContact: isLoggedContact,
          onLogCall: onLogCall,
          autoLog: autoLog,
          loggingMap: loggingMap,
          webphoneAnswer: webphoneAnswer,
          webphoneReject: webphoneReject,
          webphoneHangup: webphoneHangup,
          webphoneResume: webphoneResume,
          webphoneToVoicemail: webphoneToVoicemail,
          enableContactFallback: enableContactFallback,
          sourceIcons: sourceIcons,
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer,
          disableLinks: disableLinks,
          renderContactName: renderContactName,
          renderSubContactName: renderSubContactName,
          renderExtraButton: renderExtraButton,
          contactDisplayStyle: activeContactDisplayStyle,
          externalViewEntity: externalViewEntity,
          externalHasEntity: externalHasEntity,
          readTextPermission: isShowMessageIcon
        });
      };
      var historyCall = showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].list, className)
      }, !onlyHistory && /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].listTitle
      }, _i18n["default"].getString('historyCalls', currentLocale)), CallsListView);
      var noCalls = otherDeviceCalls.length === 0 && /*#__PURE__*/_react["default"].createElement("p", {
        className: _styles["default"].noCalls
      }, _i18n["default"].getString('noCalls', currentLocale));
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].container, onSearchInputChange ? _styles["default"].containerWithSearch : null),
        "data-sign": "callsListPanel",
        ref: this._listWrapper
      }, children, search, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, currentLog && currentLog.showLog ? _styles["default"].hiddenScroll : '', className),
        ref: this._root
      }, onlyHistory || getCallList(activeRingCalls, _i18n["default"].getString('ringCall', currentLocale)), onlyHistory || getCallList(activeCurrentCalls, _i18n["default"].getString('currentCall', currentLocale)), onlyHistory || getCallList(activeOnHoldCalls, _i18n["default"].getString('onHoldCall', currentLocale)), onlyHistory || getCallList(otherDeviceCalls, _i18n["default"].getString('otherDeviceCall', currentLocale)), calls.length > 0 ? historyCall : noCalls), this.renderLogSection());
    }
  }]);
  return CallsListPanel;
}(_react["default"].PureComponent); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
CallsListPanel.propTypes = {
  useNewList: _propTypes["default"].bool,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  currentLocale: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  activeRingCalls: _propTypes["default"].array.isRequired,
  activeOnHoldCalls: _propTypes["default"].array.isRequired,
  activeCurrentCalls: _propTypes["default"].array.isRequired,
  otherDeviceCalls: _propTypes["default"].array.isRequired,
  onSearchInputChange: _propTypes["default"].func,
  searchInput: _propTypes["default"].string,
  showSpinner: _propTypes["default"].bool.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  formatPhone: _propTypes["default"].func.isRequired,
  onClickToSms: _propTypes["default"].func,
  onCreateContact: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  isLoggedContact: _propTypes["default"].func,
  onLogCall: _propTypes["default"].func,
  webphoneAnswer: _propTypes["default"].func,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  webphoneToVoicemail: _propTypes["default"].func,
  autoLog: _propTypes["default"].bool,
  onViewContact: _propTypes["default"].func,
  shouldHideEntityButton: _propTypes["default"].func,
  enableContactFallback: _propTypes["default"].bool,
  loggingMap: _propTypes["default"].object,
  onCallsEmpty: _propTypes["default"].func,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  calls: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
  onClickToDial: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool.isRequired,
  disableClickToDial: _propTypes["default"].bool,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  active: _propTypes["default"].bool,
  renderContactName: _propTypes["default"].func,
  renderSubContactName: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  isSyncingActivityMatcher: _propTypes["default"].bool,
  contactDisplayStyle: _propTypes["default"].string,
  activeContactDisplayStyle: _propTypes["default"].string,
  currentLog: _propTypes["default"].object,
  additionalInfo: _propTypes["default"].object,
  onCloseLogSection: _propTypes["default"].func,
  onUpdateCallLog: _propTypes["default"].func,
  onSaveCallLog: _propTypes["default"].func,
  renderEditLogSection: _propTypes["default"].func,
  renderSaveLogButton: _propTypes["default"].func,
  logNotification: _propTypes["default"].object,
  onCloseNotification: _propTypes["default"].func,
  onDiscardNotification: _propTypes["default"].func,
  onSaveNotification: _propTypes["default"].func,
  onExpandNotification: _propTypes["default"].func,
  showSaveLogBtn: _propTypes["default"].bool,
  showNotiLogButton: _propTypes["default"].bool,
  sectionContainerStyles: _propTypes["default"].string,
  sectionModalStyles: _propTypes["default"].string,
  notificationContainerStyles: _propTypes["default"].string,
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].func,
  readTextPermission: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  onlyHistory: _propTypes["default"].bool,
  adaptive: _propTypes["default"].bool,
  showChooseEntityModal: _propTypes["default"].bool,
  enableCDC: _propTypes["default"].bool,
  callsDelaySavingState: _propTypes["default"].object
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
CallsListPanel.defaultProps = {
  adaptive: false,
  useNewList: false,
  width: 300,
  height: 315,
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  createEntityTypes: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onSearchInputChange: undefined,
  searchInput: '',
  onLogCall: undefined,
  onViewContact: undefined,
  shouldHideEntityButton: undefined,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  enableContactFallback: undefined,
  loggingMap: {},
  autoLog: false,
  onCallsEmpty: undefined,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  onClickToDial: undefined,
  disableClickToDial: false,
  active: false,
  renderContactName: undefined,
  renderSubContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: _styles["default"].contactDisplay,
  activeContactDisplayStyle: _styles["default"].activeContactDisplay,
  currentLog: undefined,
  additionalInfo: undefined,
  onCloseLogSection: undefined,
  onUpdateCallLog: undefined,
  onSaveCallLog: undefined,
  renderEditLogSection: undefined,
  renderSaveLogButton: undefined,
  logNotification: undefined,
  onCloseNotification: undefined,
  onDiscardNotification: undefined,
  onSaveNotification: undefined,
  onExpandNotification: undefined,
  showSaveLogBtn: true,
  showNotiLogButton: true,
  sectionContainerStyles: undefined,
  sectionModalStyles: undefined,
  notificationContainerStyles: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  children: null,
  onlyHistory: false,
  showChooseEntityModal: true,
  enableCDC: false,
  callsDelaySavingState: undefined,
  isSyncingActivityMatcher: false
};
var _default = CallsListPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
